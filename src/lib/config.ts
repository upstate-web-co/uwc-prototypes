/**
 * Project constants and branding for The Tech Shop.
 */

export const SITE = {
  name: 'The Tech Shop',
  tagline: 'Refurbished tech, expert repairs, fair trade-ins — right here in Charlestown.',
  url: 'https://thetechshop.example',
  email: 'hello@thetechshop.example',
  phone: '(555) 010-2233',
  address: '218 Bunker Hill St, Charlestown, MA',
  hours: 'Mon–Sat 10a–7p · Sun 12p–5p',
  indexable: false,
} as const

export const BRAND = {
  primaryColor: '#0b1a2b',
  accentColor: '#22d3ee',
  highlightColor: '#a3e635',
} as const

export const ERRORS = {
  VALIDATION_ERROR: { status: 400, message: 'Validation failed' },
  NOT_FOUND: { status: 404, message: 'Resource not found' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
  CONTACT_SEND_FAILED: { status: 500, message: 'Failed to send message' },
} as const
