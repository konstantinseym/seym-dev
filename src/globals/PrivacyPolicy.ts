import { GlobalConfig } from 'payload'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  admin: { group: 'Site' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [{ name: 'content', type: 'textarea', required: true }],
}
