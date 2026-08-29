'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { checkCurrentClientLeadRateLimit } from '@/lib/checkCurrentClientLeadRateLimit'

export type CreateLeadState =
  | {
      status: 'idle'
    }
  | {
      status: 'success'
    }
  | {
      status: 'error'
      message: string
    }

export async function createLead(
  _previousState: CreateLeadState,
  formData: FormData,
): Promise<CreateLeadState> {
  const userInput = formData.get('contact')

  if (typeof userInput !== 'string') {
    return {
      status: 'error',
      message: 'Invalid input',
    }
  }

  const contact = userInput.trim()

  if (contact.length < 2 || contact.length > 500) {
    return {
      status: 'error',
      message: 'Invalid input',
    }
  }

  try {
    const rateLimitResult = await checkCurrentClientLeadRateLimit()

    if (!rateLimitResult.allowed) {
      if (rateLimitResult.reason === 'rate-limit-exceeded') {
        return {
          status: 'error',
          message: 'Ошибка. Попробуйте еще раз позже.',
        }
      }

      console.error('Unable to determine client IP for lead submission')

      return {
        status: 'error',
        message: 'Ошибка. Попробуйте еще раз позже.',
      }
    }

    const payload = await getPayload({
      config: configPromise,
    })

    await payload.create({
      collection: 'leads',
      data: { contact },
      overrideAccess: true,
    })

    return {
      status: 'success',
    }
  } catch (error) {
    console.error('Failed to create lead:', error)

    return {
      status: 'error',
      message: 'Ошибка. Попробуйте еще раз позже',
    }
  }
}
