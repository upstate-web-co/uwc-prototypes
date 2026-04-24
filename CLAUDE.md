# CLAUDE.md — client-PROJECT_SLUG

> Auto-loaded by Claude Code at every session start.
> This file contains universal rules inherited from Upstate Web Co.'s 3-repo build.
> Add project-specific rules below the inherited rules as the build progresses.
> NEVER shrink this file. Only add.

---

## Stack

```
Framework:     Astro 5.x         (NOT 6.x — Vite 8/Rolldown CJS bug, see LESSONS.md)
Adapter:       @astrojs/cloudflare 12.x
Runtime:       Cloudflare Pages + Workers
Database:      Cloudflare D1     (binding: DB — shared agency-db)
Storage:       Cloudflare R2     (binding: FILES — shared agency-files)
Styling:       Tailwind CSS 4.x  (via @tailwindcss/vite plugin)
Language:      TypeScript 5.x    (strict: true)
Node:          20.x LTS          (NOT 22 — esbuild crashes on macOS 13 x64, .nvmrc enforces)
Testing:       Vitest 4.x        (better-sqlite3 D1 mock)
Deploy:        npm run deploy    (astro build + wrangler pages deploy dist)
Local dev:     npm run dev       (astro build + wrangler pages dev dist on port 4321)
Build output:  dist/             (NOT dist/client — Astro 5 layout)
```

---

## Inherited Rules (from Upstate Web Co. internal repos)

These rules were battle-tested across 3 repos and 484+ tests. Follow them exactly.

### 1. Access CF bindings via `cloudflare:workers` import — never `locals.runtime.env`
```typescript
import { env } from 'cloudflare:workers'
// env.DB, env.FILES, env.STRIPE_SECRET_KEY, etc.
```
Astro v6 removed `locals.runtime.env`. This is the only way to access D1/R2/secrets.

### 2. All D1 queries use prepared statements — no string interpolation
```typescript
// ALWAYS
const row = await env.DB.prepare('SELECT * FROM table WHERE id = ?').bind(id).first()

// NEVER
const row = await env.DB.prepare(`SELECT * FROM table WHERE id = ${id}`).first()
```

### 3. Dynamic UPDATEs use field allowlists
```typescript
const ALLOWED_FIELDS = new Set(['name', 'email', 'phone', 'status'])

function buildUpdateFields(data: Record<string, unknown>, allowed: Set<string>) {
  const fields: string[] = []
  const values: unknown[] = []
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && allowed.has(key)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }
  }
  return { fields, values }
}
```

### 4. Every D1 write uses `RETURNING *`
```typescript
const result = await env.DB.prepare(
  'INSERT INTO table (name, email) VALUES (?, ?) RETURNING *'
).bind(name, email).first()
```

### 5. Zod validates all external input — schemas in `src/lib/schemas.ts`
```typescript
import { MySchema } from '../lib/schemas'

export async function POST({ request }: APIContext) {
  const body = await request.json()
  const parsed = MySchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', code: 'VALIDATION_ERROR', issues: parsed.error.issues },
      { status: 400 }
    )
  }
  // Use parsed.data from here
}
```
Never define Zod schemas inline in routes. Centralize in `schemas.ts`.

### 6. API routes use ApiResponse — never raw Response.json()
```typescript
import { ApiResponse } from '../lib/response'

return ApiResponse.success(data)              // 200
return ApiResponse.success(data, 201)         // 201
return ApiResponse.error('NOT_FOUND', 404)    // 404
return ApiResponse.serverError('FETCH_FAILED', 'msg')  // 500
```

### 7. Stripe webhooks verify signature before processing
```typescript
const sig = request.headers.get('stripe-signature')
const body = await request.text()  // MUST be text, not json
let event: Stripe.Event
try {
  event = await stripe.webhooks.constructEventAsync(body, sig!, env.STRIPE_WEBHOOK_SECRET)
} catch (err) {
  return new Response('Invalid signature', { status: 400 })
}
```

### 8. TypeScript strict — treat all external data as `unknown`, never use `any`
Use `unknown` and narrow with Zod or type guards. If you're tempted to write `as any`, stop and think about the actual type.

### 9. Tailwind only — no inline styles, no CSS files for components
All styling via Tailwind classes. Extract to a component if a pattern appears 3+ times.

### 10. Extract at 3 — components, utilities, constants
- UI pattern on 3+ pages → extract to `src/components/`
- JS pattern in 3+ files → extract to `src/lib/`
- Constant in 2+ files → extract to `src/lib/config.ts`

### 11. Every bug gets a regression test
When a bug is found, write a test that reproduces it BEFORE fixing. The test must fail before the fix and pass after.

### 12. Error responses include machine-readable codes
```typescript
// ALWAYS include a code field
return Response.json({ error: 'Human message', code: 'MACHINE_CODE' }, { status: 4xx })

// Standard codes: VALIDATION_ERROR, NOT_FOUND, UNAUTHORIZED, FETCH_FAILED
```

### 13. Email notifications use fire-and-forget — never block the response
```typescript
try { await sendEmail(...) }
catch (emailErr) { console.error('Email failed:', emailErr) }
// Response still returns 200/201
```

### 14. Never return stack traces to the browser
```typescript
console.error('Route error:', err)  // Server log
return ApiResponse.serverError('FETCH_FAILED', 'Something went wrong')  // Client response
```

### 15. Times stored as UTC ISO strings — display conversion in frontend only
```sql
created_at TEXT NOT NULL DEFAULT (datetime('now'))
```

