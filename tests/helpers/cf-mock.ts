/**
 * Mock for cloudflare:workers import used in tests.
 * Vitest resolves 'cloudflare:workers' to this file via the alias in vitest.config.ts.
 */

export const env = {
  DB: undefined as unknown,      // Set in test setup
  FILES: undefined as unknown,   // Set in test setup
  RESEND_API_KEY: 'test-key',
  STRIPE_SECRET_KEY: 'sk_test_mock',
  STRIPE_WEBHOOK_SECRET: 'whsec_test_mock',
}
