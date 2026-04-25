/**
 * Centralized Zod schemas.
 * ALL validation schemas go here — never define inline in routes.
 * Import from this file in API routes and use with parseBody or safeParse.
 */

import { z } from 'zod'

// Contact form submission
export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>

// Stripe checkout session request
export const CheckoutSchema = z.object({
  packageId: z.enum([
    'basic',
    'classic',
    'premium',
    'unlimited-basic',
    'unlimited-premium',
  ]),
})

export type CheckoutData = z.infer<typeof CheckoutSchema>
