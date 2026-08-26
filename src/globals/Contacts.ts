import { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Контактные данные',
  admin: { group: 'Сайт' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'items',
      label: 'Контакты',
      type: 'array',
      required: true,
      minRows: 1,

      labels: {
        singular: 'Контакт',
        plural: 'Контакты',
      },

      fields: [
        {
          name: 'label',
          label: 'Название',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Значение',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Ссылка',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
