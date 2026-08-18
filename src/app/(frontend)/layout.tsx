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
  title: 'Title',
  description: 'Description',
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
