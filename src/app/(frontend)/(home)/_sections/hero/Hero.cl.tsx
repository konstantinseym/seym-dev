'use client'

import { useRef } from 'react'
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
import heroBackground from '@/assets/images/hero-background.avif'
import type { SiteSetting } from '@/payload-types'

type HeroClientProps = {
  siteSettings: SiteSetting
}

export default function HeroClient({ siteSettings }: HeroClientProps) {
  const pageRef = useRef(null)

  const logoLetters = siteSettings.siteLogoText.split('')

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -64])

  const firstScreenOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0, 0])
  const secondScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0],
  )
  const thirdScreenOpacity = useTransform(scrollYProgress, [0, 0.8, 0.9, 1], [0, 0, 1, 1])

  const firstScreenPointerEvents = useTransform(scrollYProgress, (value) =>
    value < 0.175 ? 'auto' : 'none',
  )
  const secondScreenPointerEvents = useTransform(scrollYProgress, (value) =>
    value >= 0.175 && value < 0.85 ? 'auto' : 'none',
  )
  const thirdScreenPointerEvents = useTransform(scrollYProgress, (value) =>
    value >= 0.85 ? 'auto' : 'none',
  )

  const logoY = useTransform(scrollYProgress, [0, 0.2, 1], [0, -64, -64])
  const subtitleY = useTransform(scrollYProgress, [0, 0.2, 1], [0, 64, 64])
  const navHintY = useTransform(scrollYProgress, [0, 0.8, 0.9, 1], [0, 0, -16, -16])

  const firstTextOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0])
  const secondTextOpacity = useTransform(scrollYProgress, [0.38, 0.43, 0.55, 0.6], [0, 1, 1, 0])
  const thirdTextOpacity = useTransform(scrollYProgress, [0.58, 0.63, 0.75, 0.8], [0, 1, 1, 0])

  const firstTextY = useTransform(scrollYProgress, [0.2, 0.4], [16, -16])
  const secondTextY = useTransform(scrollYProgress, [0.38, 0.5, 0.6], [16, 0, -8])
  const thirdTextX = useTransform(scrollYProgress, [0.58, 0.75, 0.8], [0, 0, -32])

  const navigationControls = useAnimationControls()
  const navigationPlayedRef = useRef(false)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
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
          style={{
            opacity: firstScreenOpacity,
            pointerEvents: firstScreenPointerEvents,
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
            <h1 className="text-palette-denim tracking-custom text-base leading-4 font-medium lg:text-xl lg:leading-5">
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
          >
            <ScrollHint label={siteSettings.heroScrollLabel} />
          </motion.div>
        </motion.header>

        <motion.section
          className="absolute top-0 flex h-full w-full flex-col items-center justify-center"
          style={{
            opacity: secondScreenOpacity,
            pointerEvents: secondScreenPointerEvents,
          }}
        >
          <div className="relative flex w-full max-w-4xl items-center justify-center">
            <div className="tracking-custom relative grid w-full place-items-center px-12 text-center">
              <motion.span
                className="tracking-custom col-start-1 row-start-1 text-4xl uppercase lg:text-5xl"
                style={{ opacity: firstTextOpacity, y: firstTextY }}
              >
                {siteSettings.heroIntroLabel}
              </motion.span>

              <motion.p
                className="col-start-1 row-start-1 text-xl leading-10 lg:text-3xl"
                style={{ opacity: secondTextOpacity, y: secondTextY }}
              >
                {siteSettings.heroIntroDescription}
              </motion.p>

              <motion.span
                className="text-palette-denim col-start-1 row-start-1"
                style={{ opacity: thirdTextOpacity, x: thirdTextX }}
              >
                {siteSettings.heroIntroPrompt}
              </motion.span>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-12"
          style={{
            opacity: thirdScreenOpacity,
            pointerEvents: thirdScreenPointerEvents,
          }}
        >
          <motion.span
            key="navHint"
            style={{ y: navHintY }}
            className="tracking-custom text-palette-denim"
          >
            {siteSettings.heroNavLabel}
          </motion.span>

          <motion.nav
            initial="hidden"
            animate={navigationControls}
            variants={navigationVariants}
            className="flex w-full max-w-4xl flex-col gap-9 pr-18 pl-9 text-xl lg:text-2xl"
          >
            <motion.div className="flex justify-between" variants={linkVariants}>
              <Link href="#portfolio">
                <span className="uppercase">{siteSettings.portfolioSectionTitle}</span>
              </Link>
              <span className="text-palette-denim text-xs lg:text-sm">/ 01</span>
            </motion.div>

            <motion.div className="flex justify-between" variants={linkVariants}>
              <Link href="#about">
                <span className="uppercase">{siteSettings.aboutSectionTitle}</span>
              </Link>
              <span className="text-palette-denim text-xs lg:text-sm">/ 02</span>
            </motion.div>

            <motion.div className="flex justify-between" variants={linkVariants}>
              <Link href="#contact">
                <span className="uppercase">{siteSettings.contactSectionTitle}</span>
              </Link>
              <span className="text-palette-denim text-xs lg:text-sm">/ 03</span>
            </motion.div>
          </motion.nav>
        </motion.section>
      </motion.div>
    </div>
  )
}
