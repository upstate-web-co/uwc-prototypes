export const SITE = {
  name: 'Growfar',
  tagline: 'Build Bold. Grow Far. — Brand management & digital strategy for creators who mean business.',
  url: 'https://growfar.co',
  email: 'hello@growfar.co',
  phone: '',
  indexable: false,
} as const

export const BRAND = {
  primaryColor: '#1B0D2A',
  accentColor: '#FF5C35',
} as const

export const ERRORS = {
  VALIDATION_ERROR: { status: 400, message: 'Validation failed' },
  NOT_FOUND: { status: 404, message: 'Resource not found' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
  CONTACT_SEND_FAILED: { status: 500, message: 'Failed to send message' },
} as const
