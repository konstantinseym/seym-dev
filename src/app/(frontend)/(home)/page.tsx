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
    title: 'seym.dev — Web Design & Development',
    description:
      'Independent web studio creating distinctive, fast and reliable websites and web applications — from design and frontend to backend and deployment.',
    url: '/',
    siteName: 'seym.dev',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'seym.dev — Web Design & Development',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'seym.dev — Web Design & Development',
    description:
      'Independent web studio creating distinctive, fast and reliable websites and web applications — from design and frontend to backend and deployment.',
    images: ['/social-preview.png'],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
