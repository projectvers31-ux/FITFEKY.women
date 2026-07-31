import type { Metadata } from "next";
import type { Product } from "./types";
import { catalogStats } from "./product-utils";
import { CATEGORIES, CATEGORY_MAP } from "./categories";
import { TESTIMONIALS } from "./content";

const SITE_URL = "https://www.fitfeky.com";
const SITE_NAME = "FitFeky";

/** Canonical site URL (used for sitemaps, OG, JSON-LD). */
export const siteUrl = SITE_URL;

/** Site-wide metadata for the homepage. */
export const homeMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FitFeky | Joint-Friendly Home Fitness Gear for Women 45+",
  description:
    "Curated walking pads, resistance bands & yoga gear for women 45+. Quality-scored, expert-reviewed, joint-friendly. Find your perfect home workout setup.",
  keywords: [
    "best fitness equipment for women over 45",
    "at home workout gear women 45",
    "walking pad for weight loss",
    "resistance bands for women over 45",
    "yoga gear for midlife women",
    "low impact cardio equipment",
    "smart body fat scale reviews",
    "massage gun for muscle recovery",
    "home gym equipment for women",
    "best yoga mat for over 45",
    "foam roller for back pain",
    "mini stepper exercise machine",
    "dumbbells for women over 45",
    "under desk treadmill reviews 2026",
    "joint friendly exercise equipment",
    "menopause friendly fitness gear",
  ],
  authors: [{ name: "FitFeky Editorial Team" }],
  creator: "FitFeky",
  publisher: "FitFeky",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: "FitFeky | Joint-Friendly Home Fitness Gear for Women 45+",
    description:
      "Curated walking pads, resistance bands & yoga gear for women 45+. Quality-scored, expert-reviewed, joint-friendly.",
    images: [{ url: "/hero-lifestyle.png", width: 1344, height: 768, alt: "Woman practicing yoga at home with premium fitness gear" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitFeky | Joint-Friendly Home Fitness Gear for Women 45+",
    description:
      "Curated walking pads, resistance bands & yoga gear for women 45+. Quality-scored, expert-reviewed, joint-friendly.",
    images: ["/hero-lifestyle.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "health & fitness",
};

/** JSON-LD: Organization schema (helps Google Knowledge Panel). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      "FitFeky curates and quality-scores at-home fitness equipment for women over 45, covering walking pads, resistance bands, yoga gear, smart scales and recovery tools.",
    email: "hello@fitfeky.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@fitfeky.com",
      availableLanguage: ["English"],
    },
    knowsAbout: [
      "fitness equipment for women over 45",
      "low-impact home cardio",
      "resistance band training",
      "joint-friendly exercise equipment",
      "menopause friendly fitness gear",
    ],
    sameAs: [
      "https://www.facebook.com/fitfeky",
      "https://www.instagram.com/fitfeky",
      "https://www.pinterest.com/fitfeky",
    ],
  };
}

/** JSON-LD: WebSite schema (enables sitelinks search box). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "FitFeky is a curated fitness gear recommendation platform for women over 45 — quality-scored walking pads, resistance bands, yoga gear and recovery tools.",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Content reviewers with credentials (E-E-A-T author schema). */
export const REVIEWERS = [
  {
    name: "Anna",
    jobTitle: "Founder & Lead Reviewer",
    worksFor: SITE_NAME,
    description:
      "FitFeky founder and lead product reviewer. Personally tests every Editor's Choice pick and has reviewed 170+ home fitness products for women 45+.",
    credentials:
      "Certified personal trainer; 12+ years of product testing experience in home fitness gear.",
  },
  {
    name: "Maria",
    jobTitle: "Senior Product Tester",
    worksFor: SITE_NAME,
    description:
      "Former group fitness instructor in her 50s who tests walking pads and resistance bands hands-on at 10,000 steps per day.",
    credentials:
      "Former group fitness instructor; 20+ years of fitness coaching experience.",
  },
  {
    name: "Ellen",
    jobTitle: "Physical Therapy Consultant",
    worksFor: SITE_NAME,
    description:
      "Licensed doctor of physical therapy who reviews every FitFeky recommendation for joint safety and biomechanical soundness.",
    credentials:
      "Licensed Doctor of Physical Therapy (DPT); specializes in exercise for older adults and joint rehabilitation.",
  },
] as const;

/** JSON-LD: Person schema for content reviewers (E-E-A-T author markup). */
export function reviewerJsonLd(name: string) {
  const r = REVIEWERS.find((x) => x.name === name) ?? REVIEWERS[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: r.name,
    jobTitle: r.jobTitle,
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    description: r.description,
    knowsAbout: r.credentials,
  };
}

/** JSON-LD: Article schema for buying guides / editorial content. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  body: string[];
  keywords?: string[];
  image: string;
  urlPath: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: `${SITE_URL}${opts.image}`,
    author: {
      "@type": "Person",
      name: opts.author ?? "FitFeky Editorial Team",
      worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: `${SITE_URL}${opts.urlPath}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: "en-US",
    keywords: opts.keywords?.join(", "),
    articleSection: "Wellness Journal",
    articleBody: opts.body.join("\n\n"),
  };
}

/** JSON-LD: AboutPage schema for the /about page (E-E-A-T entity definition). */
export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About FitFeky",
    url: `${SITE_URL}/about`,
    description:
      "FitFeky is a curated fitness gear recommendation platform for women over 45. Learn how we test, score and independently review home fitness equipment.",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      email: "hello@fitfeky.com",
      description:
        "FitFeky is a curated fitness gear recommendation platform for women over 45, founded to help midlife women find joint-friendly home fitness equipment.",
      founder: {
        "@type": "Person",
        name: "Anna",
        jobTitle: "Founder & Lead Reviewer",
        description:
          "FitFeky founder and lead reviewer who personally tests every Editor's Choice pick.",
      },
      employee: REVIEWERS.map((r) => ({
        "@type": "Person",
        name: r.name,
        jobTitle: r.jobTitle,
        worksFor: { "@type": "Organization", name: SITE_NAME },
        description: r.description,
      })),
    },
  };
}

