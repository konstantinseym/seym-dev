import 'server-only'

import { cache } from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'

export const getProjects = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'projects',
    sort: 'order',
    pagination: false,
    overrideAccess: false,
    depth: 1,
  })

  return docs
})
