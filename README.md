# festag.app — Website

The public Festag website: Homepage, Careers, Job-Detail, Contact.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Aeonik (local).

## Brand contract

- **Type:** Aeonik Medium throughout (Aeonik Bold is forbidden — bolder weights resolve to Medium).
- **Letter-spacing:** Header 1.2 % · Body 1.7 % · Sidebar 2.3 %.
- **Palette:** Modern Black, Modern White, Rich Wood Brown accent, Primary `#5B647D`.
- **No** colored buttons, no white-on-dark / black-on-light contrast inversion, no Apple emojis, no childish AI gradients.

Tokens live in [`app/globals.css`](./app/globals.css) and are bridged into Tailwind v4 via `@theme inline`.

## Routes

- `/` — Homepage with 12 sections (Hero → Final CTA)
- `/careers` — Open roles index, mission, principles
- `/careers/[slug]` — Job detail with `JobPosting` JSON-LD and mailto/form apply flow
- `/contact` — Direct mail channels
- `/sitemap.xml`, `/robots.txt` — auto-generated

## Content / CMS

Jobs are typed source-of-truth in [`lib/jobs.ts`](./lib/jobs.ts) — the `JobPosting` schema is CMS-ready; swap `getAllJobs()` / `getJobBySlug()` to plug in Supabase, Sanity or Contentful later without touching pages.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Deployed via Vercel (`vercel.com/festag/festagwebsite`).
