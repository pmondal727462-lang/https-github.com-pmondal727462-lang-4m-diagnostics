# 4M Diagnostics Website

A frontend-only, WhatsApp-booking website for 4M Diagnostics (diagnostic center, Narendrapur, West Bengal), built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

There is **no backend, database, admin panel, patient login/portal, or online payment** by design. Every booking action (tests, doctor appointments, home sample collection, package enquiries) opens WhatsApp with a pre-filled message; 4M Diagnostics staff confirm bookings directly over WhatsApp/phone.

## 1. Installation

```bash
npm install
```

## 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 3. Production build

```bash
npm run build
npm run start
```

`npm run build` runs the TypeScript check and generates static pages for every route, including one page per doctor (via `generateStaticParams`).

## 4. Deploying to Vercel

1. Push this repository to GitHub (a remote is already configured for this repo).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables are required to build, but see "Before launch" below for `NEXT_PUBLIC_SITE_URL`.
4. Click **Deploy**. Vercel will build and host the site; every push to the main branch redeploys automatically.

## 5. Project structure

```
app/                          Route segments (App Router)
  page.tsx                    Homepage
  about/ services/ tests/ blood-tests/ health-packages/
  home-sample-collection/ doctors/ doctors/[doctor-slug]/
  book-test/ appointment/ polyclinic/ faq/ contact/
  privacy-policy/ terms/
  sitemap.ts robots.ts        Generated sitemap.xml / robots.txt
  layout.tsx                  Root layout, global metadata, JSON-LD
components/
  layout/                     Header, Footer, MobileBottomNav, FloatingWhatsApp
  home/                       Hero, QuickActions
  doctors/                    DoctorCard, DoctorDirectory, AppointmentModal
  tests/                      TestCard, TestDirectory, BookTestForm
  packages/                   PackageCard
  appointment/                AppointmentForm (full-page /appointment)
  home-collection/            HomeCollectionForm
  ui/                         Container, SectionHeading, PageHero, IconBadge, PhotoBanner, icon-map
  FaqAccordion.tsx, ServiceCard.tsx
lib/
  constants.ts                 Business info, nav links, disclaimer text
  doctors.ts                    All 42 doctor records + search/filter helpers
  blood-tests.ts                Blood test catalogue (20 categories)
  health-packages.ts            Health package list
  services.ts                   Services, quick actions, polyclinic specialties
  faq.ts                        FAQ content
  whatsapp.ts                   WhatsApp message builders + URL builder
  types.ts                      Shared TypeScript types
```

## 6. How WhatsApp booking works

Every "Book on WhatsApp" / "Book Appointment" / "Enquire on WhatsApp" action builds a message client-side and opens:

```
https://wa.me/918100347637?text=<url-encoded message>
```

No data is submitted to any server; nothing is stored by this website. See `lib/whatsapp.ts` for the exact message templates (test booking, doctor appointment, home sample collection, package enquiry).

## 7. Before launch — information 4M Diagnostics must confirm

- **Doctor data**: All 42 doctor names, qualifications, affiliations, consultation days/times and "By Appointment" status in `lib/doctors.ts` were transcribed from the supplied doctor list and must be verified by 4M Diagnostics staff before publishing. Nothing was invented; where only "By Appointment" was given, no fixed time was added.
- **Live domain**: Set the `NEXT_PUBLIC_SITE_URL` environment variable (in Vercel: Project Settings → Environment Variables) to the real production domain once one is chosen (e.g. `https://www.4mdiagnostics.in`). This feeds `metadataBase`, Open Graph tags, canonical URLs and `sitemap.xml`/`robots.txt`. Until set, the site falls back to a placeholder domain.
- **Test & package pricing**: No prices are shown anywhere, per requirement — all test/package cards say "Contact 4M Diagnostics" / "Contact us for package details and pricing." Confirm this is the desired approach permanently, or supply pricing to display later.
- **Blood test catalogue**: `lib/blood-tests.ts` contains a representative catalogue across the 20 requested categories (CBC, diabetes, liver, kidney, thyroid, lipid, iron/anemia, vitamins, hormones, cardiac, electrolytes, infection, hepatitis, autoimmune, coagulation, allergy, fertility, women's/men's health, preventive). Review and adjust the exact test list to match what 4M Diagnostics actually offers.
- **Health package contents**: Package descriptions are intentionally generic ("Contact us for package details and pricing") since specific package contents were not supplied.
- **Branding assets**: A placeholder favicon is in place (`app/favicon.ico`, from the Next.js starter). Supply a 4M Diagnostics logo/favicon and an Open Graph share image if available.
- **Google Maps embed**: The Contact page embeds a map using the clinic address as a text query (no API key required). If this doesn't render the exact location precisely, replace it with an official Google Maps "Embed" iframe code from the location's share menu.
- **Legal pages**: `/privacy-policy` and `/terms` contain reasonable default content describing the frontend-only, WhatsApp-based booking model. Have these reviewed/approved (or replaced) before publishing.

## 8. What was tested

- `npm run build` (TypeScript check + static generation for all routes, including all 42 doctor detail pages) — passes with no errors.
- `npx eslint .` — passes with no errors or warnings.
- All routes verified to return HTTP 200 in a local `next dev` run; an unknown doctor slug correctly renders the 404 page.
- WhatsApp URL generation verified (correct `wa.me` number and URL-encoded message body).
