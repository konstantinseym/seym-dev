import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user: unknown } }) => Boolean(req.user)

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },

  admin: {
    group: 'Входящие',
    useAsTitle: 'contact',
    defaultColumns: ['contact', 'isRead', 'createdAt'],
  },

  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') {
          return
        }

        const recipient = process.env.RESEND_TO_EMAIL

        if (!recipient) {
          req.payload.logger.warn('Lead notification skipped: RESEND_TO_EMAIL is not configured')
          return
        }

        try {
          await req.payload.sendEmail({
            to: recipient,
            subject: 'Новая заявка — seym.dev',
            text: [
              'На сайте seym.dev появилась новая заявка.',
              '',
              `Контакт: ${doc.contact}`,
              `ID заявки: ${doc.id}`,
              `Время: ${doc.createdAt}`,
            ].join('\n'),
          })
        } catch (error) {
          req.payload.logger.error({
            err: error,
            leadID: doc.id,
            msg: 'Failed to send lead notification email',
          })
        }
      },
    ],
  },

  fields: [
    {
      name: 'contact',
      label: 'Контактные данные',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 500,
    },
    {
      name: 'isRead',
      label: 'Прочитано',
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
