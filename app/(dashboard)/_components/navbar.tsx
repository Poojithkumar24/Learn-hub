'use client'
import { NavbarRoutes } from "@/components/navbar-routes"


import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {


  return (
    <div>
     
     <div className="p-4 border-b h-full flex items-center bg-gradient-to-r from-purple-400 to-pink-400 shadow-sm">
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