import Image from 'next/image'

import SectionLayout from '../../_components/SectionLayout'
import { getSiteSettings } from '@/data/getSiteSettings'
import { getAbout } from '@/data/getAbout'

export default async function About() {
  const siteSettings = await getSiteSettings()
  const about = await getAbout()

  const portrait = typeof about.portrait === 'number' ? null : about.portrait

  if (!portrait?.url || !portrait.width || !portrait.height) {
    throw new Error('Portrait image is missing')
  }

  return (
    <SectionLayout id="about" header={siteSettings.aboutSectionTitle}>
      <div className="mx-9 my-10">
        <Image
          src={portrait.url}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          className="aspect-square object-cover grayscale-100 lg:aspect-video"
        />
      </div>
      {about.sections.map((section, index) => (
        <div key={section.id} className="flex max-w-7xl flex-col">
          <h3 className="tracking-custom ml-3 text-base uppercase lg:text-lg">
            / {index + 1} {section.title}
          </h3>
          <div className="border-palette-space w-3/4 border-b" />
          <p className="ml-3 max-w-17/20 pt-4 pb-6 text-sm leading-6 lg:text-base">
            {section.value}
          </p>
        </div>
      ))}
    </SectionLayout>
  )
}
