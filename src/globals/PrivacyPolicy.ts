import { GlobalConfig } from 'payload'
import { revalidatePrivacyPolicy } from '@/hooks/revalidateContent'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  label: 'Политика конфиденциальности',
  admin: { group: 'Сайт' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  hooks: {
    afterChange: [revalidatePrivacyPolicy],
  },
  fields: [
    {
      name: 'content',
      label: 'Содержание',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Раздел', plural: 'Разделы' },
      fields: [
        {
          name: 'header',
          label: 'Заголовок',
          type: 'text',
          required: true,
        },
        {
          name: 'paragraph',
          label: 'Текст',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
