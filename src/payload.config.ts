import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { ru } from '@payloadcms/translations/languages/ru'

import { About } from './globals/About'
import { Contacts } from './globals/Contacts'
import { Leads } from './collections/Leads'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { SiteSettings } from './globals/SiteSettings'
import { PrivacyPolicy } from './globals/PrivacyPolicy'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { ru },
    fallbackLanguage: 'ru',
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- seym.dev CMS',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/admin-favicon.svg',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/AdminLogo#default',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, Leads],
  globals: [About, Contacts, SiteSettings, PrivacyPolicy],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
