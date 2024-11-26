import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Light Car',
  description: 'Viaje conosco na Light Car'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pr-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 text-gray-950 relative
      `}
      >
        {children}
      </body>
    </html>
  )
}
