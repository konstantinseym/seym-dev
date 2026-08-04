import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  admin: { group: 'Site' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'portrait',
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
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,

      labels: {
        singular: 'Section',
        plural: 'Sections',
      },

      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
