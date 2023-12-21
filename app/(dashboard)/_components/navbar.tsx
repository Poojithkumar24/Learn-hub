'use client'
import { NavbarRoutes } from "@/components/navbar-routes"
import { useTheme } from "next-themes";

import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
   

  const mode = useTheme();
  const currTheme = mode?.theme;
  const isDark = currTheme?.startsWith("dark");
  const isLight = currTheme?.startsWith("light");

  return (
    <div>
     
     <div className="p-4 border-b h-full flex items-center bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm">
          <MobileSidebar />
      <NavbarRoutes />     
      </div>
       
    </div>
    
  )
}

/**
 * 
 * <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
 */
