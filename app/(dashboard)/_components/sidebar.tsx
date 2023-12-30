import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
   <div className="h-full border-r flex flex-col overflow-y-auto  shadow-sm bg-gradient-to-r from-green-400 to-purple-400">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
