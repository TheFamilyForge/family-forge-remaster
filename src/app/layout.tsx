// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Header from '@components/Header';
export const metadata = {
  title: 'The Family Forge',
  description: 'Custom engraved goods and artisan designs',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;700&family=Roboto&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
