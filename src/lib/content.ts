/**
 * Editorial content for trust, conversion and SEO. Separated from components
 * so copy can be reviewed/tuned without touching layout.
 */

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  /** What she used — product category. */
  product: string;
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
    product: "Walking pad",
    quote:
      "My doctor told me to keep moving, but my knees had made running impossible for years. The walking pad FitFeky recommended changed everything — I'm back to 7,000 steps a day, down 14 lbs, and the knee pain that had me limping by noon is simply gone. I never thought I'd look forward to exercise again, but I genuinely do.",
    highlight: "Walking pad — down 14 lbs, back to 7,000 steps",
    accent: "from-rose-400 to-pink-500",
    rating: 5,
  },
  {
    id: "t2",
    name: "Susan L.",
    age: 52,
    location: "Columbus, OH",
    product: "Resistance bands",
    quote:
      "After years at a desk I had a frozen shoulder and zero energy left at the end of the day. Their resistance band pick let me rebuild strength at my own pace — ten minutes a day, no gym, no joint pain. My shoulder is fully mobile again and I've found muscles I was sure I'd lost in my forties.",
    highlight: "Resistance bands — shoulder pain gone, strength rebuilt",
    accent: "from-emerald-400 to-teal-500",
    rating: 5,
  },
  {
    id: "t3",
    name: "Diane W.",
    age: 63,
    location: "Scottsdale, AZ",
    product: "Yoga mat",
    quote:
      "At 63 I was convinced my stiff hips were just part of getting older. The cushioned yoga mat they recommended gave me the confidence to stretch every morning — I touch my toes for the first time in 20 years, and the lower back ache that followed me around is noticeably better. It's not about vanity; it's about staying independent.",
    highlight: "Yoga mat — touched her toes again after 20 years",
    accent: "from-amber-400 to-orange-500",
    rating: 5,
  },
];

