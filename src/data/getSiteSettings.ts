import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'

export const getSiteSettings = cache(async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.findGlobal({ slug: 'site-settings' })
})
