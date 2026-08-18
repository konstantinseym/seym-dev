'use client'

import { motion, type Variants } from 'motion/react'

import LinkIcon from '../../_components/icons/LinkIcon'

import type { Contact } from '@/payload-types'

type ContactListProps = {
  contacts: Contact['items']
}

export default function ContactList({ contacts }: ContactListProps) {
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } satisfies Variants

  const contactsVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } satisfies Variants

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={listVariants}
      className="w-full max-w-lg pr-8 pl-20"
    >
      {contacts.map((contact, index) => (
        <motion.div
          key={contact.id}
          variants={contactsVariants}
          className="mb-5 grid grid-cols-[auto_1fr] justify-items-end"
        >
          <span className="tracking-custom text-palette-denim text-xs lg:text-sm">
            / {String(index + 1).padStart(2, '0')}
          </span>
          <a
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2"
          >
            <span className="tracking-custom uppercase">{contact.label}</span>
            <LinkIcon width={16} />
          </a>
          <span className="text-palette-denim col-start-2 text-xs lg:text-sm">{contact.value}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
