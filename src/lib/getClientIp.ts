import 'server-only'

import { isIP } from 'node:net'
import { headers } from 'next/headers'

export async function getClientIp(): Promise<string | null> {
  const requestHeaders = await headers()

  const clientIp = requestHeaders.get('x-real-ip')?.trim()

  if (!clientIp) {
    if (process.env.NODE_ENV === 'development') {
      return '127.0.0.1'
    }

    return null
  }

  if (isIP(clientIp) === 0) {
    return null
  }

  return clientIp
}