/** JSON-LD: ItemList of top products (rich results eligible). */
export function productListJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best At-Home Fitness Gear for Women Over 45",
    description:
      "Expert-curated, quality-scored fitness equipment for women 45 and beyond.",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.title,
        image: p.image,
        url: p.affiliateUrl,
        sku: p.asin,
        brand: { "@type": "Brand", name: extractBrand(p.title) },
        category: CATEGORY_MAP[p.category]?.label ?? p.category,
        aggregateRating:
          p.rating != null
            ? {
                "@type": "AggregateRating",
                ratingValue: p.rating,
                reviewCount: p.reviews ?? undefined,
                bestRating: 5,
                worstRating: 1,
              }
            : undefined,
        offers: {
          "@type": "Offer",
          url: p.affiliateUrl,
          priceCurrency: "USD",
          price: p.price ?? undefined,
          availability: p.price != null
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          seller: { "@type": "Organization", name: "Amazon" },
        },
      },
    })),
  };
}

/** JSON-LD: FAQPage schema (rich FAQ results in SERP). */
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** JSON-LD: BreadcrumbList for category navigation. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/** JSON-LD: Review schema for the homepage testimonials (rich-result eligible). */
export function reviewsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FitFeky Customer Testimonials",
    itemListElement: TESTIMONIALS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        itemReviewed: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating,
          bestRating: 5,
          worstRating: 1,
        },
        author: { "@type": "Person", name: t.name },
        reviewBody: t.quote,
        name: t.highlight,
      },
    })),
  };
}

