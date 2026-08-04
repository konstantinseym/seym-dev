import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Site' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'siteLogoText',
              type: 'text',
              required: true,
            },
            {
              name: 'siteLogoSubtitle',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroScrollLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'heroIntroLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'heroIntroDescription',
              type: 'textarea',
              required: true,
            },
            {
              name: 'heroIntroPrompt',
              type: 'textarea',
              required: true,
            },
            {
              name: 'heroNavLabel',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            {
              name: 'portfolioSectionTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'aboutSectionTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'contactSectionTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'projectOverviewLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'projectStackLabel',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'contactFormLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'contactInputPlaceholder',
              type: 'text',
              required: true,
            },
            {
              name: 'contactThanksLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'ownerEmail',
              type: 'email',
              required: true,
            },
            {
              name: 'policyLabel',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
