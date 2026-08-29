import type { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className="border-palette-space tracking-custom hover:border-palette-denim hover:text-palette-denim cursor-pointer rounded-full border px-4 py-1 text-sm transition disabled:cursor-not-allowed disabled:opacity-30 lg:text-base"
    >
      {children}
    </button>
  )
}
