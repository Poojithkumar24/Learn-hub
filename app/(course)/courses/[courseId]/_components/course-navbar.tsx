'use client'
import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { useTheme } from "next-themes";


interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {
 
  
  const mode = useTheme();
  const currTheme = mode?.theme;
  const isDark = currTheme?.startsWith("dark");
  const isLight = currTheme?.startsWith("light");
 
  
  return (

    
     <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
          <CourseMobileSidebar
            course={course}
            progressCount={progressCount}
          />
          <NavbarRoutes />
      </div> 
  )
}

/**  { isLight  && (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <CourseMobileSidebar
          course={course}
          progressCount={progressCount}
        />
        <NavbarRoutes />      
      </div>
      )}
      { isDark && (
        <div className="p-4 border-b h-full flex items-center bg-black shadow-sm">
        <CourseMobileSidebar
          course={course}
          progressCount={progressCount}
        />
        <NavbarRoutes />      
      </div>
      )} */
