'use client'

import { createLead } from './actions'

import type { SiteSetting } from '@/payload-types'

type ContactFormProps = Pick<
  SiteSetting,
  'contactTitle' | 'contactFormLabel' | 'contactInputPlaceholder'
>

export default function ContactForm({
  contactTitle,
  contactFormLabel,
  contactInputPlaceholder,
}: ContactFormProps) {
  return (
    <form action={createLead} className="flex w-full max-w-2xl flex-col gap-3 px-3 py-15">
      <h3 className="text-3xl font-medium lg:text-5xl">{contactTitle}</h3>
      <label htmlFor="user-contact" className="text-palette-denim">
        {contactFormLabel}
      </label>
      <input
        type="text"
        id="user-contact"
        name="contact"
        required
        minLength={2}
        maxLength={500}
        placeholder={contactInputPlaceholder}
        className="h-7 w-full max-w-lg border-b px-2 text-center text-xs outline-0 lg:text-sm"
      />
      <button className="cursor-pointer" type="submit" aria-label="Send">
        send
      </button>
    </form>
  )
}
