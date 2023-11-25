import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import Footer from '@/components/footer'

import './globals.css'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import { Provider } from '@/providers/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: " ALL GOOD's ",
  description: 'anything online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <Provider> 
        <html lang="en">
        <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
          <ModalProvider/>
          <ToastProvider/>
          <Navbar/>
          {children}
          <Footer/>
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  )
}
