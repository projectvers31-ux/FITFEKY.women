<p align="center">
  <img src="public/logo.svg" alt="FitFeky logo" width="96" height="96" />
</p>

<h1 align="center">FITFEKY.women</h1>

<p align="center">
  <strong>Strength finds you at home.</strong><br />
  Premium, quality-scored fitness gear for women in their forties, fifties and beyond —
  walking pads, resistance bands, yoga essentials and recovery tools, curated by women
  who train, for women who move with intention.
</p>

<p align="center">
  <a href="https://www.fitfeky.com">Visit the live site</a>
  ·
  <a href="https://www.fitfeky.com/find-my-perfect-fit">Find My Perfect Fit</a>
  ·
  <a href="https://www.fitfeky.com/compare">Compare Products</a>
</p>

<p align="center">
  <img alt="License: EPL-2.0" src="https://img.shields.io/badge/License-EPL--2.0-blue.svg" />
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-black.svg" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178c6.svg" />
  <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8.svg" />
  <img alt="Deployed on Vercel" src="https://img.shields.io/badge/Deployed%20on-Vercel-111111.svg" />
</p>

---

## About

FitFeky is a curated e-commerce content site built for women aged 45–65 who want
gentle, joint-friendly movement at home. Every product in the catalog is scored on
a transparent 0–100 editorial scale — never paid for placement.

The site's flagship experience is **Find My Perfect Fit**, a 5-question wellness
assessment that ends with an AI-personalized plan, recommended products, side-by-side
comparisons, a buyer's guide and direct Amazon links.

## Features

- **Find My Perfect Fit** — Welcome → age → goal → knee pain → activity → budget →
  animated **AI Analysis** (Gemini) → personalized wellness plan → recommended
  products → compare → buyer's guide → view on Amazon
- **Quality-scored catalog** — 0–100 editorial score, priority badges, joint-friendly
  ratings, filterable by category and search
- **Compare page** — side-by-side comparison table across the full catalog
- **Calculators** — BMI, calories, home-gym planner and more
- **Wellness journal** — editorial articles and buyer's guides (SSR + structured data)
- **AI coach API** — `POST /api/ai/fit` generates a personalized wellness plan from
  assessment answers using Google Gemini
- **Meta Pixel analytics** — init/checkout, registration, view-content and add-to-cart
  events for affiliate funnel tracking
- **SEO-first** — JSON-LD structured data (Product, FAQ, Breadcrumb, Article),
  sitemap, robots, OpenGraph, llms.txt
- **Community** — sign-up form for the FitFeky community circle
- **Admin tools** — keyword import/export/deduplication, product data via CSV/XLSX

## Tech Stack

| Layer       | Technology |
| ----------- | ---------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router, React 19) |
| Language    | [TypeScript](https://www.typescriptlang.org) 5.x |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com) + shadcn/ui (Radix primitives) |
| Data        | Prisma ORM + SQLite (local), CSV/XLSX pipelines |
| AI          | [Google Gemini](https://ai.google.dev) via `@google/generative-ai` |
| Analytics   | Meta Pixel (client-side) |
| Deploy      | [Vercel](https://vercel.com) + Caddy (self-hosted) |

## Getting Started

### Prerequisites

- Node.js 20+ (or [Bun](https://bun.sh))
- A Google Gemini API key (optional — the site works without it; the AI coach plan is skipped)

### Install & run

```bash
git clone https://github.com/projectvers31-ux/FITFEKY.women.git
cd FITFEKY.women
npm install
```

Copy the environment template and fill in what you need:

```bash
cp .env.example .env.local
```

Start the dev server:

```bash
npm run dev        # http://localhost:3000
```

### Scripts

| Command                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Start the Next.js dev server on port 3000    |
| `npm run build`        | Production build                             |
| `npm run build:local`  | Build + copy static assets for standalone    |
| `npm run start`        | Serve the standalone build (Bun)             |
| `npm run lint`         | ESLint over the whole repo                   |
| `npm run db:push`      | Push Prisma schema to the database           |
| `npm run db:migrate`   | Run Prisma migrations                        |
| `npm run db:reset`     | Reset the database from migrations           |

### Environment variables

| Variable                   | Required | Description                                  |
| -------------------------- | -------- | -------------------------------------------- |
| `GEMINI_API_KEY`           | Optional | Google Gemini key used by `/api/ai/fit`      |
| `GOOGLE_API_KEY`           | Optional | Fallback for Gemini (if `GEMINI_API_KEY` unset) |
| `GEMINI_MODEL`             | Optional | Gemini model id (default `gemini-2.0-flash`) |
| `NEXT_PUBLIC_META_PIXEL_ID`| Optional | Meta Pixel ID for conversion tracking        |
| `NEXT_PUBLIC_SITE_URL`     | Optional | Canonical site URL (default `https://www.fitfeky.com`) |

## Project Structure

```
src/
├── app/                  # App Router pages & API routes
│   ├── api/ai/fit/       # POST /api/ai/fit — Gemini wellness coach
│   ├── compare/          # Side-by-side product comparison
│   ├── find-my-perfect-fit/  # 5-question assessment funnel
│   ├── community/        # Community sign-up
│   └── ...
├── components/
│   ├── home/             # Homepage sections
│   ├── products/         # Product cards, tables, dialogs
│   ├── calculators/      # Interactive tools
│   ├── community/        # Community UI
│   ├── shared/           # Affiliate buttons, badges, images
│   └── ui/               # shadcn/ui primitives
├── data/                 # Curated recommendation data
├── lib/                  # SEO, product-utils, categories, meta-pixel
└── services/             # CSV / file storage services
```

## API

### `POST /api/ai/fit`

Generates a personalized wellness coach plan from assessment answers.

**Body:**

```json
{
  "match": "treadmill",
  "answers": {
    "age": 55,
    "mainGoal": "Joint Pain Relief",
    "fitnessLevel": "Occasionally active",
    "budget": "$150 – $400",
    "conditions": ["Knee issues"]
  }
}
```

**Response:** `{ ok: true, summary, workoutStyle, equipment, habits, safety, motivation }`
— or `503` when `GEMINI_API_KEY` is not configured.

## Deployment

The site is deployed to Vercel (`vercel.json` handles immutable caching for
static assets). A self-hosted option is supported via `Caddyfile` and the
standalone output (`npm run build:local`).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code style,
branching and pull-request process, and [SECURITY.md](SECURITY.md) for how to
report vulnerabilities.

## License

Distributed under the [Eclipse Public License 2.0](LICENSE).

---

<p align="center"><em>Curated by women who train, for women who move with intention.</em></p>
