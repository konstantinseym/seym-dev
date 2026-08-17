'use client'

import type { Contact } from '@/payload-types'

type ContactListProps = {
  contacts: Contact['items']
}

export default function ContactList({ contacts }: ContactListProps) {
  return (
    <div className="w-full max-w-lg pr-8 pl-20">
      {contacts.map((contact, index) => (
        <div key={contact.id} className="mb-5 grid grid-cols-[auto_1fr] justify-items-end">
          <span className="tracking-custom">/ {index + 1}</span>
          <span className="tracking-custom uppercase">{contact.label}</span>
          <span className="text-palette-denim col-start-2 text-xs lg:text-sm">{contact.value}</span>
        </div>
      ))}
    </div>
  )
}
