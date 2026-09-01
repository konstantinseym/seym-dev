import { CollectionConfig } from 'payload'
import { revalidateDeletedProject, revalidateProject } from '@/hooks/revalidateContent'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Проект',
    plural: 'Проекты',
  },
  admin: {
    group: 'Контент',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateDeletedProject],
  },
  fields: [
    {
      name: 'name',
      label: 'Название',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Адрес страницы',
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
      label: 'Порядок отображения',
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
      label: 'Краткое описание',
      type: 'textarea',
      required: true,
    },
    {
      name: 'primaryImage',
      label: 'Основное изображение',
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
      label: 'Дополнительное изображение',
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
      label: 'Описание проекта',
      type: 'textarea',
      required: true,
    },
    {
      name: 'stack',
      label: 'Технологии',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Технология',
        plural: 'Технологии',
      },
      fields: [
        {
          name: 'value',
          label: 'Название технологии',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'demoUrl',
      label: 'Ссылка на демоверсию',
      type: 'text',
    },
  ],
}
