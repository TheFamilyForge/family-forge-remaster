// src/app/layout.tsx
import './globals.css'
import './embla.css'
import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Bebas_Neue } from 'next/font/google'
import ScrollReset from './scroll-reset'    // ← our new client component

const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas'
})

export const metadata = {
  title: 'The Family Forge',
  description: 'Custom engraved goods and artisan designs',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={bebas.variable}>
      <head />
      <body>
        {/* resets scroll on every navigation */}
        <ScrollReset />

        <Header />
        <div id="site-content">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
