import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

import { ThemeProvider } from "@/components/providers/theme-provider"
import { ModeToggle } from '@/components/ui/dark-light';

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full ">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
      </ThemeProvider>
    </div>
   );
}
 
export default DashboardLayout;