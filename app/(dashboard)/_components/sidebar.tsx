import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
   <div className="h-full border-r flex flex-col overflow-y-auto  shadow-sm bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
