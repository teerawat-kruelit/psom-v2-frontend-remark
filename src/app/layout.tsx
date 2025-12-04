import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'

const prompt = Prompt({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'thai'],
  variable: '--font-prompt',
})

export const metadata: Metadata = {
  title: 'PMK | PSOM V2',
  description: 'Polomaker Program of Sale to Operation Management V2',
  icons: {
    icon: '/icon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${prompt.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
