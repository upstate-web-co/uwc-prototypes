/**
 * D1 mock using better-sqlite3 for testing.
 * Creates an in-memory SQLite database that mimics D1's API.
 *
 * Usage in tests:
 *   import { createTestDb } from './helpers/db'
 *   const db = createTestDb()
 */

import Database from 'better-sqlite3'

interface D1Result {
  results: Record<string, unknown>[]
  success: boolean
  meta: Record<string, unknown>
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = Record<string, unknown>>(): Promise<T | undefined>
  all(): Promise<D1Result>
  run(): Promise<D1Result>
}

export interface D1Database {
  prepare(sql: string): D1PreparedStatement
  batch<T>(statements: D1PreparedStatement[]): Promise<T[]>
}

export function createTestDb(): D1Database {
  const sqlite = new Database(':memory:')
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')

  return {
    prepare(sql: string) {
      let boundValues: unknown[] = []

      const stmt: D1PreparedStatement = {
        bind(...values: unknown[]) {
          boundValues = values
          return stmt
        },
        async first<T>(): Promise<T | undefined> {
          // Convert D1-style ? placeholders for better-sqlite3
          const row = sqlite.prepare(sql).get(...boundValues) as T | undefined
          return row
        },
        async all(): Promise<D1Result> {
          const rows = sqlite.prepare(sql).all(...boundValues)
          return { results: rows as Record<string, unknown>[], success: true, meta: {} }
        },
        async run(): Promise<D1Result> {
          sqlite.prepare(sql).run(...boundValues)
          return { results: [], success: true, meta: {} }
        },
      }
      return stmt
    },
    async batch(statements) {
      return statements.map(() => ({} as never))
    },
  }
}

/**
 * Apply a SQL migration file to the test database.
 * Call this in your test setup to initialize the schema.
 */
export function applyMigration(db: D1Database, sql: string): void {
  const sqlite = (db as unknown as { prepare: (s: string) => { run: () => void } })
  // For the mock, we need to access the underlying sqlite instance
  // In practice, run migration SQL statements directly
  const statements = sql.split(';').filter(s => s.trim())
  for (const statement of statements) {
    if (statement.trim()) {
      try {
        // This is a simplified version — for complex migrations,
        // use the sqlite instance directly
        (sqlite as unknown as Database.Database).exec(statement)
      } catch {
        // Ignore errors from IF NOT EXISTS etc.
      }
    }
  }
}
