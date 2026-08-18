import type { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className="border-palette-space tracking-custom hover:border-palette-denim cursor-pointer rounded-full border px-4 py-1 text-sm transition lg:text-base"
    >
      {children}
    </button>
  )
}
