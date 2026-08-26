'use client'

import { motion } from 'motion/react'

type ScrollHintProps = {
  label: string
}

export default function ScrollHint({ label }: ScrollHintProps) {
  return (
    <motion.span
      animate={{ y: [0, -4, 4, -2, 2, -1, 1, 0] }}
      transition={{
        repeat: Infinity,
        ease: 'easeOut',
        duration: 0.66,
        repeatDelay: 3,
      }}
      className="text-palette-denim tracking-custom absolute bottom-18 left-1/2 -translate-x-1/2 text-xs font-medium lg:text-sm"
    >
      {label}
    </motion.span>
  )
}
