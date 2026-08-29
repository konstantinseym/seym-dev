import 'server-only'

import { checkLeadRateLimit } from './checkLeadRateLimit'
import { createLeadRateLimitIdentifier } from './createLeadRateLimitIdentifier'
import { getClientIp } from './getClientIp'

import type { LeadRateLimitResult } from './checkLeadRateLimit'

export type CurrentClientLeadRateLimitResult =
  | LeadRateLimitResult
  | {
      allowed: false
      reason: 'client-ip-unavailable'
    }

export async function checkCurrentClientLeadRateLimit(): Promise<CurrentClientLeadRateLimitResult> {
  const clientIp = await getClientIp()

  if (!clientIp) {
    return {
      allowed: false,
      reason: 'client-ip-unavailable',
    }
  }

  const identifier = createLeadRateLimitIdentifier(clientIp)

  return checkLeadRateLimit(identifier)
}
