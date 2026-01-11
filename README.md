# PIT — Probability Intelligence Terminal (Vercel-ready)

This repository is a production-style MVP scaffold for a Probability Intelligence Terminal:
- `/api/markets` → pulls top markets (provider adapter pattern)
- `/api/cron/refresh` → snapshots markets into Postgres (protected by `CRON_SECRET`)
- `/dashboard` → simple screener UI

## Run locally (recommended)
### 1) Install Node.js
Install Node 18+ from the official site, then verify:
```bash
node -v
```

### 2) Setup env vars
Copy `.env.example` to `.env` and fill values:
- `DATABASE_URL` (use Neon/Supabase/Vercel Postgres)
- `NEXTAUTH_SECRET` (any long random string)
- `CRON_SECRET` (any long random string)
- Optional: `UPSTASH_REDIS_*` for rate limiting
- Optional: GitHub OAuth (`GITHUB_ID`, `GITHUB_SECRET`) if you enable login

### 3) Install deps + migrate + start
```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open: http://localhost:3000

## Deploy on Vercel
1. Import this GitHub repo into Vercel
2. Add env vars from `.env.example` in Vercel → Project → Settings → Environment Variables
3. Run DB migrations:
   - simplest: run locally once `npx prisma migrate dev` then push commit
   - or in Vercel, add a temporary build step / or run migrations via a CI step

4. Add domain:
   - Vercel Project → Settings → Domains → add `predictmarkets.finance`
   - Copy DNS records Vercel shows and paste into Hostinger DNS

## Debugging Vercel issues (what to do when it fails)
- **Build fails**: Vercel → Deployments → click failed deployment → open **Build Logs**
  - Common causes: missing env vars, wrong `DATABASE_URL`, or Prisma client not generated.
- **Runtime errors**: Vercel → Project → Observability/Logs (or Functions logs)
  - Look for 500 errors on routes like `/api/markets`.
- **Auth redirect problems**: set `NEXTAUTH_URL` to your Vercel URL/domain.
- **Cron not running**: confirm `CRON_SECRET` exists in Vercel env vars and `vercel.json` is present.
- **Provider API changed**: update `lib/providers/polymarket.ts` only.

## Structure
- `app/` Next.js app router pages + API routes
- `lib/providers/` isolated data source adapters
- `prisma/` DB schema for snapshots and watchlists
- `vercel.json` cron schedule