/** Pull a plausible brand name from the start of a product title. */
export function extractBrand(title: string): string {
  const m = title.match(/^([A-Za-z0-9'&-]+)\s/);
  return m ? m[1] : "Amazon";
}

/** Long-tail keyword FAQ content for SEO + conversion. */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is the best fitness equipment for women over 45 to use at home?",
    a: "The best at-home fitness equipment for women over 45 prioritizes joint-friendly, low-impact movement. Our top picks include under-desk walking pads for daily cardio, resistance bands for gentle strength training that protects joints, a cushioned yoga mat for flexibility, and a smart body composition scale to track real progress (not just weight). Every product in our catalog is quality-scored by our editorial team so you can shop with confidence.",
  },
  {
    q: "Are walking pads good for weight loss after 45?",
    a: "Yes. A walking pad is one of the most effective low-impact tools for women over 45 because it lets you accumulate 5,000–8,000 daily steps without the joint stress of running. At 2.5 mph, a 160 lb woman burns roughly 90–120 calories per 30 minutes. Consistency is the key — five 30-minute sessions per week creates a meaningful, sustainable calorie deficit.",
  },
  {
    q: "Which resistance bands are best for women over 45?",
    a: "For women over 45 we recommend fabric or padded-handle resistance band sets with door anchors and stackable levels (5–150 lbs). Bands offer ascending resistance, meaning the load is lightest where your joints are most vulnerable. Look for sets with a quality score of 85+ and Priority A status in our catalog — these have the strongest real-customer ratings and best durability.",
  },
  {
    q: "How does FitFeky choose and score products?",
    a: "Every product is evaluated against four weighted criteria: real customer ratings (30%), review volume and recency (20%), build quality and brand reputation (25%), and value for women 45+ specifically (25%). Products scoring 85+ earn our Editor's Choice badge; Priority A items are our top-tier recommendations. We never accept payment for placement.",
  },
  {
    q: "Is a smart scale worth it for tracking fitness progress after 45?",
    a: "Absolutely. After 45, body composition matters far more than the number on the scale because muscle is denser than fat. A smart scale estimates body fat %, muscle mass, water weight and bone mass using bioelectrical impedance. While not lab-accurate, these metrics are directionally correct — tracking the 4-week trend of your body-fat percentage is the single best way to see real progress.",
  },
  {
    q: "What low-impact cardio equipment is easiest on the knees?",
    a: "Walking pads, rowing machines, mini steppers with handles, and elliptical-style resistance band workouts are all excellent knee-friendly cardio options. They keep one foot in contact with the ground (or a stable surface) at all times, reducing impact forces by up to 75% compared to running. Avoid jump ropes and high-impact plyometrics if you have knee concerns.",
  },
  {
    q: "How often should women over 45 work out at home?",
    a: "The CDC recommends 150 minutes of moderate cardio plus 2 strength sessions per week. For women over 45, we suggest breaking this into bite-sized sessions: 30 minutes on a walking pad 5 days a week, two 20-minute resistance band or dumbbell sessions, and 10 minutes of daily yoga or foam rolling for mobility and recovery.",
  },
  {
    q: "Do you earn a commission on Amazon links?",
    a: "Yes. As an Amazon Associate, FitFeky earns from qualifying purchases at no extra cost to you. This keeps our reviews free and independent — we never accept payment for product placement, and our quality scores are based entirely on customer data and our editorial evaluation. Prices and availability are set by Amazon and are subject to change.",
  },
];

/** Site-wide breadcrumb for the homepage. */
export function homeBreadcrumb() {
  return breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Fitness Gear for Women 45+", url: "/#catalog" },
  ]);
}

/** Generate the sitemap entries (homepage + category anchors). */
export function sitemapEntries() {
  const stats = catalogStats();
  const base: { url: string; priority: number; changefreq: string }[] = [
    { url: "/", priority: 1.0, changefreq: "daily" },
  ];
  for (const c of CATEGORIES) {
    base.push({
      url: `/#catalog`,
      priority: 0.8,
      changefreq: "weekly",
    });
  }
  base.push({ url: "/#calculators", priority: 0.7, changefreq: "monthly" });
  base.push({ url: "/#editorial", priority: 0.7, changefreq: "weekly" });
  return { entries: base, totalProducts: stats.total };
}

/** Structured-data <script> tag renderer for the page head. */
export function jsonLdScript(data: object) {
  return JSON.stringify(data);
}

/**
 * Per-page Metadata fragment that emits a self-referencing canonical and
 * en-us hreflang for the given path. The root layout provides sitewide
 * defaults; each page spreads this so its canonical always points at itself
 * (never inherits "/").
 *
 * - Homepage "/" renders as https://www.fitfeky.com/ (trailing slash).
 * - Query params (filters/search) are never part of `path`, so filtered
 *   views canonically point back at the clean root page.
 */
export function pageMetadata(path: string) {
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    alternates: {
      canonical,
      languages: { "en-us": canonical },
    },
  } satisfies Metadata;
}
