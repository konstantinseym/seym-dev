import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import type { Media, Project } from '@/payload-types'
import { CACHE_TAGS, PUBLIC_CONTENT_CACHE_TAGS } from '@/lib/cacheTags'

type RevalidationContext = {
  disableRevalidation?: boolean
}

function isRevalidationDisabled(context: unknown) {
  return Boolean((context as RevalidationContext | undefined)?.disableRevalidation)
}

function expireTag(tag: string) {
  revalidateTag(tag, { expire: 0 })
}

function revalidateProjectPaths(slug?: string | null) {
  if (slug) {
    revalidatePath(`/projects/${slug}`, 'page')
  }
}

export const revalidateAbout: GlobalAfterChangeHook = ({ context, doc }) => {
  if (isRevalidationDisabled(context)) return doc

  expireTag(CACHE_TAGS.about)
  revalidatePath('/', 'page')

  return doc
}

export const revalidateContacts: GlobalAfterChangeHook = ({ context, doc }) => {
  if (isRevalidationDisabled(context)) return doc

  expireTag(CACHE_TAGS.contacts)
  revalidatePath('/', 'page')

  return doc
}

export const revalidatePrivacyPolicy: GlobalAfterChangeHook = ({ context, doc }) => {
  if (isRevalidationDisabled(context)) return doc

  expireTag(CACHE_TAGS.privacyPolicy)
  revalidatePath('/privacy-policy', 'page')

  return doc
}

export const revalidateSiteSettings: GlobalAfterChangeHook = ({ context, doc }) => {
  if (isRevalidationDisabled(context)) return doc

  expireTag(CACHE_TAGS.siteSettings)

  revalidatePath('/', 'layout')

  return doc
}

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  context,
  doc,
  previousDoc,
}) => {
  if (isRevalidationDisabled(context)) return doc

  expireTag(CACHE_TAGS.projects)
  revalidatePath('/', 'page')
  revalidatePath('/sitemap.xml')
  revalidateProjectPaths(doc.slug)

  if (previousDoc?.slug !== doc.slug) {
    revalidateProjectPaths(previousDoc?.slug)
  }

  return doc
}

export const revalidateDeletedProject: CollectionAfterDeleteHook<Project> = ({ context, doc }) => {
  if (isRevalidationDisabled(context)) return doc

  expireTag(CACHE_TAGS.projects)
  revalidatePath('/', 'page')
  revalidatePath('/sitemap.xml')
  revalidateProjectPaths(doc.slug)

  return doc
}

function revalidateAllPublicContent() {
  for (const tag of PUBLIC_CONTENT_CACHE_TAGS) {
    expireTag(tag)
  }

  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')
}

export const revalidateMedia: CollectionAfterChangeHook<Media> = ({ context, doc }) => {
  if (isRevalidationDisabled(context)) return doc

  revalidateAllPublicContent()
  return doc
}

export const revalidateDeletedMedia: CollectionAfterDeleteHook<Media> = ({ context, doc }) => {
  if (isRevalidationDisabled(context)) return doc

  revalidateAllPublicContent()
  return doc
}
