"use client";

import { BarChart, Compass, Layout, List,Calendar ,ListChecks,PlusCircleIcon } from "lucide-react";
import { BsDisplay,BsBook, BsBookHalf,BsPlusCircle } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { PiChartLineUpBold,PiStudent } from "react-icons/pi";
import { PiClipboardBold } from "react-icons/pi";


import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: ListChecks,
    label: "Courses",
    href: "/",
  },
  {
    icon: Compass,
    label: "Enroll Courses",
    href: "/search",
  },
  {
    icon: Layout,
    label: "Take Quiz",
    href: "/courses/quiz",
  },
  
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: PlusCircleIcon,
    label: "Create Course",
    href: "/teacher/create",
  },
]

const adminRoutes = [
  {
    icon: List,
    label: "Manage Users",
    href: "/admin",
  },
  {
    icon: BarChart,
    label: "Feedback",
    href: "/admin/feedback",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");

  let routes = isTeacherPage ? teacherRoutes : guestRoutes;
  if(isAdminPage) routes = adminRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}