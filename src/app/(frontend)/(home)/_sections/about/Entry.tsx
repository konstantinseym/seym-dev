'use client'

import { motion, type Variants } from 'motion/react'

import { SLOW_TRANSITION } from '@/lib/motion.config'

import type { About } from '@/payload-types'

type EntryProps = {
  entry: About['sections'][number]
  index: number
}

export default function Entry({ index, entry }: EntryProps) {
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

  const paragraphVariants = {
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
      aria-label={entry.title}
      className="flex max-w-7xl flex-col"
    >
      <h3 className="tracking-custom ml-3 text-base uppercase lg:text-lg">
        / {String(index + 1).padStart(2, '0')} {entry.title}
      </h3>
      <motion.div variants={lineVariants} className="border-palette-space w-3/4 border-b" />
      <motion.p variants={paragraphVariants} className="ml-3 max-w-17/20 pt-4 pb-6 leading-6">
        {entry.value}
      </motion.p>
    </motion.section>
  )
}
