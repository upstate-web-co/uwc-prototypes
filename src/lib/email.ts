/**
 * Email utilities using Resend.
 * Import SITE from config.ts for branding.
 */

import { SITE } from './config'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail(apiKey: string, opts: EmailOptions): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${SITE.name} <${SITE.email}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend API error: ${res.status} ${body}`)
  }
}

/**
 * Fire-and-forget email — logs errors but never throws.
 * Use this for notifications that shouldn't block the API response.
 */
export async function sendEmailSafely(apiKey: string, opts: EmailOptions): Promise<void> {
  try {
    await sendEmail(apiKey, opts)
  } catch (err) {
    console.error('Email send failed (non-blocking):', err)
  }
}

/**
 * Escape HTML entities for safe inclusion in email templates.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Contact form notification email.
 * Sent to the site owner when someone submits the contact form.
 */
export function contactNotificationHtml(data: {
  name: string
  email: string
  phone?: string
  message: string
}): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
      <hr style="border: 1px solid #eee;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
      <hr style="border: 1px solid #eee;" />
      <p style="color: #666; font-size: 12px;">
        Sent from ${escapeHtml(SITE.name)} contact form
      </p>
    </div>
  `
}
