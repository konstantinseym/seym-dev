import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'

export const getProject = cache(async (slug: string) => {
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
})
