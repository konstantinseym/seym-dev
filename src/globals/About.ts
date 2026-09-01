import { GlobalConfig } from 'payload'
import { revalidateAbout } from '@/hooks/revalidateContent'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Обо мне',
  admin: { group: 'Сайт' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [revalidateAbout],
  },
  fields: [
    {
      name: 'portrait',
      label: 'Портрет',
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
      label: 'Разделы',
      type: 'array',
      required: true,
      minRows: 1,

      labels: {
        singular: 'Раздел',
        plural: 'Разделы',
      },

      fields: [
        {
          name: 'title',
          label: 'Заголовок',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Текст',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
