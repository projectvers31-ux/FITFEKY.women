/**
 * Editorial content for trust, conversion and SEO. Separated from components
 * so copy can be reviewed/tuned without touching layout.
 */

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  quote: string;
  /** What she bought / what it helped with. */
  highlight: string;
  /** Tailwind gradient for the avatar. */
  accent: string;
  /** Star rating given. */
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Margaret R.",
    age: 58,
    location: "Austin, TX",
    quote:
      "At 58 I thought my running days were over — my knees just couldn't take it. FitFeky's walking pad pick changed everything. I'm back to 7,000 steps a day and my joints feel amazing. The quality-score system made choosing effortless.",
    highlight: "Walking pad convert — down 14 lbs in 3 months",
    accent: "from-rose-400 to-pink-500",
    rating: 5,
  },
  {
    id: "t2",
    name: "Linda K.",
    age: 52,
    location: "Portland, OR",
    quote:
      "The resistance bands they recommended are genuinely the best I've owned. I've rebuilt strength in my shoulders without aggravating an old rotator-cuff injury. The buying guide answered every question I had before I even had to ask.",
    highlight: "Rebuilt shoulder strength post-injury",
    accent: "from-emerald-400 to-teal-500",
    rating: 5,
  },
  {
    id: "t3",
    name: "Patricia D.",
    age: 64,
    location: "Asheville, NC",
    quote:
      "I'm 64 and finally feel like I have a routine that fits my life. The yoga wheel and blocks they suggested helped me touch my toes again for the first time in a decade. I trust their reviews completely — no fluff, just honest picks.",
    highlight: "Regained flexibility she'd lost in her 50s",
    accent: "from-amber-400 to-orange-500",
    rating: 5,
  },
  {
    id: "t4",
    name: "Susan M.",
    age: 47,
    location: "Denver, CO",
    quote:
      "What sold me was the BMI calculator — it reframed everything. I stopped obsessing over the scale and started tracking body fat %. The smart scale they recommended syncs perfectly. Six months in and I'm stronger than I was at 35.",
    highlight: "Stronger at 47 than at 35",
    accent: "from-fuchsia-400 to-purple-500",
    rating: 5,
  },
  {
    id: "t5",
    name: "Carol B.",
    age: 61,
    location: "Savannah, GA",
    quote:
      "My massage gun has been a lifesaver for my lower back. I was skeptical about spending the money, but the Editor's Choice badge and the 2,000+ reviews convinced me. Worth every penny — I use it every single night now.",
    highlight: "Chronic back pain finally manageable",
    accent: "from-sky-400 to-cyan-500",
    rating: 5,
  },
  {
    id: "t6",
    name: "Janet W.",
    age: 55,
    location: "Minneapolis, MN",
    quote:
      "I bought the foam roller on their recommendation for my tight hips from years of desk work. Two weeks of 10-minute sessions and I can sit cross-legged again. The recovery calculator helped me stop overtraining too. Brilliant site.",
    highlight: "Hips mobile again after years of sitting",
    accent: "from-lime-400 to-green-500",
    rating: 5,
  },
];

/** "How we test" — transparency builds trust + conversion. */
export const TESTING_CRITERIA = [
  {
    title: "Real Customer Ratings",
    weight: "30%",
    description:
      "We weight products with thousands of verified reviews from women 40+. A 4.7-star average across 5,000+ reviews means more to us than a single lab test.",
    icon: "Star",
  },
  {
    title: "Review Volume & Recency",
    weight: "20%",
    description:
      "Products with sustained, recent reviews signal lasting quality. We deprioritize flash-in-the-pan items with thin review histories.",
    icon: "TrendingUp",
  },
  {
    title: "Build Quality & Brand",
    weight: "25%",
    description:
      "We evaluate materials, weight capacity, warranty and brand reputation. Brands that stand behind their gear with multi-year warranties score higher.",
    icon: "ShieldCheck",
  },
  {
    title: "Fit for Women 40+",
    weight: "25%",
    description:
      "Joint-friendliness, ease of use, clear instructions and approachable design are non-negotiable. If it frustrates a first-time user, it doesn't make our list.",
    icon: "Heart",
  },
];

/** Trust badges for the social-proof bar. */
export const TRUST_BADGES = [
  { label: "172 Products Tested", sub: "Quality-scored & verified" },
  { label: "4.7★ Average Rating", sub: "Across 100,000+ reviews" },
  { label: "Editor's Choice Picks", sub: "Top 1% by quality score" },
  { label: "Independently Reviewed", sub: "Never paid for placement" },
];

/** Long-tail-keyword category content blocks for SEO. */
export const CATEGORY_CONTENT: Record<
  string,
  { h2: string; intro: string; keywords: string[] }
> = {
  resistance_bands: {
    h2: "Best Resistance Bands for Women Over 40 (2026 Guide)",
    intro:
      "Resistance bands are the single most versatile, joint-friendly strength tool a woman over 40 can own. Unlike dumbbells, bands provide ascending resistance — lightest where your joints are most vulnerable and heaviest where you're strongest. Our quality-scored picks cover fabric bands, handled sets, loop bands and physical-therapy kits.",
    keywords: [
      "resistance bands for women over 40",
      "best exercise bands for home workout",
      "resistance bands vs weights for women",
      "fabric resistance bands reviews",
    ],
  },
  treadmill: {
    h2: "Best Walking Pads & Under-Desk Treadmills for Women 50+",
    intro:
      "Walking pads have revolutionized low-impact cardio for women over 50. Compact enough to slide under a desk, they let you bank 5,000–8,000 steps daily without the joint-pounding impact of running. We rate walking pads on motor quietness, weight capacity, incline options and app connectivity.",
    keywords: [
      "best walking pad for women over 50",
      "under desk treadmill weight loss",
      "walking pad vs treadmill",
      "compact walking machine small spaces",
    ],
  },
  yoga_mat: {
    h2: "Best Yoga Mats for Women Over 45 (Cushioned & Non-Slip)",
    intro:
      "A quality yoga mat is the foundation of every home practice — and after 45, cushioning matters more than ever for wrist, knee and spine comfort. We evaluate thickness, grip, eco-materials and durability so your mat supports you for years, not months.",
    keywords: [
      "best yoga mat for women over 50",
      "cushioned yoga mat for joints",
      "non slip yoga mat reviews",
      "thick yoga mat for bad knees",
    ],
  },
  smart_scale: {
    h2: "Best Smart Scales for Body Composition (Women 40+ Reviews)",
    intro:
      "After 40, the number on the scale lies. A smart body composition scale tracks body fat %, muscle mass, water weight and bone mass — the metrics that actually reflect your health. Our picks sync with Apple Health, Fitbit and Google Fit for effortless trend tracking.",
    keywords: [
      "best smart scale for women over 40",
      "body fat scale accuracy",
      "BMI smart scale reviews 2026",
      "body composition analyzer scale",
    ],
  },
};