### 16. Money stored as INTEGER cents — never floats
```sql
amount_cents INTEGER NOT NULL  -- $150.00 = 15000
```

---

## Deploy

```bash
npm run dev      # local dev on port 4321
npm run deploy   # production deploy to CF Pages
npm test         # run all tests
```

The deploy is straightforward with Astro 5:
1. `astro build` outputs to `dist/`
2. `wrangler pages deploy dist` deploys to CF Pages

Or just push to `main` — CF auto-builds from GitHub.

**Do NOT upgrade to Astro 6** until the Vite 8/Rolldown CJS build bug is resolved. See LESSONS.md.

**Before ending a session:** Commit and push all work. Verify with:
```bash
gh api repos/upstate-web-co/[REPO]/commits/main --jq '.sha[:7] + " " + .commit.message'
git status --short --branch   # should be clean
```
All repos live under `upstate-web-co` — never personal accounts. Check `gh auth status` first.

---

## Anti-Patterns

```
NEVER concatenate user input into SQL         → use .bind() always
NEVER use `any` type                          → use unknown + Zod
NEVER trust URL params without verification   → validate ownership
NEVER define Zod schemas inline in routes     → put in schemas.ts
NEVER hardcode API keys in source             → use CF Pages env vars
NEVER commit .env or .dev.vars                → use .env.example
NEVER skip Stripe webhook signature verify    → always verify
NEVER return stack traces to the browser      → log server-side
NEVER store money as floats                   → use INTEGER cents
NEVER store local timestamps                  → use UTC ISO strings
NEVER edit an applied migration               → create a new one
NEVER rename DB or FILES bindings             → used everywhere
NEVER toggle noindex in individual pages       → use SITE.indexable in config.ts only
NEVER hardcode hex colors in components        → use @theme tokens in global.css
```

---

## Pipeline Automation (inherited from base template v2)

1. **`SITE.indexable` in src/lib/config.ts** is the SINGLE SOURCE OF TRUTH for search engine indexing. Defaults to `false`. Launch phase sets to `true`. SEOHead.astro reads from this — never set `noindex` as a page prop.

2. **`npm run review`** runs `scripts/review-checklist.sh` — auto-checks secrets, contrast, debug code, SEO, a11y, legal patterns, build. Run in Review phase before advancing to Launch.

3. **Phase handoffs are the primary context** — when starting a phase, the phase-prompt from agency-admin includes a structured JSON handoff from the previous phase. Reference that before re-reading all files.

4. **File inventory is validated automatically** at build→review and review→launch transitions. If files from the handoff inventory go missing, the phase-complete response flags them.

5. **Build prompts are auto-generated** at design→build. Check `project.build_notes` in agency-admin for the generated prompt to paste into Claude Code.

---

## Project-Specific Rules

> Add rules specific to THIS client project below as the build progresses.

---

## File Structure

```
client-PROJECT_SLUG/
├── CLAUDE.md                    ← this file
├── LESSONS.md                   ← gotchas discovered during this build
├── wrangler.toml                ← D1 + R2 bindings
├── astro.config.mjs
├── tsconfig.json
├── package.json                 ← includes deploy workaround script
├── vitest.config.ts
├── .env.example                 ← placeholder secrets
├── .gitignore
├── migrations/                  ← D1 migrations (if this project needs new tables)
├── public/
├── src/
│   ├── env.d.ts                 ← cloudflare:workers type declarations
│   ├── styles/global.css        ← @import "tailwindcss"
│   ├── components/
│   │   └── SEOHead.astro        ← SEO meta + JSON-LD (use on every page)
│   ├── layouts/
│   │   └── BaseLayout.astro     ← html/head/body + nav + footer + Tailwind
│   ├── lib/
│   │   ├── config.ts            ← project constants, branding (CUSTOMIZE FIRST)
│   │   ├── response.ts          ← ApiResponse helpers
│   │   ├── schemas.ts           ← Zod schemas (centralized)
│   │   ├── email.ts             ← Resend + escapeHtml + contact notification
│   │   ├── ai.ts                ← Claude API + BUSINESS_CONTEXT prompt (CUSTOMIZE if AI add-on sold)
│   │   └── db.ts                ← D1 query functions (if this project has DB needs)
│   ├── pages/
│   │   ├── index.astro          ← home page
│   │   └── api/
│   │       └── contact.ts       ← contact form → email
│   └── types/
│       └── index.ts
└── tests/
    └── helpers/
        └── db.ts                ← D1 mock setup (better-sqlite3)
```

---

## Skills Reference (Upstate Web Co.)

Business operation skills live at `../../00-skills/`. Reference these during the project lifecycle:
- `build/skill-new-project-setup.md` — initial setup (you're here)
- `build/skill-git-and-deploy.md` — git, GitHub, domain, deploy pipeline
- `build/skill-stripe-integration.md` — payment integration
- `build/skill-ai-client-integration.md` — AI features scoped to client business
- `build/skill-cf-access-setup.md` — portal access for this client
- `build/skill-launch-day.md` — go-live checklist
- `engagement/skill-discovery-call.md` — pre-project engagement

Business operations and pricing: `../../uwc-agency-admin/BUSINESS.md`

---

*CLAUDE.md version: 1.2 | Forked from uwc-base-template | [DATE]*
*v1.2: Pipeline automation v2 inherited — SITE.indexable, npm run review,
phase handoff JSON, file inventory validation, auto build prompt. See
"Pipeline Automation" section above.*
*v1.1: Added ai.ts, email.ts to file structure. Added skill-git-and-deploy and
skill-ai-client-integration to skills reference. Added BUSINESS.md pointer.*
