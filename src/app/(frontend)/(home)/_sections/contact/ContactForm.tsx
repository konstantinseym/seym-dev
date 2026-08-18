'use client'

import Button from '@/app/(frontend)/_components/Button'
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
    <form
      action={createLead}
      className="flex w-full max-w-2xl flex-col items-start gap-3 px-3 py-15"
    >
      <h3 className="text-3xl font-medium lg:text-5xl">{contactTitle}</h3>
      <label htmlFor="user-contact" className="text-palette-denim">
        {contactFormLabel}
      </label>
      <div className="flex w-full items-end gap-2">
        <input
          type="text"
          id="user-contact"
          name="contact"
          required
          minLength={2}
          maxLength={500}
          placeholder={contactInputPlaceholder}
          className="focus:border-palette-denim h-7 w-full max-w-lg border-b px-2 text-center text-xs outline-0 transition lg:text-sm"
        />
        <Button type="submit" aria-label="Send">
          send
        </Button>
      </div>
    </form>
  )
}
