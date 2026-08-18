import type { Metadata } from 'next'

import { getSiteSettings } from '@/data/getSiteSettings'
import { getPrivacyPolicy } from '@/data/getPrivacyPolicy'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()

  return {
    title: siteSettings.policyLabel,
    description:
      'Learn how seym.dev collects, uses, stores, and protects personal data submitted through the contact form.',
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
  const privacyPolicy = await getPrivacyPolicy()
  const siteSettings = await getSiteSettings()

  return (
    <main className="min-h-screen bg-white text-black">
      <article>
        <div className="mx-auto flex max-w-7xl flex-col gap-24 px-3 py-16">
          <header>
            <h1 className="text-center text-2xl uppercase">{siteSettings.policyLabel}</h1>
            <p>Last updated: {privacyPolicy.updatedAt}</p>
          </header>
          <p className="whitespace-pre-wrap">{privacyPolicy.content}</p>
        </div>
      </article>
    </main>
  )
}
