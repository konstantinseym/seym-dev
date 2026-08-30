import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    forgotPassword: {
      expiration: 60 * 60 * 1000,
      generateEmailSubject: () => 'Восстановление пароля — seym.dev CMS',
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
