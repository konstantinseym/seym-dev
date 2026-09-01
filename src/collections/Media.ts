import type { CollectionConfig } from 'payload'
import { revalidateDeletedMedia, revalidateMedia } from '@/hooks/revalidateContent'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медиафайл',
    plural: 'Медиафайлы',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateMedia],
    afterDelete: [revalidateDeletedMedia],
  },
  fields: [
    {
      name: 'alt',
      label: 'Альтернативный текст',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
