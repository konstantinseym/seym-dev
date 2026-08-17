import SectionLayout from '../../_components/SectionLayout'
import { getSiteSettings } from '@/data/getSiteSettings'
import { getContacts } from '@/data/getContacts'
import ContactForm from './ContactForm'
import ContactList from './ContactList'

export default async function Contact() {
  const siteSettings = await getSiteSettings()
  const contacts = await getContacts()

  return (
    <SectionLayout id="contact" header={siteSettings.contactSectionTitle}>
      <ContactForm
        contactTitle={siteSettings.contactTitle}
        contactFormLabel={siteSettings.contactFormLabel}
        contactInputPlaceholder={siteSettings.contactInputPlaceholder}
      />
      <ContactList contacts={contacts.items} />
    </SectionLayout>
  )
}
