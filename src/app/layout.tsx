// src/app/layout.tsx
import './globals.css'
import './embla.css'
import { ReactNode } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Bebas_Neue } from 'next/font/google'
import ScrollReset from './scroll-reset'

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
      <Head>
        {/* viewport & safari UI settings */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#f2f2f2" />

        {/* ── Preload the Products hero image ─────────────────── */}
        <link
          rel="preload"
          as="image"
          href="/assets/photos/caleb-and-declan-products-hero.webp"
        />
      </Head>
      <body>
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
