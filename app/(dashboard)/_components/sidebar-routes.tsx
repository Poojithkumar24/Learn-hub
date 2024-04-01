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
    label: "Register Courses",
    href: "/search",
  },
  
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

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