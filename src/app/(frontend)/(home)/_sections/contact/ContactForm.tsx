'use client'

import { useActionState, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SLOW_TRANSITION } from '@/lib/motion.config'

import Button from '@/app/(frontend)/_components/Button'
import { createLead } from './actions'
import SendIcon from '@/app/(frontend)/_components/icons/SendIcon'

import type { CreateLeadState } from './actions'
import type { SiteSetting } from '@/payload-types'

type ContactFormProps = Pick<
  SiteSetting,
  | 'contactTitle'
  | 'contactFormLabel'
  | 'contactInputPlaceholder'
  | 'contactFormSubmitLabel'
  | 'formThanksLabel'
>

const initialState: CreateLeadState = {
  status: 'idle',
}

export default function ContactForm({
  contactTitle,
  contactFormLabel,
  contactInputPlaceholder,
  contactFormSubmitLabel,
  formThanksLabel,
}: ContactFormProps) {
  const [contactInput, setContactInput] = useState('')

  const normalizedContactInput = contactInput.trim()

  const isContactInputValid =
    normalizedContactInput.length >= 2 && normalizedContactInput.length <= 500

  const [actionState, formAction, isPending] = useActionState(createLead, initialState)

  return (
    <AnimatePresence mode="wait">
      {actionState.status === 'idle' && (
        <motion.form
          key="inputForm"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={SLOW_TRANSITION}
          action={formAction}
          aria-labelledby="contact-form-title"
          aria-busy={isPending}
          className="flex min-h-64 w-full max-w-2xl flex-col items-start gap-3 px-3 py-15"
        >
          <h3 id="contact-form-title" className="text-3xl font-medium lg:text-5xl">
            {contactTitle}
          </h3>
          <label htmlFor="user-contact" className="text-palette-denim">
            {contactFormLabel}
          </label>
          <div className="flex w-full items-end gap-2">
            <input
              type="text"
              id="user-contact"
              name="contact"
              required
              value={contactInput}
              onChange={(e) => {
                setContactInput(e.target.value)
              }}
              minLength={2}
              maxLength={500}
              disabled={isPending}
              placeholder={contactInputPlaceholder}
              className="focus:border-palette-denim h-7 w-full max-w-lg border-b px-2 text-center text-xs outline-0 transition lg:text-sm"
            />
            <Button
              type="submit"
              disabled={!isContactInputValid || isPending}
              aria-label={contactFormSubmitLabel}
            >
              <SendIcon width={16} />
            </Button>
          </div>
        </motion.form>
      )}
      {actionState.status === 'success' && (
        <motion.div
          key="successBlock"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={SLOW_TRANSITION}
          className="flex min-h-64 w-full items-center justify-center"
        >
          <p className="tracking-custom text-lg uppercase">{formThanksLabel}</p>
        </motion.div>
      )}

      {actionState.status === 'error' && (
        <motion.div
          key="errorBlock"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={SLOW_TRANSITION}
          className="flex min-h-64 w-full items-center justify-center"
        >
          <p className="tracking-custom text-lg text-red-500 uppercase">{actionState.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
