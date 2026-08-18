import Image from 'next/image'

import Entry from './Entry'
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
        <Entry key={section.id} entry={section} index={index} />
      ))}
    </SectionLayout>
  )
}
