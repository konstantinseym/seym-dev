import localFont from 'next/font/local'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import 'lenis/dist/lenis.css'
import './globals.css'

import SmoothScroll from './_components/SmoothScroll'

const myFont = localFont({
  src: '../../assets/fonts/montserrat-latin-wght-normal.woff2',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: 'https://seym.dev',
  applicationName: 'seym.dev',
  authors: [
    {
      name: 'Konstantin Seym',
      url: 'https://seym.dev',
    },
  ],
  creator: 'Konstantin Seym',
  publisher: 'seym.dev',
  title: {
    default: 'seym.dev — Web Design & Development',
    template: '%s — seym.dev',
  },
  description:
    'Independent web studio creating distinctive, fast and reliable websites and web applications — from design and frontend to backend and deployment.',

  appleWebApp: {
    title: 'seym.dev',
  },
}

type FrontendLayoutProps = {
  children: ReactNode
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
