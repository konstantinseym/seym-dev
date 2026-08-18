'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="tracking-custom hover:text-palette-denim cursor-pointer text-base lowercase transition lg:text-lg"
    >
      ← back
    </button>
  )
}
