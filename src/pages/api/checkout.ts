/**
 * Stripe Checkout session creation.
 * Handles both one-time payments and recurring subscriptions.
 * Uses Stripe's raw API via fetch — no SDK dependency needed.
 */

import type { APIContext } from 'astro'
import { env } from 'cloudflare:workers'
import { CheckoutSchema } from '../../lib/schemas'
import { ApiResponse } from '../../lib/response'
import { PACKAGES, SITE } from '../../lib/config'

// Stripe price IDs — set these in CF Pages env vars once Stripe products are created
const STRIPE_PRICE_IDS: Record<string, string> = {
  'basic': 'price_basic_800',
  'classic': 'price_classic_1500',
  'premium': 'price_premium_2500',
  'unlimited-basic': 'price_unlimited_basic_3500',
  'unlimited-premium': 'price_unlimited_premium_5500',
}

export async function POST({ request }: APIContext) {
  try {
    const formData = await request.formData()
    const body = Object.fromEntries(formData)
    const parsed = CheckoutSchema.safeParse(body)

    if (!parsed.success) {
      return ApiResponse.validationError(parsed.error.issues)
    }

    const { packageId } = parsed.data
    const pkg = PACKAGES.find(p => p.id === packageId)

    if (!pkg) {
      return ApiResponse.error('NOT_FOUND', 404)
    }

    const secretKey = (env as unknown as Record<string, string | undefined>)['STRIPE_SECRET_KEY']

    if (!secretKey) {
      // Prototype fallback — redirect to store with a notice
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/store?notice=payments-coming-soon#${packageId}`,
        },
      })
    }

    const priceId = STRIPE_PRICE_IDS[packageId]
    const baseUrl = SITE.url
    const mode = pkg.recurring ? 'subscription' : 'payment'

    const params = new URLSearchParams({
      'mode': mode,
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'success_url': `${baseUrl}/store?success=true&package=${packageId}`,
      'cancel_url': `${baseUrl}/store#${packageId}`,
      'allow_promotion_codes': 'true',
    })

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!res.ok) {
      const err = await res.json() as { error?: { message?: string } }
      console.error('Stripe error:', err)
      return ApiResponse.serverError('CHECKOUT_FAILED', 'Failed to create checkout session')
    }

    const session = await res.json() as { url: string }

    return new Response(null, {
      status: 303,
      headers: { Location: session.url },
    })
  } catch (err) {
    console.error('POST /api/checkout error:', err)
    return ApiResponse.serverError('CHECKOUT_FAILED', 'Failed to create checkout session')
  }
}
