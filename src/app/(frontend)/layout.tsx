import { Montserrat } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import 'lenis/dist/lenis.css'
import './globals.css'

import SmoothScroll from './_components/SmoothScroll'

import { getSiteSettings } from '@/data/getSiteSettings'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#1d2d44',
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()

  return {
    metadataBase: new URL('https://seym.dev'),
    applicationName: siteSettings.siteLogoText,
    authors: [
      {
        name: 'Konstantin Seym',
        url: 'https://seym.dev',
      },
    ],
    creator: 'Konstantin Seym',
    publisher: siteSettings.siteLogoText,
    title: {
      default: `${siteSettings.siteLogoText} — ${siteSettings.siteLogoSubtitle}`,
      template: `%s — ${siteSettings.siteLogoText}`,
    },
    description:
      'Независимая веб-студия: создаю выразительные, быстрые и надёжные сайты и веб-приложения — от дизайна и фронтенда до бэкенда и развёртывания.',
    appleWebApp: {
      title: siteSettings.siteLogoText,
    },
  }
}

type FrontendLayoutProps = {
  children: ReactNode
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
