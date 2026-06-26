/**
 * Editorial article content shared between the homepage Wellness Journal
 * section and the /blog index page. Keeping it in one place ensures both
 * surfaces stay in sync.
 */

export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  accent: string;
  /** Editorial image path (generated, in /public). */
  image: string;
  /** Alt text for the image (accessibility + SEO). */
  imageAlt: string;
  /** Long-tail SEO keywords this article targets. */
  keywords: string[];
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "walking-pad-40",
    slug: "walking-pad-for-women-over-45",
    category: "Low-Impact Cardio",
    title: "Why a Walking Pad Is the Perfect First Piece of Home Cardio at 45",
    excerpt:
      "Joint-friendly, apartment-friendly and Netflix-friendly. Here's how 30 minutes a day on a walking pad can transform your energy — without the impact of running.",
    readMinutes: 5,
    accent: "from-orange-400/70 to-rose-500/70",
    image: "/blog-walking-pad.png",
    imageAlt: "A walking pad treadmill in a sunlit minimalist home office with warm oak floors",
    keywords: [
      "walking pad for women over 45",
      "under desk treadmill weight loss",
      "low impact cardio at home",
      "walking pad vs treadmill",
    ],
    body: [
      "If you're returning to movement in your 40s or 50s, the single best investment you can make is a low-impact cardio option you'll actually use every day. For most women, that's a walking pad.",
      "Unlike a full treadmill, a walking pad slides under your desk or beside the couch. The speed stays in a comfortable 1–4 mph range, which means your heart rate rises gently, your joints stay happy, and you can rack up 5,000–8,000 steps without ever changing into 'workout clothes.'",
      "The metabolic payoff is real: a 160 lb woman walking at 2.5 mph burns roughly 90–120 calories per 30 minutes. Do that five days a week and you've created a meaningful weekly deficit — plus the blood-sugar and mood benefits of breaking up long sits.",
      "Look for a pad with a quiet brushless motor, a weight capacity of at least 250 lb, and a remote so you can adjust speed mid-stride. Our Editor's Choice picks all clear those bars.",
    ],
  },
  {
    id: "resistance-bands-strength",
    slug: "resistance-bands-vs-weights-after-40",
    category: "Strength Training",
    title: "Resistance Bands vs. Weights After 40: What Actually Builds Bone",
    excerpt:
      "Weights win for bone density, but bands win for consistency. Here's how to combine both — and why bands are the safest place to (re)start.",
    readMinutes: 6,
    accent: "from-rose-400/70 to-fuchsia-500/70",
    image: "/blog-resistance-bands.png",
    imageAlt: "Colorful resistance bands arranged on warm cream linen",
    keywords: [
      "resistance bands vs weights",
      "strength training after 40",
      "bone density women over 50",
      "best resistance bands for women",
    ],
    body: [
      "After 40, preserving muscle and bone becomes non-negotiable. The question isn't whether to strength train — it's how to start without flaring up old injuries.",
      "Resistance bands offer ascending resistance: the further you stretch them, the harder they pull. That means the load is lightest where your joints are most vulnerable (the start of the movement) and heaviest where you're strongest. It's a remarkably forgiving way to rebuild strength.",
      "That said, true bone-density gains respond best to progressive external load — dumbbells and bodyweight. The smart play is to spend 4–8 weeks rebuilding movement quality with bands, then layer in light dumbbells once your joints feel ready.",
      "A simple twice-weekly routine: 15 minutes of band rows, presses, squats and glute bridges. Add a dumbbell goblet squat when it feels easy. That's it. Consistency beats intensity every single time.",
    ],
  },
  {
    id: "yoga-flexibility",
    slug: "gentle-yoga-for-stiff-hips",
    category: "Mobility & Yoga",
    title: "Gentle Yoga for Stiff Hips: A 15-Minute Flow You Can Do Every Day",
    excerpt:
      "Sitting shortens your hip flexors and weakens your glutes. This short, restorative flow reopens your hips and decompresses your lower back.",
    readMinutes: 4,
    accent: "from-emerald-400/70 to-teal-500/70",
    image: "/blog-yoga-hips.png",
    imageAlt: "A woman practicing a gentle yoga hip opener on a cream mat in a sunlit living room",
    keywords: [
      "yoga for stiff hips",
      "yoga for women over 50",
      "gentle yoga flow at home",
      "hip flexibility exercises",
    ],
    body: [
      "Stiff hips are one of the most common complaints we hear from women over 45 — and almost always, the culprit is hours of sitting, not age.",
      "A daily 15-minute flow centered on hip openers (low lunge, pigeon, reclined figure-four) and gentle spinal twists can restore range of motion in a matter of weeks. The key is frequency over intensity: a little, often.",
      "Invest in a yoga wheel and a pair of blocks. Blocks bring the floor up to you so you can relax into poses instead of fighting gravity. A wheel gently decompresses the spine and lets you backbend safely.",
      "Pair this with our Yoga Flexibility Progress Calculator to track your seated forward reach week over week. Watching the number climb is surprisingly motivating.",
    ],
  },
  {
    id: "smart-scale-truth",
    slug: "smart-scale-body-composition-truth",
    category: "Body Composition",
    title: "Stop Watching the Scale: What a Smart Scale Really Tells You",
    excerpt:
      "Body fat %, muscle mass, water weight — a smart scale reframes 'progress' so you stop quitting on week three. Here's how to read yours.",
    readMinutes: 5,
    accent: "from-amber-400/70 to-orange-500/70",
    image: "/blog-smart-scale.png",
    imageAlt: "A modern smart body fat scale on a warm cream bathroom floor",
    keywords: [
      "smart scale body fat accuracy",
      "body composition scale reviews",
      "BMI vs body fat percentage",
      "best smart scale for women",
    ],
    body: [
      "The number on a regular bathroom scale is a blunt instrument. It can't tell the difference between fat loss, muscle gain, water retention or a salty dinner. That's why so many women quit a perfectly good routine on week three.",
      "A smart scale uses bioelectrical impedance to estimate body fat percentage, muscle mass, water and even bone mass. None of these are lab-accurate, but they're directionally correct — and direction is exactly what you need.",
      "What to actually track: the trend of your body-fat percentage over 4-week windows, not the daily weight. If fat % trends down while muscle % holds steady, you're winning — even if the scale hasn't moved.",
      "Weigh once a week, first thing in the morning, after the bathroom, before water. Log it and step away. The trendline is your friend.",
    ],
  },
  {
    id: "knee-friendly-cardio",
    slug: "low-impact-cardio-bad-knees",
    category: "Low-Impact Cardio",
    title: "The 5 Best Low-Impact Cardio Options for Bad Knees",
    excerpt:
      "If running hurts, you have options. These five cardio machines and movements protect your knees while still burning serious calories.",
    readMinutes: 6,
    accent: "from-sky-400/70 to-cyan-500/70",
    image: "/blog-low-impact-cardio.png",
    imageAlt: "A rowing machine and walking pad in a sunlit home gym with warm oak floors",
    keywords: [
      "low impact cardio bad knees",
      "knee friendly cardio machines",
      "exercise for knee pain",
      "rowing machine vs walking pad",
    ],
    body: [
      "Knee pain doesn't have to mean the end of cardio. In fact, switching to low-impact options often lets you do more cardiovascular work, not less — because you're not sidelined by flare-ups.",
      "Our top five: walking pads (the gentlest entry point), rowing machines (full-body and zero impact), mini steppers with handles (builds leg strength while protecting the joint), elliptical-style band workouts, and swimming or water aerobics if you have pool access.",
      "The key principle: keep at least one foot in contact with a stable surface at all times. This reduces ground-reaction forces by up to 75% compared to running, which means your knee joint absorbs far less shock with every minute of movement.",
      "Avoid jump ropes, box jumps and high-impact plyometrics until your knees are pain-free for at least 12 weeks of consistent low-impact training. Patience now means decades of pain-free movement later.",
    ],
  },
  {
    id: "recovery-after-50",
    slug: "muscle-recovery-after-50",
    category: "Recovery",
    title: "Why Recovery Matters More After 50 (And How to Do It Right)",
    excerpt:
      "Your body takes longer to recover after 50 — that's normal, not a failure. Here's how to use a massage gun, foam roller and smart rest to train consistently for decades.",
    readMinutes: 7,
    accent: "from-violet-400/70 to-purple-500/70",
    image: "/blog-recovery.png",
    imageAlt: "A massage gun and foam roller arranged on warm cream linen",
    keywords: [
      "muscle recovery after 50",
      "foam roller benefits",
      "massage gun for recovery",
      "rest days for women over 50",
    ],
    body: [
      "Here's the truth nobody tells you about training after 50: recovery is the workout. What you do between sessions determines whether you progress or regress — and the older you get, the more intentional that recovery needs to be.",
      "After 50, muscle protein synthesis slows and connective tissue loses some of its elasticity. This means a hard session might need 48–72 hours of recovery instead of the 24 hours you needed at 30. That's not a reason to quit — it's a reason to plan smarter.",
      "Three tools make the biggest difference: a foam roller for 10 minutes of myofascial release after every session, a massage gun for targeted work on stubborn tight spots, and a serious commitment to sleep (7–9 hours, non-negotiable).",
      "Use our Recovery Time Calculator to get a personalized rest recommendation based on your age, session intensity and last night's sleep. It removes the guesswork — and the guilt — from taking an extra rest day.",
    ],
  },
];
