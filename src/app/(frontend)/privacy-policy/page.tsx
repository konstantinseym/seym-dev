import type { Metadata } from 'next'

import { getSiteSettings } from '@/data/getSiteSettings'
import { getPrivacyPolicy } from '@/data/getPrivacyPolicy'

const policyDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'long',
  timeZone: 'Europe/Moscow',
})

function formatPolicyDate(date: string) {
  return policyDateFormatter.format(new Date(date))
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()

  return {
    title: siteSettings.policyLabel,
    description:
      'Узнайте, как seym.dev собирает, использует, хранит и защищает персональные данные, отправленные через форму обратной связи.',
    alternates: {
      canonical: '/privacy-policy',
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function PrivacyPolicyPage() {
  const [privacyPolicy, siteSettings] = await Promise.all([getPrivacyPolicy(), getSiteSettings()])

  return (
    <main className="min-h-screen bg-white text-black">
      <article>
        <div className="mx-auto flex max-w-7xl flex-col gap-24 px-3 py-16">
          <header>
            <h1 className="text-center text-2xl uppercase">{siteSettings.policyLabel}</h1>
            {privacyPolicy.updatedAt && (
              <p>
                Обновлено:{' '}
                <time dateTime={privacyPolicy.updatedAt}>
                  {formatPolicyDate(privacyPolicy.updatedAt)}
                </time>
              </p>
            )}
          </header>

          <div className="flex flex-col gap-4">
            {privacyPolicy.content.map((paragraph) => (
              <section key={paragraph.id}>
                <h2 className="mb-2 text-lg">{paragraph.header}</h2>
                <p className="text-sm">{paragraph.paragraph}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
