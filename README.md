# 4M Diagnostics

AI-enabled diagnostic centre website and admin platform for **4M Diagnostics**
(Ward No:25, Southern Bypass 402, School Rd, Dakshin Jagaddal, Narendrapur,
Rajpur Sonarpur, West Bengal - 700151 · +91 81003 47637).

A single Next.js 16 (App Router) application: the public website, the REST
API (Route Handlers + Server Actions), and the `/admin` dashboard all live in
one deployable project, backed by PostgreSQL via Prisma 7.

> **No fabricated data.** Tests, packages, doctors, prices, offers, report
> times, and every other business fact are managed entirely from the Admin
> Dashboard and stored in the database — nothing is hard-coded in source.

## Tech stack

- **Frontend/Backend:** Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL (via Prisma ORM 7, `@prisma/adapter-pg`)
- **Auth:** JWT session cookies (`jose`) for admin/staff, mobile + OTP for patients
- **Validation:** Zod
- **Payments:** Razorpay (order creation + signature verification; wire in once keys are configured)
- **Notifications:** SMS / WhatsApp Business API / SMTP email (provider-abstracted; falls back to logging when unconfigured)
- **File storage:** S3-compatible storage (for reports, invoices, images)

## Requirements

- Node.js **20.9+** (Next.js 16 minimum)
- PostgreSQL **15+**
- npm

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

| Variable | Required for |
|---|---|
| `DATABASE_URL` | Everything — PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Canonical URLs, sitemap, metadata |
| `JWT_SECRET`, `OTP_SECRET` | Admin sessions and patient OTP hashing |
| `RAZORPAY_KEY_ID` / `_SECRET` / `_WEBHOOK_SECRET` | Online payments |
| `SMTP_*` | Transactional email |
| `WHATSAPP_API_URL` / `_ACCESS_TOKEN` / `_PHONE_NUMBER_ID` | WhatsApp notifications |
| `SMS_API_URL` / `SMS_API_KEY` | SMS + OTP delivery |
| `S3_*` | Report/invoice/image storage |
| `AI_API_KEY` | Reserved for a future LLM-backed upgrade to the AI assistant (see below) |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Creates the first SUPER_ADMIN account when seeding |

Generate strong random values for `JWT_SECRET` / `OTP_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Never commit `.env`.** `SMS_API_KEY`, `WHATSAPP_ACCESS_TOKEN`, `RAZORPAY_KEY_SECRET`,
`S3_SECRET_KEY`, `SMTP_PASSWORD`, `JWT_SECRET`, and `OTP_SECRET` are all server-only
secrets and are never sent to the browser.

### Provider credentials left unconfigured on purpose

This build ships with real, working code paths for Razorpay, WhatsApp, SMS,
Email and S3, but the actual third-party accounts were never provided, so:

- **OTP delivery** falls back to logging the code to the server console (and,
  outside `NODE_ENV=production` only, returning it in the API response) so
  the login/report flows are fully testable without an SMS account.
- **Payments** currently confirm bookings without an online charge ("pay at
  centre"); wiring `RAZORPAY_*` activates the Razorpay flow described in the
  project brief (create order → checkout → verify signature → webhook).
- **Report file uploads/downloads** need `S3_*` configured before the admin
  report-upload and patient download features go live.
- **WhatsApp/SMS/Email sends** log to the `WhatsAppLog` / `SMSLog` / `EmailLog`
  tables until their provider credentials are set.

## 3. Set up the database

Point `DATABASE_URL` at a real PostgreSQL 15+ server, then:

```bash
npx prisma migrate dev --name init   # creates tables
npx prisma db seed                   # seeds roles, business info, and the first admin account
```

Seeding only writes verified business facts (name, address, phone, Google
Maps link, and the three confirmed services) plus system roles and the
initial `SUPER_ADMIN` account — **no tests, packages, doctors, or prices are
seeded**. Add those from `/admin` after logging in.

> **Local development without a PostgreSQL server?** Prisma ships a
> zero-config local Postgres for development: `npx prisma dev` prints a
> `DATABASE_URL` you can paste into `.env`. It's convenient, but under heavy
> concurrent load (e.g. running `next build` while `next dev` is also
> connected) it can drop its connection and need a restart
> (`npx prisma dev stop default && npx prisma dev -d`). For anything beyond
> quick local iteration, use a real Postgres instance.

## 4. Run the app

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the admin dashboard (sign in with
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`, then change the password).

