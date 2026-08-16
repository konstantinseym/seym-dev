import type { ReactNode } from 'react'

import SectionHeader from './SectionHeader'

type SectionLayoutProps = {
  id: string
  header: string
  children: ReactNode
}

export default async function SectionLayout({ id, header, children }: SectionLayoutProps) {
  return (
    <section id={id} className="min-h-screen pb-12">
      <SectionHeader label={header} />
      <div className="bg-palette-eggshell text-palette-space mx-auto flex w-full max-w-7xl flex-col items-center rounded-2xl py-5">
        {children}
      </div>
    </section>
  )
}
