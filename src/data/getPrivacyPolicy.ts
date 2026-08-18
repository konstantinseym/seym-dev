import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'

export const getPrivacyPolicy = cache(async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.findGlobal({ slug: 'privacy-policy' })
})
