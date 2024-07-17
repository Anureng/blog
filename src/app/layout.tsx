import './globals.css';
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})
import { Toaster } from "@/components/ui/toaster"

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={cn(
        'antialiased',
        fontHeading.variable,
        fontBody.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>

  )
}