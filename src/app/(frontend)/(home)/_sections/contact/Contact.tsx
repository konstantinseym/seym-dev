import SectionLayout from '../../_components/SectionLayout'
import { getSiteSettings } from '@/data/getSiteSettings'

export default async function Contact() {
  const siteSettings = await getSiteSettings()

  return (
    <SectionLayout id="contact" header={siteSettings.contactSectionTitle}>
      contact content
    </SectionLayout>
  )
}
