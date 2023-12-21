"use client";
import { ThemeProvider } from "./providers/theme-provider";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { ModeToggle } from "./ui/dark-light";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
    >
      
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      
      <div className="flex gap-x-2 ml-auto">
        <div className="mr-3">
          <ModeToggle />
        </div>
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="destructive" className="text-md mr-2">
              <LogOut className="h-4 w-4"/>
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="destructive" className="mr-3 text-md">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
      </ThemeProvider>
    </>
  )
}