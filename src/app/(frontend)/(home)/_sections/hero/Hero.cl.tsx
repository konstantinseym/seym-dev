'use client'

import { useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useAnimationControls,
  useMotionValueEvent,
  type Variants,
} from 'motion/react'

import { SLOW_TRANSITION } from '@/lib/motion.config'
import ScrollHint from './ScrollHint.cl'
import Button from '../../../_components/Button'
import heroBackground from '@/assets/images/hero-background.avif'
import type { SiteSetting } from '@/payload-types'

type HeroClientProps = {
  siteSettings: SiteSetting
}

type ActiveScreen = 1 | 2 | 3

export default function HeroClient({ siteSettings }: HeroClientProps) {
  const pageRef = useRef<HTMLDivElement>(null)
  const navigationPlayedRef = useRef(false)

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(1)

  const lenis = useLenis()
  const navigationControls = useAnimationControls()

  const logoLetters = siteSettings.siteLogoText.split('')

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  })

  function skipHeroAnimation() {
    const page = pageRef.current

    if (!page || !lenis) return

    const scrollRange = page.offsetHeight - window.innerHeight

    lenis.scrollTo(scrollRange * 0.9 + 1)
  }

  function skipToLeadForm() {
    const contactSection = document.getElementById('contact')
    const contactInput = document.getElementById('user-contact') as HTMLInputElement | null

    if (!contactSection) return

    if (!lenis) {
      contactSection.scrollIntoView()
      contactInput?.focus({ preventScroll: true })
      return
    }

    lenis.scrollTo(contactSection, {
      onComplete: () => {
        contactInput?.focus({ preventScroll: true })
      },
    })
  }

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -64])

  const firstScreenOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])

  const secondScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0],
  )

  const thirdScreenOpacity = useTransform(scrollYProgress, [0, 0.8, 0.9, 1], [0, 0, 1, 1])

  const logoY = useTransform(scrollYProgress, [0, 0.2, 1], [0, -64, -64])
  const subtitleY = useTransform(scrollYProgress, [0, 0.2, 1], [0, 64, 64])
  const skipBtnY = useTransform(scrollYProgress, [0, 0.2, 1], [0, 32, 32])
  const navHintY = useTransform(scrollYProgress, [0, 0.8, 0.9, 1], [0, 0, -16, -16])

  const firstTextOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0])

  const secondTextOpacity = useTransform(scrollYProgress, [0.38, 0.43, 0.55, 0.6], [0, 1, 1, 0])

  const thirdTextOpacity = useTransform(scrollYProgress, [0.58, 0.63, 0.75, 0.8], [0, 1, 1, 0])

  const firstTextY = useTransform(scrollYProgress, [0.2, 0.4], [16, -16])
  const secondTextY = useTransform(scrollYProgress, [0.38, 0.5, 0.6], [16, 0, -8])
  const thirdTextX = useTransform(scrollYProgress, [0.58, 0.75, 0.8], [0, 0, -32])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextActiveScreen: ActiveScreen = value < 0.175 ? 1 : value < 0.85 ? 2 : 3

    setActiveScreen((currentScreen) =>
      currentScreen === nextActiveScreen ? currentScreen : nextActiveScreen,
    )

    if (value >= 0.9 && !navigationPlayedRef.current) {
      navigationPlayedRef.current = true
      navigationControls.start('visible')
    }
  })

  const navigationVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } satisfies Variants

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } satisfies Variants

  return (
    <div ref={pageRef} className="relative h-[400vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={SLOW_TRANSITION}
        className="sticky top-0 h-screen"
      >
        <motion.div style={{ y: bgY }} className="relative h-full w-full overflow-hidden">
          <Image src={heroBackground} alt="" fill sizes="100vw" preload className="object-cover" />

          <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_bottom,var(--color-palette-eggshell)_0%,var(--color-palette-eggshell)_60%,rgba(0,0,0,0.5)_90%,#000_100%)]" />
        </motion.div>

        <motion.header
          inert={activeScreen !== 1}
          style={{
            opacity: firstScreenOpacity,
            pointerEvents: activeScreen === 1 ? 'auto' : 'none',
          }}
          className="absolute top-0 flex h-full w-full flex-col items-center justify-center"
        >
          <motion.p
            style={{ y: logoY }}
            className="-tracking-custom text-7xl font-semibold lg:text-8xl"
          >
            {logoLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0,
                  delay: 1 + index / 5,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{
              ...SLOW_TRANSITION,
              delay: 3,
            }}
            style={{ y: subtitleY }}
            className="bg-palette-eggshell flex w-full -translate-y-6 items-center justify-center overflow-hidden lg:-translate-y-7.25"
          >
            <h1 className="text-palette-denim tracking-custom text-base leading-4 font-light lg:text-xl lg:leading-5">
              {siteSettings.siteLogoSubtitle}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ...SLOW_TRANSITION,
              delay: 3.5,
            }}
            style={{ y: skipBtnY }}
            className="absolute top-2/3 flex gap-12"
          >
            <Button onClick={skipHeroAnimation}>{siteSettings.skipToNavLabel}</Button>
            <Button onClick={skipToLeadForm}>{siteSettings.skipToContactLabel}</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ...SLOW_TRANSITION,
              delay: 3.5,
            }}
          >
            <ScrollHint label={siteSettings.heroScrollLabel} />
          </motion.div>
        </motion.header>

        <motion.div
          inert={activeScreen !== 2}
          className="absolute top-0 flex h-full w-full flex-col items-center justify-center"
          style={{
            opacity: secondScreenOpacity,
            pointerEvents: activeScreen === 2 ? 'auto' : 'none',
          }}
        >
          <div className="relative flex w-full max-w-4xl items-center justify-center">
            <div className="tracking-custom relative grid w-full place-items-center px-12 text-center">
              <motion.p
                className="col-start-1 row-start-1 text-4xl uppercase lg:text-5xl"
                style={{
                  opacity: firstTextOpacity,
                  y: firstTextY,
                }}
              >
                {siteSettings.heroIntroLabel}
              </motion.p>

              <motion.p
                className="col-start-1 row-start-1 text-xl leading-10 whitespace-pre-wrap lg:text-3xl"
                style={{
                  opacity: secondTextOpacity,
                  y: secondTextY,
                }}
              >
                {siteSettings.heroIntroDescription}
              </motion.p>

              <motion.p
                className="text-palette-denim col-start-1 row-start-1 whitespace-pre-wrap"
                style={{
                  opacity: thirdTextOpacity,
                  x: thirdTextX,
                }}
              >
                {siteSettings.heroIntroPrompt}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          inert={activeScreen !== 3}
          className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-12"
          style={{
            opacity: thirdScreenOpacity,
            pointerEvents: activeScreen === 3 ? 'auto' : 'none',
          }}
        >
          <motion.span
            key="navHint"
            style={{ y: navHintY }}
            className="tracking-custom text-palette-denim"
            id="hero-nav-title"
          >
            {siteSettings.heroNavLabel}
          </motion.span>

          <motion.nav
            initial="hidden"
            animate={navigationControls}
            variants={navigationVariants}
            className="w-full max-w-4xl pr-18 pl-9 text-xl lg:text-2xl"
            aria-labelledby="hero-nav-title"
          >
            <ul className="flex flex-col gap-9">
              <motion.li className="flex justify-between" variants={linkVariants}>
                <Link href="#portfolio">
                  <span className="uppercase">{siteSettings.portfolioSectionTitle}</span>
                </Link>

                <span className="text-palette-denim text-xs lg:text-sm">/ 01</span>
              </motion.li>

              <motion.li className="flex justify-between" variants={linkVariants}>
                <Link href="#about">
                  <span className="uppercase">{siteSettings.aboutSectionTitle}</span>
                </Link>

                <span className="text-palette-denim text-xs lg:text-sm">/ 02</span>
              </motion.li>

              <motion.li className="flex justify-between" variants={linkVariants}>
                <Link href="#contact">
                  <span className="uppercase">{siteSettings.contactSectionTitle}</span>
                </Link>

                <span className="text-palette-denim text-xs lg:text-sm">/ 03</span>
              </motion.li>
            </ul>
          </motion.nav>
        </motion.div>
      </motion.div>
    </div>
  )
}
