# LESSONS.md — client-PROJECT_SLUG

> Pre-seeded with lessons from Upstate Web Co.'s internal builds.
> Add project-specific lessons as they come up.

---

## Pre-Seeded Lessons (from UWC internal repos)

### Astro v6 removed `locals.runtime.env`
Use `import { env } from 'cloudflare:workers'` for all CF bindings. Type in `src/env.d.ts`.

### Astro v6 CSRF blocks mutating requests without Origin header
POST/PUT/DELETE need an Origin header. Browsers include it automatically. For curl testing: `-H 'Origin: http://localhost:4321'`.

### Miniflare loses reference after config file changes
Clear `node_modules/.vite` cache and restart dev server. Wait ~15-20s after startup for miniflare to initialize.

### @astrojs/cloudflare v13 generates incompatible wrangler.json
The adapter outputs `dist/server/wrangler.json` with reserved binding names CF Pages rejects. The deploy script in `package.json` handles this automatically — never run `wrangler pages deploy dist` directly.

### Stale `.wrangler/deploy/config.json` breaks subsequent deploys
After deleting `wrangler.json`, also delete `.wrangler/deploy/config.json`. Both `dev` and `deploy` scripts handle this.

### Vite version conflict with Tailwind v4
`@tailwindcss/vite` may pull Vite 8 while Astro 6 expects Vite 7.3.1. The `"overrides": { "vite": "7.3.1" }` in package.json prevents this. If you see `require_dist is not a function`, check for duplicate Vite versions: `ls node_modules/astro/node_modules/vite`.

### Tailwind v4 CSS import must be in frontmatter
Import CSS in Astro frontmatter (`import '../styles/global.css'`), not in `<style>` blocks. The CSS file contains `@import "tailwindcss"`.

### Local D1 is per-project
Each repo's `.wrangler/state/v3/d1/` is independent even if `database_id` matches. Seed data separately per project for local dev.

### D1 `.first()` returns undefined, not null
Always use `?? null` or check for undefined after `.first()` calls.

### CF Access lowercases email addresses
Store emails as lowercase in D1. Use `email.toLowerCase()` on insert.

---

## Project-Specific Lessons

> Add lessons discovered during this build below.

---

*Add new lessons above this line.*
