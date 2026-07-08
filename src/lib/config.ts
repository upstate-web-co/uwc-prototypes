/**
 * Project constants and branding.
 * Single source of truth for values used across pages and routes.
 * Update these for each client project.
 */

export const SITE = {
  name: 'The Ogaden',
  tagline: 'Your Go-To Guide for Getting Out in Upstate SC',
  url: 'https://theogaden.com',
  email: 'hello@theogaden.com',
  phone: '(864) 555-0199',
  /**
   * Set to true when the site is ready for search engines.
   * Default: false (noindex). Launch phase sets this to true.
   * This is the ONLY place indexing is controlled — never set noindex in pages or components.
   */
  indexable: false,
} as const

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Activities', href: '/activities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Booking', href: '/booking' },
  { label: 'Store', href: '/store' },
] as const

export const BRAND = {
  primaryColor: '#2563eb',
  accentColor: '#f59e0b',
} as const

export const ERRORS = {
  VALIDATION_ERROR: { status: 400, message: 'Validation failed' },
  NOT_FOUND: { status: 404, message: 'Resource not found' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
  CONTACT_SEND_FAILED: { status: 500, message: 'Failed to send message' },
} as const
