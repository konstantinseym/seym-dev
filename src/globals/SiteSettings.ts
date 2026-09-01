import { GlobalConfig } from 'payload'
import { revalidateSiteSettings } from '@/hooks/revalidateContent'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: { group: 'Сайт' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основное',
          fields: [
            {
              name: 'siteLogoText',
              label: 'Текст логотипа',
              type: 'text',
              required: true,
            },
            {
              name: 'siteLogoSubtitle',
              label: 'Подпись под логотипом',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Главный экран',
          fields: [
            {
              name: 'skipToNavLabel',
              label: 'Текст кнопки «Перейти к меню»',
              type: 'text',
              required: true,
            },
            {
              name: 'skipToContactLabel',
              label: 'Текст кнопки «Перейти к контактам»',
              type: 'text',
              required: true,
            },
            {
              name: 'heroScrollLabel',
              label: 'Подсказка прокрутки',
              type: 'text',
              required: true,
            },
            {
              name: 'heroIntroLabel',
              label: 'Первая строка вступления',
              type: 'text',
              required: true,
            },
            {
              name: 'heroIntroDescription',
              label: 'Описание во вступлении',
              type: 'textarea',
              required: true,
            },
            {
              name: 'heroIntroPrompt',
              label: 'Заключительная строка вступления',
              type: 'textarea',
              required: true,
            },
            {
              name: 'heroNavLabel',
              label: 'Заголовок меню',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Разделы',
          fields: [
            {
              name: 'portfolioSectionTitle',
              label: 'Заголовок раздела «Портфолио»',
              type: 'text',
              required: true,
            },
            {
              name: 'aboutSectionTitle',
              label: 'Заголовок раздела «Обо мне»',
              type: 'text',
              required: true,
            },
            {
              name: 'contactSectionTitle',
              label: 'Заголовок раздела «Контакты»',
              type: 'text',
              required: true,
            },
            {
              name: 'contactFormSubmitLabel',
              label: 'Текст кнопки отправки формы',
              type: 'text',
              required: true,
            },
            {
              name: 'goBackButtonLabel',
              label: 'Текст кнопки «Назад»',
              type: 'text',
              required: true,
            },
            {
              name: 'demoButtonLabel',
              label: 'Текст кнопки демоверсии',
              type: 'text',
              required: true,
            },
            {
              name: 'projectOverviewLabel',
              label: 'Заголовок описания проекта',
              type: 'text',
              required: true,
            },
            {
              name: 'projectStackLabel',
              label: 'Заголовок стека проекта',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Контакты',
          fields: [
            {
              name: 'contactTitle',
              label: 'Заголовок формы',
              type: 'text',
              required: true,
            },
            {
              name: 'contactFormLabel',
              label: 'Подпись к полю',
              type: 'text',
              required: true,
            },
            {
              name: 'contactInputPlaceholder',
              label: 'Подсказка в поле',
              type: 'text',
              required: true,
            },
            {
              name: 'formThanksLabel',
              label: 'Текст благодартности за заявку',
              type: 'text',
              required: true,
            },
            {
              name: 'contactThanksLabel',
              label: 'Текст благодарности в подвале',
              type: 'text',
              required: true,
            },
            {
              name: 'ownerEmail',
              label: 'Электронная почта',
              type: 'email',
              required: true,
            },
            {
              name: 'policyLabel',
              label: 'Название ссылки на политику конфиденциальности',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
