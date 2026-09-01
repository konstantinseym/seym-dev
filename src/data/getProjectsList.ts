import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { CACHE_TAGS } from '@/lib/cacheTags'

export const getProjects = unstable_cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
    sort: 'order',
    pagination: false,
    overrideAccess: false,
    depth: 1,
  })

  return docs
}, ['projects'], { tags: [CACHE_TAGS.projects] })
