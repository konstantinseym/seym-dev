import Link from 'next/link'

import MailIcon from '../../_components/icons/MailIcon'

import { getSiteSettings } from '@/data/getSiteSettings'

export default async function Footer() {
  const siteSettings = await getSiteSettings()

  return (
    <footer className="text-palette-eggshell flex flex-col">
      <p className="-tracking-custom mt-12 text-6xl lg:text-8xl">
        {siteSettings.contactThanksLabel}
      </p>
      <div className="text-palette-eggshell/50 tracking-custom flex flex-col items-center gap-4 pt-12 pb-6 uppercase">
        <address>
          <a href={'mailto:' + siteSettings.ownerEmail} className="inline-flex gap-2">
            <MailIcon width={16} />
            {siteSettings.ownerEmail}
          </a>
        </address>

        <div className="border-palette-eggshell/50 w-xs border-b" />
        <Link href="/privacy-policy">{siteSettings.policyLabel}</Link>
      </div>
    </footer>
  )
}
