import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {dark,shadesOfPurple} from '@clerk/themes';
import { ClerkProvider } from '@clerk/nextjs'
import {ToastProvider} from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-providers'
import { ThemeProvider } from "@/components/providers/theme-provider"

import { useTheme } from 'next-themes';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LearnHub',
  description: 'Learn with Learn Hub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
      <ClerkProvider
      appearance={{
         baseTheme:dark
      }} 
      >
        
        <html lang="en">
          <body className={inter.className } >
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            <ConfettiProvider />
            <ToastProvider />
           
            {children}
            
            </ThemeProvider>
            </body>
        </html>
      </ClerkProvider>
      
    
  )
}

