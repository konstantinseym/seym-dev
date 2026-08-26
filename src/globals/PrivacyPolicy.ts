import { GlobalConfig } from 'payload'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  admin: { group: 'Site' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: 'content',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'paragraph', plural: 'paragraphs' },
      fields: [
        {
          name: 'header',
          type: 'text',
          required: true,
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
