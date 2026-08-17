import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'

export const getContacts = cache(async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.findGlobal({ slug: 'contacts' })
})
