import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { CACHE_TAGS } from '@/lib/cacheTags'

export const getContacts = unstable_cache(async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.findGlobal({ slug: 'contacts' })
}, ['contacts'], { tags: [CACHE_TAGS.contacts] })
