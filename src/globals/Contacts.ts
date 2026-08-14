import { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  admin: { group: 'Site' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,

      labels: {
        singular: 'Contact',
        plural: 'Contacts',
      },

      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
