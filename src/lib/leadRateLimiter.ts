import 'server-only'

import { RateLimiterMemory } from 'rate-limiter-flexible'

export const leadRateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60 * 60,
  keyPrefix: 'lead',
})
