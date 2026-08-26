import type { Metadata } from 'next'

import Hero from './_sections/hero/Hero'
import Projects from './_sections/projects/Projects'
import About from './_sections/about/About'
import Contact from './_sections/contact/Contact'
import Footer from './_sections/footer/Footer'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'seym.dev — создаю место в сети людям и бизнесу',
    description:
      'Независимая веб-студия: создаю выразительные, быстрые и надёжные сайты и веб-приложения — от дизайна и фронтенда до бэкенда и развёртывания.',
    url: '/',
    siteName: 'seym.dev',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'seym.dev — создаю место в сети людям и бизнесу',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'seym.dev — создаю место в сети людям и бизнесу',
    description:
      'Независимая веб-студия: создаю выразительные, быстрые и надёжные сайты и веб-приложения — от дизайна и фронтенда до бэкенда и развёртывания.',
    images: ['/social-preview.png'],
  },
}

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
