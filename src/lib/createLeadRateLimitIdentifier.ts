import 'server-only'

import { createHmac } from 'node:crypto'

export function createLeadRateLimitIdentifier(clientIp: string): string {
  const secret = process.env.RATE_LIMIT_SECRET

  if (!secret) {
    throw new Error('RATE_LIMIT_SECRET is not configured')
  }

  if (Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error('RATE_LIMIT_SECRET must be at least 32 bytes')
  }

  return createHmac('sha256', secret).update(`lead:${clientIp}`).digest('hex')
}
