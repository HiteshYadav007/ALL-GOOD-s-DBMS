import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ModalProvider } from '@/providers/modal-providers';
import { ToasterProvider } from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-providers';
import { Provider } from '@/providers/authProvider';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Provider>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
          <ModalProvider/>
          <ToasterProvider/>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </Provider>
    
  )
}
