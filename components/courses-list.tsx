import { Category, Course } from "@prisma/client";
import { Button } from "./ui/button";
import Link from "next/link";
import { CourseCard } from "@/components/course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
  items
}: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div>
            <div className="text-center text-md text-black-800 mt-10 ">
            No courses registerd!
              <Link href="/search" className="mr-1 ml-1 text-lg text-underline-offset-4 underline">
                CLICK HERE
              </Link>
              to find a course.
            </div>
            
        </div>

      )}
    </div>
  )
}