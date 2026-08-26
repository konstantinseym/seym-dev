import localFont from 'next/font/local'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import 'lenis/dist/lenis.css'
import './globals.css'

import SmoothScroll from './_components/SmoothScroll'

const myFont = localFont({
  src: '../../assets/fonts/Montserrat-VariableFont_wght.ttf',
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
    default: 'seym.dev — создаю место в сети людям и бизнесу',
    template: '%s — seym.dev',
  },
  description:
    'Независимая веб-студия: создаю выразительные, быстрые и надёжные сайты и веб-приложения — от дизайна и фронтенда до бэкенда и развёртывания.',

  appleWebApp: {
    title: 'seym.dev',
  },
}

type FrontendLayoutProps = {
  children: ReactNode
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <html lang="ru">
      <body className={myFont.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
