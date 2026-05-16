# Premier Plumbing Contractor Website

A professional full-stack marketing and promotional website for a full-service plumbing contractor specializing in commercial and residential projects.

## Run & Operate

- `pnpm --filter @workspace/plumbing-site run dev` — run the Next.js site (port 20872)
- `pnpm --filter @workspace/api-server run dev` — run the Express API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- **Frontend/Backend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Email**: Resend API (add `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` env vars)
- **File Storage**: Supabase Storage (add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` env vars)
- **Deployment**: Vercel (deploy `artifacts/plumbing-site` directly)
- **Shared backend**: Express 5 API server (unused by plumbing site — available for extensions)

## Where things live

- `artifacts/plumbing-site/` — Next.js website (main product)
  - `app/` — App Router pages (page.tsx files)
  - `app/api/estimate/route.ts` — Estimate inquiry API → Resend email
  - `app/api/careers/route.ts` — Job application API → Supabase upload + Resend email
  - `lib/supabase.ts` — Supabase client (gracefully handles missing env vars)
  - `lib/resend.ts` — Resend client (gracefully handles missing API key)
  - `components/` — Navigation, Footer, shared UI
  - `app/globals.css` — Tailwind v4 config + glassmorphic CSS utilities (.glass, .glass-dark)
- `artifacts/api-server/` — Express API server (health endpoint, extensible)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (for Express routes)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, stats, corporate clients (Samsung, Ford, Sony), services overview, CTA |
| `/services` | Full commercial & residential services breakdown |
| `/projects` | Gallery of completed large-scale projects with filter |
| `/estimate` | Service estimate inquiry form → email via Resend |
| `/careers` | Job application form with resume/ID upload → Supabase + email |

## Environment Variables Needed

Add these when ready (do NOT add them yet — the site works without them in dev):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend email API key |
| `CONTACT_EMAIL` | Gmail address to receive form submissions |
| `FROM_EMAIL` | Sender address (must be verified in Resend) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side uploads) |

## Architecture decisions

- **Next.js over Vite/React**: Full-stack framework lets API routes live alongside pages; better for Vercel deployment
- **Supabase for file storage only**: No Supabase database — the site is marketing-only, no user accounts needed
- **Graceful degradation**: Both Resend and Supabase clients return `null` if env vars are missing; API routes return 503 with a clear message instead of crashing
- **Glassmorphic design**: Custom `.glass` and `.glass-dark` CSS utilities in globals.css; navy-blue primary with orange accent
- **No payments**: Purely marketing, inquiry, and application flows — no Stripe or payment processing

## Product

- Full-service plumbing contractor marketing site
- Showcases commercial & residential capabilities
- Highlights corporate clients (Samsung, Ford, Sony, etc.)
- Project gallery demonstrating large-scale work
- Estimate inquiry form (sends email via Resend)
- Job application form (uploads docs to Supabase, sends email via Resend)

## Gotchas

- Tailwind v4: config is in `globals.css` (@theme inline block), NOT in `tailwind.config.ts`
- PostCSS uses `@tailwindcss/postcss` plugin, not the old `tailwindcss` plugin
- Next.js fonts use `next/font/google` — Inter is configured in `app/layout.tsx`
- The `allowedDevOrigins` warning in Next.js 15 is harmless in Replit (cross-origin preview iframe)
- Careers form uses `FormData` (multipart) for file uploads — do NOT set Content-Type header manually
- For Vercel deployment: deploy the `artifacts/plumbing-site` folder as the root, or configure Vercel project root to `artifacts/plumbing-site`

## User preferences

- Professional, modern, clean, glassmorphic design
- White primary with blue/orange accent palette
- No emojis in the UI
- Secrets will be added after design is finalized
