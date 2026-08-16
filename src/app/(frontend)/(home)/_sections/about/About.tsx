import SectionLayout from '../../_components/SectionLayout'
import { getSiteSettings } from '@/data/getSiteSettings'

export default async function About() {
  const siteSettings = await getSiteSettings()

  return (
    <SectionLayout id="about" header={siteSettings.aboutSectionTitle}>
      about content
    </SectionLayout>
  )
}