## 5. Production build

```bash
npm run build
npm run start
```

## Project structure

```
app/                    Public pages, /admin dashboard, and API route handlers
  admin/(dashboard)/     Sidebar-driven admin screens (auth-gated by proxy.ts)
  api/                   REST endpoints (bookings, appointments, auth/OTP, AI chat, ...)
  [public routes]/       /, /tests, /packages, /doctors, /book-test, /reports, ...
components/              UI primitives, layout chrome, admin/public feature components
lib/
  data/                  Server-side Prisma read queries, grouped by domain
  actions/               Server Actions used by admin CRUD forms
  validations/           Zod schemas for API input
  auth/                  Password hashing + JWT session helpers
  ai/                    4M AI Assistant logic (safety rules + knowledge-base search)
prisma/
  schema.prisma          Full data model (30+ models)
  seed.ts                Seeds only verified business facts — no fabricated data
proxy.ts                 Route protection for /admin/** (Next.js 16's middleware successor)
generated/prisma/        Generated Prisma Client (gitignored, regenerate with `prisma generate`)
```

## What's implemented vs. what's next

Built and verified end-to-end (admin create → public site → booking API →
database), matching the project brief's own phased build order:

1. Project scaffold, TypeScript, Tailwind, Prisma schema, seed data
2. Public website: homepage, tests/packages search + detail, doctors, FAQ,
   blog, contact, legal pages, all reading live from the database with
   proper loading/empty states
3. Admin Dashboard: auth, sidebar, stats + 7-day bookings chart, **Test
   Management** and **Package Management** (full CRUD), plus working Services,
   Test Categories, FAQs, Bookings, Home Collection, Appointments, Patients,
   Settings, and Audit Logs screens
4. Patient OTP login, online booking (test/package + home collection),
   doctor appointment requests, secure OTP-gated report portal with access
   logging, and a knowledge-base-backed 4M AI Assistant with medical-safety
   guardrails

Scaffolded with a clear "coming soon" placeholder, ready for the next phase
once the relevant third-party credentials are supplied: **Payments**
(Razorpay), **Invoices** (PDF generation), **Report upload** (S3), **Doctor
management UI**, **Staff management UI**, **Coupons/Offers admin UI**,
**Blog CMS UI**, **AI Knowledge Base admin UI**, and **WhatsApp/SMS/Email
template management**.

## Security notes

- Admin/staff passwords are hashed with bcrypt; sessions are signed JWTs in
  `httpOnly`, `sameSite=lax` cookies (`secure` in production).
- `/admin/**` is protected by `proxy.ts` (redirects to `/admin/login` without
  a valid session) in addition to a server-side session check in the
  dashboard layout.
- Patient OTPs are hashed (never stored in plaintext), expire after 10
  minutes, and are rate-limited to one request per minute per mobile number.
- Every report view/download is written to `ReportAccessLog`; every admin
  auth event and mutation (create/update/delete test, package, booking
  status, etc.) is written to `AuditLog`.
- Reports are never reachable by a guessable URL — access requires a verified
  patient session.

## Deployment

- **Frontend + API:** deploy the whole app to Vercel (`vercel.com/new`).
  Set every variable from `.env.example` in the Vercel project's environment
  variables.
- **Database:** any managed PostgreSQL 15+ (e.g. Neon, Supabase, RDS, Prisma
  Postgres). Run `npx prisma migrate deploy` against it as part of your
  deploy step.
- **DNS/CDN:** Cloudflare in front of the Vercel deployment.
- **Razorpay:** create a Razorpay account, add `RAZORPAY_KEY_ID` /
  `RAZORPAY_KEY_SECRET`, and register the webhook URL
  (`/api/payments/webhook`, once implemented) with `RAZORPAY_WEBHOOK_SECRET`.
- **WhatsApp:** requires a WhatsApp Business API provider (e.g. Meta Cloud
  API) — set `WHATSAPP_API_URL`, `WHATSAPP_ACCESS_TOKEN`,
  `WHATSAPP_PHONE_NUMBER_ID`.
- **Email:** any SMTP provider — set `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASSWORD`.
- **S3 storage:** any S3-compatible bucket (AWS S3, Cloudflare R2,
  Backblaze B2, ...) — set `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY`,
  `S3_SECRET_KEY`, `S3_BUCKET`.
