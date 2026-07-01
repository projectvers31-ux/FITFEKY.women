import type { CategoryMeta, CategoryId, CalculatorMeta } from "./types";

/**
 * Display metadata for every equipment category. Order matters — it controls
 * the order shown in the showcase and filter list.
 */
export const CATEGORIES: CategoryMeta[] = [
  {
    id: "resistance_bands",
    label: "Resistance Bands",
    blurb: "Gentle strength & toning that protects your joints.",
    icon: "Dumbbell",
    accent: "from-rose-400/80 to-rose-600/80",
  },
  {
    id: "yoga_accessories",
    label: "Yoga Accessories",
    blurb: "Blocks, wheels & straps for deeper, safer stretches.",
    icon: "Flower2",
    accent: "from-emerald-400/80 to-emerald-600/80",
  },
  {
    id: "yoga_mat",
    label: "Yoga Mats",
    blurb: "Cushioned, non-slip support for every flow.",
    icon: "RectangleHorizontal",
    accent: "from-teal-400/80 to-teal-600/80",
  },
  {
    id: "smart_scale",
    label: "Smart Scales",
    blurb: "Track body composition, not just the number.",
    icon: "Scale",
    accent: "from-amber-400/80 to-amber-600/80",
  },
  {
    id: "treadmill",
    label: "Walking Pads",
    blurb: "Low-impact cardio you can do while you work.",
    icon: "Footprints",
    accent: "from-orange-400/80 to-orange-600/80",
  },
  {
    id: "massage_gun",
    label: "Massage Guns",
    blurb: "Soothe sore muscles and speed recovery.",
    icon: "Zap",
    accent: "from-fuchsia-400/80 to-fuchsia-600/80",
  },
  {
    id: "foam_roller",
    label: "Foam Rollers",
    blurb: "Myofascial release for flexible, limber joints.",
    icon: "Cylinder",
    accent: "from-lime-400/80 to-lime-600/80",
  },
  {
    id: "dumbbell",
    label: "Dumbbells",
    blurb: "Build bone density with approachable weights.",
    icon: "Dumbbell",
    accent: "from-rose-400/80 to-pink-600/80",
  },
  {
    id: "rowing_machine",
    label: "Rowing Machines",
    blurb: "Full-body, low-impact cardio in one stroke.",
    icon: "Waves",
    accent: "from-sky-400/80 to-cyan-600/80",
  },
  {
    id: "jump_rope",
    label: "Jump Ropes",
    blurb: "Quick, joint-friendly cardio anywhere.",
    icon: "Spline",
    accent: "from-violet-400/80 to-purple-600/80",
  },
  {
    id: "pull_up_bar",
    label: "Pull-Up Bars",
    blurb: "Doorway bars for posture & upper-body strength.",
    icon: "Grip",
    accent: "from-stone-400/80 to-stone-600/80",
  },
  {
    id: "squat_machine",
    label: "Squat Machines",
    blurb: "Supported squats that protect your knees.",
    icon: "TrendingUp",
    accent: "from-red-400/80 to-rose-600/80",
  },
  {
    id: "inversion_table",
    label: "Inversion Tables",
    blurb: "Decompress your spine and ease back tension.",
    icon: "FlipVertical",
    accent: "from-indigo-400/80 to-indigo-600/80",
  },
  {
    id: "fitness_tracker",
    label: "Fitness Trackers",
    blurb: "Celebrate every step, heartbeat & win.",
    icon: "Watch",
    accent: "from-cyan-400/80 to-teal-600/80",
  },
  {
    id: "general_fitness",
    label: "Wellness Essentials",
    blurb: "Thoughtful extras for a complete home studio.",
    icon: "Sparkles",
    accent: "from-pink-400/80 to-rose-600/80",
  },
  {
    id: "shaker_bottle",
    label: "Shaker Bottles",
    blurb: "Mix, shake & hydrate — the perfect post-workout companion.",
    icon: "Droplet",
    accent: "from-sky-400/80 to-blue-600/80",
  },
];

export const CATEGORY_MAP: Record<CategoryId, CategoryMeta> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<CategoryId, CategoryMeta>,
);

export function categoryLabel(id: string): string {
  return CATEGORY_MAP[id as CategoryId]?.label ?? id;
}

/**
 * Calculator metadata — maps the "Suggested Calculator" field on each product
 * to a displayable, interactive widget.
 */
export const CALCULATORS: CalculatorMeta[] = [
  {
    id: "BMI Calculator",
    label: "BMI & Healthy Weight",
    description: "See where you stand and set a kind, realistic goal.",
    icon: "Scale",
    categories: ["smart_scale", "treadmill", "general_fitness"],
  },
  {
    id: "Calories Burned Walking Calculator",
    label: "Walking Calorie Burn",
    description: "Estimate calories from your daily walking pad sessions.",
    icon: "Footprints",
    categories: ["treadmill"],
  },
  {
    id: "Yoga Calorie Burn Calculator",
    label: "Yoga Calorie Burn",
    description: "Gentle flows still add up — see your burn.",
    icon: "Flower2",
    categories: ["yoga_mat", "yoga_accessories"],
  },
  {
    id: "Resistance Band Workout Calculator",
    label: "Resistance Band Burn",
    description: "Quick estimate for a band workout at home.",
    icon: "Dumbbell",
    categories: ["resistance_bands"],
  },
  {
    id: "Dumbbell Workout Calorie Calculator",
    label: "Strength Training Burn",
    description: "Calories burned lifting approachable weights.",
    icon: "Dumbbell",
    categories: ["dumbbell"],
  },
  {
    id: "Jump Rope Calorie Burn Calculator",
    label: "Jump Rope Burn",
    description: "Fast, fun cardio — track every skip.",
    icon: "Spline",
    categories: ["jump_rope"],
  },
  {
    id: "Daily Steps to Calories Calculator",
    label: "Steps → Calories",
    description: "Turn your daily step goal into calories.",
    icon: "Footprints",
    categories: ["fitness_tracker", "treadmill"],
  },
  {
    id: "Home Workout Calorie Calculator",
    label: "Home Workout Burn",
    description: "General at-home session calorie estimate.",
    icon: "Home",
    categories: ["general_fitness"],
  },
  {
    id: "Fitness Calorie Calculator",
    label: "Daily Fitness Calories",
    description: "Your overall active calorie snapshot.",
    icon: "Activity",
    categories: ["fitness_tracker", "general_fitness"],
  },
  {
    id: "Yoga Flexibility Progress Calculator",
    label: "Flexibility Progress",
    description: "Track your reach and celebrate gains over weeks.",
    icon: "StretchHorizontal",
    categories: ["yoga_mat", "yoga_accessories", "foam_roller"],
  },
  {
    id: "Muscle Recovery Time Calculator",
    label: "Muscle Recovery Time",
    description: "Rest smarter — know when to train again.",
    icon: "HeartPulse",
    categories: ["massage_gun", "foam_roller"],
  },
  {
    id: "Massage Therapy Benefits Calculator",
    label: "Massage Therapy Benefits",
    description: "See the wellness payoff of regular recovery work.",
    icon: "HandHeart",
    categories: ["massage_gun", "foam_roller"],
  },
];

export const CALCULATOR_MAP: Record<string, CalculatorMeta> = CALCULATORS.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<string, CalculatorMeta>,
);
