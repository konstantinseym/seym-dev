import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      min: 1,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'primaryImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
    },
    {
      name: 'secondaryImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
    },
    {
      name: 'overview',
      type: 'textarea',
      required: true,
    },
    {
      name: 'stack',
      type: 'textarea',
      required: true,
    },
  ],
}
