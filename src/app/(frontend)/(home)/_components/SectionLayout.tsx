import type { ReactNode } from 'react'

import SectionHeader from './SectionHeader'

type SectionLayoutProps = {
  id: string
  header: string
  children: ReactNode
}

export default function SectionLayout({ id, header, children }: SectionLayoutProps) {
  return (
    <section id={id} aria-label={header} className="pb-12">
      <SectionHeader label={header} />
      <div className="bg-palette-eggshell text-palette-space flex w-full flex-col items-center rounded-t-2xl py-5">
        {children}
      </div>
    </section>
  )
}
