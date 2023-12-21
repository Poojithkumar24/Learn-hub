'use client'
import { NavbarRoutes } from "@/components/navbar-routes"
import { useTheme } from "next-themes";
import {useEffect,useState} from "react"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
   const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true)
  }, [])

  const mode = useTheme();
  const currTheme = mode?.theme;
  const isDark = currTheme?.startsWith("dark");
  const isLight = currTheme?.startsWith("light");

  return (
    <div>
      {isClient && isLight ? (
          <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
          <MobileSidebar />
      <NavbarRoutes />     
        </div>
        ) :  isClient && isDark?(
          <div className="p-4 border-b h-full flex items-center bg-black shadow-sm">
        <MobileSidebar />
      <NavbarRoutes />
        </div>
        ) :null}
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