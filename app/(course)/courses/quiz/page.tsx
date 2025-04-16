"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Rings } from 'react-loader-spinner';
import Webcam from 'react-webcam';
import { toast } from "sonner"
import * as cocossd from '@tensorflow-models/coco-ssd'
import "@tensorflow/tfjs-backend-cpu"
import "@tensorflow/tfjs-backend-webgl"
import { DetectedObject, ObjectDetection } from '@tensorflow-models/coco-ssd';
import { drawOnCanvas } from '@/utils/draw';
import questions from './questionsData';
import Navbar from './_components/Navbar';
import QuestionCard from './_components/QuestionCard';
import ScoreReportCard from './_components/ScoreReportCard';
import ProgressCard from './_components/ProgressCard';
import Footer from './_components/Footer';

type Props = {}

let interval: any = null;
let stopTimeout: any = null;
const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // state 
  const [mirrored, setMirrored] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false)
  const [volume, setVolume] = useState(0.8);
  const [model, setModel] = useState<ObjectDetection>();
  const [loading, setLoading] = useState(false);
  const [alertCount, setAlertCount] = useState(0); 

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswerID, setSelectedAnswerID] = useState(localStorage.getItem(`question_1`) || null);
    const [showScore, setShowScore] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (selectedAnswerID:any) => {
      localStorage.setItem(`question_${questions[currentQuestion].id}`, selectedAnswerID);
      setSelectedAnswerID(selectedAnswerID);
  };

  const handleNextQuestion = () => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
          setSelectedAnswerID(localStorage.getItem(`question_${questions[nextQuestion].id}`) || null);
      }
  };

  const handlePrevQuestion = () => {
      const prevQuestion = currentQuestion - 1;
      if (prevQuestion >= 0) {
          setCurrentQuestion(prevQuestion);
          setSelectedAnswerID(localStorage.getItem(`question_${questions[prevQuestion].id}`) || null);
      }
  };

  const handleFirstQuestion = () => {
      setCurrentQuestion(0);
      setSelectedAnswerID(localStorage.getItem(`question_1`) || null);
  };

  const handleLastQuestion = () => {
      const lastOne = questions.length
      setCurrentQuestion(lastOne-1);
      setSelectedAnswerID(localStorage.getItem(`question_${lastOne}`) || null);
  };

  const handleProgressToggle = () => {
      setShowProgress(current => !current);
  };

  const handleLinkFromProgress = (questionIndex:any) => {
      setShowProgress(false);
      setCurrentQuestion(questionIndex);
      setSelectedAnswerID(localStorage.getItem(`question_${questions[questionIndex].id}`) || null);
  };

  const handleClearAnswers = () => {
      // Wipe all localStorage completely,
      localStorage.clear();
      // and then reset the current question to the first and selected-answer state to null.
      setSelectedAnswerID(null);
      setCurrentQuestion(0);
  };

  const handleRetakeQuiz = () => {
      localStorage.clear();
      setSelectedAnswerID(null);
      setShowScore(false);
      setCurrentQuestion(0);
  };

  const handleScoreQuiz = () => {
      let finalScore = 0;
      questions.forEach((question) => {
          const storedAnswer = localStorage.getItem(`question_${question.id}`);
          if (storedAnswer === question.correctResponse) {
              finalScore += 1;
          }
      });
      setScore(finalScore);
      setShowScore(true);
      setCurrentQuestion(0);
      setSelectedAnswerID(localStorage.getItem(`question_1`) || null);
  };

  // initialize the media recorder
  useEffect(() => {
    if (webcamRef && webcamRef.current) {
      const stream = (webcamRef.current.video as any).captureStream();
      if (stream) {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            const recordedBlob = new Blob([e.data], { type: 'video' });
            const videoURL = URL.createObjectURL(recordedBlob);

            const a = document.createElement('a');
            a.href = videoURL;
            a.download = `${formatDate(new Date())}.webm`;
            a.click();
          }
        };
        mediaRecorderRef.current.onstart = (e) => {
          setIsRecording(true);
        }
        mediaRecorderRef.current.onstop = (e) => {
          setIsRecording(false);
        }
      }
    }
  }, [webcamRef])


  useEffect(() => {
    setLoading(true);
    initModel();
  }, [])

  
  async function initModel() {
    const loadedModel: ObjectDetection = await cocossd.load({
      base: 'mobilenet_v2'
    });
    setModel(loadedModel);
  }

  useEffect(() => {
    if (model) {
      setLoading(false);
    }
  }, [model])


  async function runPrediction() {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const predictions: DetectedObject[] = await model.detect(webcamRef.current.video);
  
      resizeCanvas(canvasRef, webcamRef);
  
      let personCount = 0;
      let cellPhoneDetected = false; // Variable to track if a cell phone is detected
  
      predictions.forEach(prediction => {
        if (prediction.class === 'person') {
          personCount++;
        } else if (prediction.class === 'cell phone') { // Check for cell phone detection
          cellPhoneDetected = true;
        }
      });
  
      drawOnCanvas(mirrored, predictions, canvasRef.current?.getContext('2d'));
  
      if (personCount >= 2) {
        if (alertCount < 4) {
          alert('More than two persons detected!');
          setAlertCount(alertCount + 1);
        } else {
          window.location.href = '/';
        }
      } else if (personCount === 0) {
        if (alertCount < 4) {
          alert('No person found');
          setAlertCount(alertCount + 1);
        } else {
          window.location.href = '/';
        }
      }
  
      if (cellPhoneDetected) { // Trigger alert if cell phone is detected
        
        if (alertCount < 4) {
          alert('Mobile phone  detected!');
          setAlertCount(alertCount + 1);
        } else {
          window.location.href = '/';
        }
      }
    }
  }
  
  

  useEffect(() => {
    interval = setInterval(() => {
      runPrediction();
    }, 100)

    return () => clearInterval(interval);
  }, [webcamRef.current, model, mirrored, autoRecordEnabled, runPrediction])

  return (

    <div className='flex flex-col h-screen'>
    <Navbar />
    <main className='p-3 mt-5 flex-grow items-center justify-center'>
      <div className='p-3 relative rounded-lg shadow-md'>
        {/* Webcam and Canvas */}
        <div className='absolute bottom-0 right-0 top-96'>
          <Webcam
            ref={webcamRef}
            mirrored={mirrored}
            className='object-cover p-2 rounded-lg'
            style={{ width: '320px', height: '240px' }}
          />
          <canvas
            ref={canvasRef}
            className='absolute top-0 left-0 object-cover rounded-lg'
            style={{ width: '320px', height: '240px' }}
          ></canvas>
        </div>
        {loading && (
          <div className='z-50 absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='text-white'>
              Getting things ready . . . <Rings height={50} color='red' />
            </div>
          </div>
        )}
  
        {/* Content based on showProgress, showScore */}
        {showProgress ? (
          <ProgressCard
            questions={questions}
            handleProgressToggle={handleProgressToggle}
            handleLinkFromProgress={handleLinkFromProgress}
          />
        ) : showScore ? (
          <ScoreReportCard
            score={score}
            quizLength={questions.length}
            questions={questions}
            handleRetakeQuiz={handleRetakeQuiz}
            question={questions[currentQuestion]}
            selectedAnswerID={selectedAnswerID}
            handleNextQuestion={handleNextQuestion}
            handlePrevQuestion={handlePrevQuestion}
            handleFirstQuestion={handleFirstQuestion}
            handleLastQuestion={handleLastQuestion}
          />
        ) : (
          <QuestionCard
            quizLength={questions.length}
            question={questions[currentQuestion]}
            selectedAnswerID={selectedAnswerID}
            handleAnswerOptionClick={handleAnswerOptionClick}
            handleNextQuestion={handleNextQuestion}
            handlePrevQuestion={handlePrevQuestion}
            handleScoreQuiz={handleScoreQuiz}
            handleClearAnswers={handleClearAnswers}
            handleProgressToggle={handleProgressToggle}
          />
        )}
      </div>
    </main>
    <Footer />
  </div>
  


  )


}

export default HomePage

function resizeCanvas(canvasRef: React.RefObject<HTMLCanvasElement>, webcamRef: React.RefObject<Webcam>) {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if ((canvas && video)) {
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  }
}


function formatDate(d: Date) {
  const formattedDate =
    [
      (d.getMonth() + 1).toString().padStart(2, "0"),
      d.getDate().toString().padStart(2, "0"),
      d.getFullYear(),
    ]
      .join("-") +
    " " +
    [
      d.getHours().toString().padStart(2, "0"),
      d.getMinutes().toString().padStart(2, "0"),
      d.getSeconds().toString().padStart(2, "0"),
    ].join("-");
  return formattedDate;
}

function base64toBlob(base64Data: any) {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteCharacters.length);
  const byteArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: "image/png" }); // 
}