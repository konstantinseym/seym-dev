'use server'

import { getPayload } from 'payload'

import configPromise from '@payload-config'

export async function createLead(formData: FormData) {
  const userInput = formData.get('contact')

  if (typeof userInput !== 'string') {
    throw new Error('Input value must be a string')
  }

  const contact = userInput.trim()

  if (contact.length < 2 || contact.length > 500) {
    throw new Error('Input lenght must be between 2 and 500 characters')
  }

  const payload = await getPayload({
    config: configPromise,
  })

  await payload.create({ collection: 'leads', data: { contact }, overrideAccess: false })
}
