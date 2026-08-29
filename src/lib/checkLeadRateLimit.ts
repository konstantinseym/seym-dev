import 'server-only'

import { RateLimiterRes } from 'rate-limiter-flexible'

import { leadRateLimiter } from './leadRateLimiter'

export type LeadRateLimitResult =
  | {
      allowed: true
      remainingPoints: number
    }
  | {
      allowed: false
      reason: 'rate-limit-exceeded'
      retryAfterMs: number
    }

export async function checkLeadRateLimit(identifier: string): Promise<LeadRateLimitResult> {
  try {
    const result = await leadRateLimiter.consume(identifier)

    return {
      allowed: true,
      remainingPoints: result.remainingPoints,
    }
  } catch (error) {
    if (error instanceof RateLimiterRes) {
      return {
        allowed: false,
        reason: 'rate-limit-exceeded',
        retryAfterMs: error.msBeforeNext,
      }
    }

    throw error
  }
}
