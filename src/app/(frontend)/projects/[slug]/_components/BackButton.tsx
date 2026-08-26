'use client'

import { useRouter } from 'next/navigation'

type BackButtonProps = {
  children: string
}

export default function BackButton({ children }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="tracking-custom hover:text-palette-denim cursor-pointer text-base lowercase transition lg:text-lg"
    >
      ← {children}
    </button>
  )
}
