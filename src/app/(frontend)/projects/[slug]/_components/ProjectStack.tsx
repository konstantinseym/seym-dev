'use client'

import { motion, type Variants } from 'motion/react'
import Image from 'next/image'

import { SLOW_TRANSITION } from '@/lib/motion.config'

import type { Project } from '@/payload-types'

type ImageData = {
  url: string
  alt: string
  width: number
  height: number
}

type ProjectStackProps = {
  header: string
  content: Project['stack']
  image: ImageData
}

export default function ProjectStack({ header, content, image }: ProjectStackProps) {
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
      className="flex w-full max-w-7xl flex-col items-start"
    >
      <h2 className="tracking-custom ml-3 text-base uppercase lg:text-lg">/ 02 {header}</h2>

      <motion.div variants={lineVariants} className="border-palette-space w-3/4 border-b" />

      <motion.ul
        variants={contentVariants}
        className="text-palette-denim mx-3 flex flex-wrap gap-2 py-2 text-sm uppercase lg:text-base"
      >
        {content.map((tech, index) => (
          <li key={tech.id} className="flex items-center gap-2">
            <span>{tech.value}</span>
            {index < content.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </motion.ul>

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
