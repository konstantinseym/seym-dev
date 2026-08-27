'use client'

import { motion, type Variants } from 'motion/react'
import Image from 'next/image'

import { SLOW_TRANSITION } from '@/lib/motion.config'

type ImageData = {
  url: string
  alt: string
  width: number
  height: number
}

type ProjectOverviewProps = {
  header: string
  paragraph: string
  image: ImageData
}

export default function ProjectOverview({ header, paragraph, image }: ProjectOverviewProps) {
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  } satisfies Variants

  const lineVariants = {
    hidden: {
      scaleX: 0,
      originX: 0,
    },
    visible: {
      scaleX: 1,
      transition: SLOW_TRANSITION,
    },
  } satisfies Variants

  const contentVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: SLOW_TRANSITION,
    },
  } satisfies Variants

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={sectionVariants}
      className="flex w-full max-w-7xl flex-col items-end text-right"
    >
      <h2 className="tracking-custom mr-3 text-base uppercase lg:text-lg">/ 01 {header}</h2>
      <motion.div variants={lineVariants} className="border-palette-space w-3/4 border-b" />
      <motion.p variants={contentVariants} className="mr-3 max-w-17/20 py-2 leading-6">
        {paragraph}
      </motion.p>
      <motion.div
        variants={contentVariants}
        className="mx-9 my-9 max-w-5xl self-center bg-white px-3 py-2"
      >
        <Image
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="eager"
        />
      </motion.div>
    </motion.section>
  )
}
