import 'server-only'

import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { CACHE_TAGS } from '@/lib/cacheTags'

export const getProject = cache((slug: string) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({
        config: configPromise,
      })

      const { docs } = await payload.find({
        collection: 'projects',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
        overrideAccess: false,
        depth: 1,
      })

      return docs[0] ?? null
    },
    ['project', slug],
    { tags: [CACHE_TAGS.projects] },
  )(),
)
