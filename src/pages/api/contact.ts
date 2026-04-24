/**
 * Contact form API route.
 * Validates with Zod, sends email via Resend, returns standardized response.
 */

import type { APIContext } from 'astro'
import { env } from 'cloudflare:workers'
import { ContactFormSchema } from '../../lib/schemas'
import { ApiResponse } from '../../lib/response'
import { sendEmail, contactNotificationHtml } from '../../lib/email'
import { SITE } from '../../lib/config'

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json()
    const parsed = ContactFormSchema.safeParse(body)

    if (!parsed.success) {
      return ApiResponse.validationError(parsed.error.issues)
    }

    const { name, email, phone, message } = parsed.data

    await sendEmail(env.RESEND_API_KEY, {
      to: SITE.email,
      subject: `Contact form: ${name}`,
      html: contactNotificationHtml({ name, email, phone, message }),
    })

    return ApiResponse.success({ message: 'Sent' }, 201)
  } catch (err) {
    console.error('POST /api/contact error:', err)
    return ApiResponse.serverError('CONTACT_SEND_FAILED', 'Failed to send message')
  }
}
