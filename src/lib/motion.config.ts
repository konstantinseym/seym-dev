import type { Transition } from 'motion/react'

export const SLOW_TRANSITION = {
  duration: 1,
  ease: 'easeInOut',
} satisfies Transition

export const FAST_TRANSITION = {
  duration: 0.3,
  ease: 'easeInOut',
} satisfies Transition
