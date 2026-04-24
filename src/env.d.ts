/// <reference types="astro/client" />

declare module 'cloudflare:workers' {
  export const env: {
    DB: import('./types').D1Database
    FILES: R2Bucket
    RESEND_API_KEY: string
    STRIPE_SECRET_KEY?: string
    STRIPE_WEBHOOK_SECRET?: string
    // Add project-specific env vars as needed
  }
}

// D1Database type — matches Cloudflare's D1 API
interface D1Database {
  prepare(query: string): D1PreparedStatement
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<T[]>
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = Record<string, unknown>>(): Promise<T | null>
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>
  run(): Promise<D1Result>
}

interface D1Result<T = unknown> {
  results: T[]
  success: boolean
  meta: Record<string, unknown>
}

interface R2Bucket {
  get(key: string): Promise<R2Object | null>
  put(key: string, value: ReadableStream | ArrayBuffer | string): Promise<R2Object>
  delete(key: string): Promise<void>
  list(options?: { prefix?: string }): Promise<R2Objects>
}

interface R2Object {
  key: string
  body: ReadableStream
  httpMetadata?: Record<string, string>
}

interface R2Objects {
  objects: R2Object[]
  truncated: boolean
}
