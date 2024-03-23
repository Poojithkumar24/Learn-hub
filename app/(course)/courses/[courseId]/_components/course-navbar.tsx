
import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";



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
<<<<<<< HEAD
  

=======
>>>>>>> e8afb64ea0204aad8a2da98f1712818b949e5e16
 
  
  return (

    
<<<<<<< HEAD
    <div>
=======
     <div>
>>>>>>> e8afb64ea0204aad8a2da98f1712818b949e5e16
       <div className="p-4 border-b h-full flex items-center bg-gradient-to-r from-purple-400 to-pink-400 shadow-sm">
          <CourseMobileSidebar
            course={course}
            progressCount={progressCount}
          />
          <NavbarRoutes />
          </div>
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
