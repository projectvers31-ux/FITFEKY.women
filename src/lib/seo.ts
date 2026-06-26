import type { Metadata } from "next";
import type { Product } from "./types";
import { catalogStats } from "./product-utils";
import { CATEGORIES, CATEGORY_MAP } from "./categories";

const SITE_URL = "https://fitfeky.com";
const SITE_NAME = "FitFeky";

/** Canonical site URL (used for sitemaps, OG, JSON-LD). */
export const siteUrl = SITE_URL;

/** Site-wide metadata for the homepage. */
export const homeMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FitFeky — Best At-Home Fitness Gear for Women Over 40 (2026 Reviews)",
  description:
    "Shop 172 quality-scored walking pads, resistance bands, yoga mats, smart scales & massage guns for women 40+. Expert reviews, real ratings, free BMI & calorie calculators. Find your perfect low-impact home workout gear today.",
  keywords: [
    "best fitness equipment for women over 40",
    "at home workout gear women 50",
    "walking pad for weight loss",
    "resistance bands for women over 40",
    "yoga gear for seniors",
    "low impact cardio equipment",
    "smart body fat scale reviews",
    "massage gun for muscle recovery",
    "home gym equipment for women",
    "best yoga mat for over 50",
    "foam roller for back pain",
    "mini stepper exercise machine",
    "dumbbells for women over 45",
    "under desk treadmill reviews 2026",
    "joint friendly exercise equipment",
  ],
  authors: [{ name: "FitFeky Editorial Team" }],
  creator: "FitFeky",
  publisher: "FitFeky",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "FitFeky — Best At-Home Fitness Gear for Women Over 40",
    description:
      "172 quality-scored walking pads, resistance bands, yoga mats & smart scales. Expert reviews, free calculators, real ratings. Find your perfect low-impact home workout gear.",
    images: [{ url: "/hero-lifestyle.png", width: 1344, height: 768, alt: "Woman practicing yoga at home with premium fitness gear" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitFeky — Best At-Home Fitness Gear for Women Over 40",
    description:
      "172 quality-scored walking pads, resistance bands, yoga mats & smart scales. Expert reviews + free calculators.",
    images: ["/hero-lifestyle.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      "FitFeky curates and quality-scores at-home fitness equipment for women over 40, covering walking pads, resistance bands, yoga gear, smart scales and recovery tools.",
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** JSON-LD: ItemList of top products (rich results eligible). */
export function productListJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best At-Home Fitness Gear for Women Over 40",
    description:
      "Expert-curated, quality-scored fitness equipment for women 40+, 50+ and beyond.",
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

/** Pull a plausible brand name from the start of a product title. */
export function extractBrand(title: string): string {
  const m = title.match(/^([A-Za-z0-9'&-]+)\s/);
  return m ? m[1] : "Amazon";
}

/** Long-tail keyword FAQ content for SEO + conversion. */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is the best fitness equipment for women over 40 to use at home?",
    a: "The best at-home fitness equipment for women over 40 prioritizes joint-friendly, low-impact movement. Our top picks include under-desk walking pads for daily cardio, resistance bands for strength training that protects joints, a cushioned yoga mat for flexibility, and a smart body composition scale to track real progress (not just weight). Every product in our catalog is quality-scored by our editorial team so you can shop with confidence.",
  },
  {
    q: "Are walking pads good for weight loss after 50?",
    a: "Yes. A walking pad is one of the most effective low-impact tools for women over 50 because it lets you accumulate 5,000–8,000 daily steps without the joint stress of running. At 2.5 mph, a 160 lb woman burns roughly 90–120 calories per 30 minutes. Consistency is the key — five 30-minute sessions per week creates a meaningful, sustainable calorie deficit.",
  },
  {
    q: "Which resistance bands are best for women over 40?",
    a: "For women over 40 we recommend fabric or padded-handle resistance band sets with door anchors and stackable levels (5–150 lbs). Bands offer ascending resistance, meaning the load is lightest where your joints are most vulnerable. Look for sets with a quality score of 85+ and Priority A status in our catalog — these have the strongest real-customer ratings and best durability.",
  },
  {
    q: "How does FitFeky choose and score products?",
    a: "Every product is evaluated against four weighted criteria: real customer ratings (30%), review volume and recency (20%), build quality and brand reputation (25%), and value for women 40+ specifically (25%). Products scoring 85+ earn our Editor's Choice badge; Priority A items are our top-tier recommendations. We never accept payment for placement.",
  },
  {
    q: "Is a smart scale worth it for tracking fitness progress after 40?",
    a: "Absolutely. After 40, body composition matters far more than the number on the scale because muscle is denser than fat. A smart scale estimates body fat %, muscle mass, water weight and bone mass using bioelectrical impedance. While not lab-accurate, these metrics are directionally correct — tracking the 4-week trend of your body-fat percentage is the single best way to see real progress.",
  },
  {
    q: "What low-impact cardio equipment is easiest on the knees?",
    a: "Walking pads, rowing machines, mini steppers with handles, and elliptical-style resistance band workouts are all excellent knee-friendly cardio options. They keep one foot in contact with the ground (or a stable surface) at all times, reducing impact forces by up to 75% compared to running. Avoid jump ropes and high-impact plyometrics if you have knee concerns.",
  },
  {
    q: "How often should women over 40 work out at home?",
    a: "The CDC recommends 150 minutes of moderate cardio plus 2 strength sessions per week. For women over 40, we suggest breaking this into bite-sized sessions: 30 minutes on a walking pad 5 days a week, two 20-minute resistance band or dumbbell sessions, and 10 minutes of daily yoga or foam rolling for mobility and recovery.",
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
    { name: "Fitness Gear for Women 40+", url: "/#catalog" },
  ]);
}

/** Generate the sitemap entries (homepage + category anchors). */
export function sitemapEntries() {
  const stats = catalogStats();
  const base = [
    { url: "/", priority: 1.0, changefreq: "daily" as const },
  ];
  for (const c of CATEGORIES) {
    base.push({
      url: `/#catalog`,
      priority: 0.8,
      changefreq: "weekly" as const,
    });
  }
  base.push({ url: "/#calculators", priority: 0.7, changefreq: "monthly" as const });
  base.push({ url: "/#editorial", priority: 0.7, changefreq: "weekly" as const });
  return { entries: base, totalProducts: stats.total };
}

/** Structured-data <script> tag renderer for the page head. */
export function jsonLdScript(data: object) {
  return JSON.stringify(data);
}
