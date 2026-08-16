import { getSiteSettings } from '@/data/getSiteSettings'

import HeroClient from './Hero.cl'

export default async function Hero() {
  const siteSettings = await getSiteSettings()

  return <HeroClient siteSettings={siteSettings} />
}
