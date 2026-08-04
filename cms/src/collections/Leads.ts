import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user: unknown } }) => Boolean(req.user)

export const Leads: CollectionConfig = {
  slug: 'leads',

  admin: {
    group: 'Inbox',
    useAsTitle: 'contact',
    defaultColumns: ['contact', 'isRead', 'createdAt'],
  },

  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },

  fields: [
    {
      name: 'contact',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 500,
    },
    {
      name: 'isRead',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },

      access: {
        create: isAdmin,
        update: isAdmin,
      },
    },
  ],
}
