'use client'

import type { ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'

import { LENIS_OPTIONS } from '@/lib/lenis.config'

type SmoothScrollProps = {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  )
}
