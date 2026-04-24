/**
 * Project constants and branding.
 * Single source of truth for values used across pages and routes.
 * Update these for each client project.
 */

export const SITE = {
  name: 'PROJECT_NAME',
  tagline: 'PROJECT_TAGLINE',
  url: 'https://PROJECT_DOMAIN',
  email: 'hello@PROJECT_DOMAIN',
  phone: '',
  /**
   * Set to true when the site is ready for search engines.
   * Default: false (noindex). Launch phase sets this to true.
   * This is the ONLY place indexing is controlled — never set noindex in pages or components.
   */
  indexable: false,
} as const

export const BRAND = {
  primaryColor: '#2563eb',   // Update per client brand
  accentColor: '#f59e0b',
} as const

// Error code registry — add project-specific codes as needed
export const ERRORS = {
  VALIDATION_ERROR: { status: 400, message: 'Validation failed' },
  NOT_FOUND: { status: 404, message: 'Resource not found' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
  CONTACT_SEND_FAILED: { status: 500, message: 'Failed to send message' },
} as const