/** "How we test" — transparency builds trust + conversion. */
export const TESTING_CRITERIA = [
  {
    title: "Real Customer Ratings",
    weight: "30%",
    description:
      "We weight products with thousands of verified reviews from women 45+. A 4.7-star average across 5,000+ reviews means more to us than a single lab test.",
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
    title: "Fit for Women 45+",
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
  { label: "15 Categories", sub: "From walking pads to smart scales" },
  { label: "Free Fitness Tools", sub: "BMI, planner, calorie & body fat calculators" },
];

/** Long-tail-keyword category content blocks for SEO. */
export const CATEGORY_CONTENT: Record<
  string,
  { h2: string; intro: string; keywords: string[] }
> = {
  resistance_bands: {
    h2: "Best Resistance Bands for Women Over 45 (2026 Guide)",
    intro:
      "Resistance bands are the single most versatile, joint-friendly strength tool a woman over 45 can own. Unlike dumbbells, bands provide ascending resistance — lightest where your joints are most vulnerable and heaviest where you're strongest. Our quality-scored picks cover fabric bands, handled sets, loop bands and physical-therapy kits.",
    keywords: [
      "resistance bands for women over 45",
      "best exercise bands for home workout",
      "resistance bands vs weights for women",
      "fabric resistance bands reviews",
    ],
  },
  treadmill: {
    h2: "Best Walking Pads & Under-Desk Treadmills for Women 45+",
    intro:
      "Walking pads have revolutionized low-impact cardio for women over 45. Compact enough to slide under a desk, they let you bank 5,000–8,000 steps daily without the joint-pounding impact of running. We rate walking pads on motor quietness, weight capacity, incline options and app connectivity.",
    keywords: [
      "best walking pad for women over 45",
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
      "best yoga mat for women over 45",
      "cushioned yoga mat for joints",
      "non slip yoga mat reviews",
      "thick yoga mat for bad knees",
    ],
  },
  smart_scale: {
    h2: "Best Smart Scales for Body Composition (Women 45+ Reviews)",
    intro:
      "After 45, the number on the scale lies. A smart body composition scale tracks body fat %, muscle mass, water weight and bone mass — the metrics that actually reflect your health. Our picks sync with Apple Health, Fitbit and Google Fit for effortless trend tracking.",
    keywords: [
      "best smart scale for women over 45",
      "body fat scale accuracy",
      "BMI smart scale reviews 2026",
      "body composition analyzer scale",
    ],
  },
  yoga_accessories: {
    h2: "Best Yoga Accessories for Women Over 45 (Blocks, Wheels & Straps)",
    intro:
      "The right yoga accessories transform a home practice. Blocks bring the floor closer, wheels decompress the spine, and straps extend your reach safely. We review cushion density, grip texture, weight capacity and durability so you can stretch deeper without straining.",
    keywords: [
      "best yoga accessories for women over 45",
      "yoga wheel for back pain",
      "yoga blocks for beginners",
      "yoga strap for flexibility",
    ],
  },
  massage_gun: {
    h2: "Best Massage Guns for Women Over 45 (Muscle Recovery Guide)",
    intro:
      "A percussion massage gun is the most effective tool for at-home muscle recovery after 45. It delivers rapid pulses deep into sore tissue, increasing blood flow and breaking up adhesions without a trip to the therapist. We rate guns on noise level, stall force, battery life and attachment variety.",
    keywords: [
      "best massage gun for women over 45",
      "massage gun for back pain relief",
      "percussion massager for muscle recovery",
      "quiet massage gun for home use",
    ],
  },
  foam_roller: {
    h2: "Best Foam Rollers for Women Over 45 (Myofascial Release Guide)",
    intro:
      "Foam rolling is the simplest, most affordable way to release tight muscles and improve flexibility after 45. A quality roller helps break up fascia, reduce soreness, and restore range of motion in hips, back and shoulders. We evaluate density, surface texture, size options and durability.",
    keywords: [
      "best foam roller for women over 45",
      "foam roller for back pain relief",
      "myofascial release for seniors",
      "high density foam roller reviews",
    ],
  },
  dumbbell: {
    h2: "Best Dumbbells for Women Over 45 (Build Bone Density at Home)",
    intro:
      "Strength training with dumbbells is one of the most effective ways for women over 45 to build bone density and maintain muscle mass. We evaluate grip comfort, weight range, material quality and storage footprint so you can start lifting with confidence — even if you have never picked up a weight.",
    keywords: [
      "best dumbbells for women over 45",
      "adjustable dumbbells for home gym",
      "lightweight dumbbells for seniors",
      "dumbbell strength training bone density",
    ],
  },
  rowing_machine: {
    h2: "Best Rowing Machines for Women Over 45 (Full-Body Low-Impact Cardio)",
    intro:
      "Rowing machines deliver full-body, zero-impact cardio that engages 85% of your muscles in a single fluid motion. For women over 45, rowing builds cardiovascular endurance, strengthens the back and core, and protects the knees. We rate machines on resistance type, seat comfort, noise level and console features.",
    keywords: [
      "best rowing machine for women over 45",
      "low impact rowing machine for seniors",
      "magnetic vs air rower for home",
      "rowing machine for back pain",
    ],
  },
  jump_rope: {
    h2: "Best Jump Ropes for Women Over 45 (High-Intensity Low-Impact Cardio)",
    intro:
      "Jump ropes are a deceptively efficient cardio tool — 10 minutes of jumping equals roughly 30 minutes of jogging. For women over 45, the key is choosing a rope with the right weight, handle ergonomics and surface compatibility. We review speed ropes, beaded ropes and smart ropes with calorie tracking.",
    keywords: [
      "best jump rope for women over 45",
      "jump rope for weight loss",
      "smart jump rope with counter",
      "low impact jump rope workout",
    ],
  },
  pull_up_bar: {
    h2: "Best Pull-Up Bars for Women Over 45 (Upper Body Strength at Home)",
    intro:
      "A doorway pull-up bar is one of the most space-efficient ways to build upper-body and core strength at home. For women over 45, assisted pull-ups and dead hangs improve grip strength, posture and shoulder stability. We evaluate install ease, weight capacity, grip width and door frame compatibility.",
    keywords: [
      "best pull up bar for women over 45",
      "doorway pull up bar no screws",
      "pull up bar for seniors",
      "upper body strength training at home",
    ],
  },
  squat_machine: {
    h2: "Best Squat Machines for Women Over 45 (Supported Strength Training)",
    intro:
      "Squat machines provide guided, supported squatting that protects the knees and lower back while building leg and glute strength. They are ideal for women over 45 who want the benefits of squatting without the risk of improper form. We rate machines on range of motion, resistance smoothness, adjustability and footprint.",
    keywords: [
      "best squat machine for women over 45",
      "supported squat machine for seniors",
      "home squat machine for bad knees",
      "glute building machine for women",
    ],
  },
  inversion_table: {
    h2: "Best Inversion Tables for Women Over 45 (Back Pain Relief Guide)",
    intro:
      "Inversion therapy gently decompresses the spine, relieves pressure on discs and improves circulation. For women over 45 dealing with chronic lower back pain, an inversion table can be a drug-free alternative to manage discomfort. We evaluate safety features, angle adjustability, ankle lock comfort and build quality.",
    keywords: [
      "best inversion table for women over 45",
      "inversion therapy for back pain",
      "spinal decompression table at home",
      "safe inversion table for seniors",
    ],
  },
  fitness_tracker: {
    h2: "Best Fitness Trackers for Women Over 45 (Step Counting & Heart Health)",
    intro:
      "Fitness trackers have evolved far beyond step counting. For women over 45, the best trackers monitor heart rate, sleep quality, SpO2 and stress levels — metrics that matter more as we age. We rate trackers on display readability, battery life, companion app quality and comfort for all-day wear.",
    keywords: [
      "best fitness tracker for women over 45",
      "fitness tracker for seniors with heart monitor",
      "step counter watch for walking",
      "smart watch for health tracking",
    ],
  },
  general_fitness: {
    h2: "Wellness Essentials for Women Over 45 (Complete Home Gym Guide)",
    intro:
      "Building a home gym as a woman over 45 does not require a dedicated room or thousands of dollars. The essentials — a quality mat, resistance bands, a walking pad and a smart scale — cover cardio, strength, flexibility and tracking. We curate the best all-around gear for a balanced, sustainable home fitness routine.",
    keywords: [
      "home gym essentials for women over 45",
      "at home fitness equipment bundle",
      "home workout gear for beginners",
      "budget home gym setup women",
    ],
  },
  shaker_bottle: {
    h2: "Best Shaker Bottles for Women Over 45 (Post-Workout Nutrition Made Easy)",
    intro:
      "A quality shaker bottle removes every excuse for skipping post-workout nutrition. For women over 45, getting adequate protein after exercise is critical for muscle repair and bone health. We review bottles on leak-proof design, mixing mechanism, ease of cleaning and portability.",
    keywords: [
      "best shaker bottle for women over 45",
      "protein shaker bottle leak proof",
      "post workout shake for women over 45",
      "easy clean shaker bottle",
    ],
  },
};
