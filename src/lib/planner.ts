import type { Product, CategoryId } from "./types";
import { products } from "./product-data";

/** Fitness goals a user can select in the Home Gym Planner. */
export type FitnessGoal =
  | "weight_loss"
  | "strength"
  | "flexibility"
  | "recovery"
  | "cardio";

/** Room size tiers (square feet). */
export type RoomSize = "closet" | "bedroom" | "dedicated";

export interface PlanInput {
  /** Budget in USD. */
  budget: number;
  /** Available room size tier. */
  roomSize: RoomSize;
  /** Selected fitness goals. */
  goals: FitnessGoal[];
}

export interface PlanSlot {
  /** Role this product fills in the kit (e.g. "Cardio"). */
  role: string;
  /** Why we picked it for this plan. */
  reason: string;
  /** The recommended product (or null if nothing fits the budget). */
  product: Product | null;
}

export interface PlanResult {
  slots: PlanSlot[];
  totalCost: number;
  withinBudget: boolean;
  remainingBudget: number;
  /** Categories represented in the kit. */
  categories: CategoryId[];
}

/** Map each fitness goal to the categories that serve it. */
const GOAL_CATEGORIES: Record<FitnessGoal, CategoryId[]> = {
  weight_loss: ["treadmill", "smart_scale", "jump_rope", "rowing_machine"],
  strength: ["resistance_bands", "dumbbell", "pull_up_bar", "squat_machine"],
  flexibility: ["yoga_mat", "yoga_accessories", "foam_roller"],
  recovery: ["massage_gun", "foam_roller", "inversion_table"],
  cardio: ["treadmill", "jump_rope", "rowing_machine", "squat_machine"],
};

/** Items that need floor space — gated by room size. */
const SPACE_HEAVY: CategoryId[] = [
  "treadmill",
  "rowing_machine",
  "squat_machine",
  "inversion_table",
  "pull_up_bar",
];

/**
 * Pick the best product in a category that fits the remaining budget.
 * Prefers Priority A, then highest quality score. Considers N/A prices
 * as "fits any budget" since the user checks Amazon for the real price.
 */
function bestInCategoryForBudget(
  category: CategoryId,
  remainingBudget: number,
  allowNaPrice: boolean,
): Product | null {
  const candidates = products
    .filter((p) => p.category === category)
    .filter((p) => {
      if (p.price === null) return allowNaPrice;
      return p.price <= remainingBudget;
    })
    .sort((a, b) => {
      // Priority A first, then quality score, then lower price
      const pa = a.priority === "A" ? 0 : a.priority === "B" ? 1 : 2;
      const pb = b.priority === "A" ? 0 : b.priority === "B" ? 1 : 2;
      if (pa !== pb) return pa - pb;
      return b.qualityScore - a.qualityScore;
    });
  return candidates[0] ?? null;
}

/**
 * The core recommendation engine. Builds a kit of products that:
 *  - serves every selected goal
 *  - respects the room size (skips bulky gear in small rooms)
 *  - stays within or near the budget
 *  - dedupes categories (one product per category)
 */
export function recommendGearForPlan(input: PlanInput): PlanResult {
  const { budget, roomSize, goals } = input;

  // 1. Build the ordered list of categories to fill, based on goals.
  //    Every goal contributes its categories; we keep first-seen order so
  //    the primary goal's essentials are filled first.
  const orderedCategories: CategoryId[] = [];
  for (const goal of goals) {
    for (const cat of GOAL_CATEGORIES[goal]) {
      if (!orderedCategories.includes(cat)) orderedCategories.push(cat);
    }
  }

  // 2. Filter out space-heavy categories if the room is too small.
  const allowedCategories = orderedCategories.filter((cat) => {
    if (roomSize === "closet" && SPACE_HEAVY.includes(cat)) return false;
    if (roomSize === "bedroom" && (cat === "squat_machine" || cat === "inversion_table" || cat === "rowing_machine")) {
      return false;
    }
    return true;
  });

  // 3. Always include a smart scale if weight_loss or cardio is a goal and
  //    budget allows — it's the single best progress-tracking tool.
  const slots: PlanSlot[] = [];
  let spent = 0;
  const filledCategories = new Set<CategoryId>();

  const tryFill = (cat: CategoryId, role: string, reason: string) => {
    if (filledCategories.has(cat)) return;
    const remaining = budget - spent;
    // First try a priced product within budget; if none, allow N/A price
    // (user checks live Amazon price) as a fallback so we always suggest something.
    let product = bestInCategoryForBudget(cat, remaining, false);
    if (!product) product = bestInCategoryForBudget(cat, Infinity, true);
    if (!product) return;

    slots.push({ role, reason, product });
    if (product.price != null) spent += product.price;
    filledCategories.add(cat);
  };

  // Map categories to friendly roles + reasons.
  const ROLE_MAP: Record<CategoryId, { role: string; reason: string }> = {
    treadmill: {
      role: "Low-impact cardio",
      reason: "Daily walking is the gentlest way to burn calories without joint stress.",
    },
    resistance_bands: {
      role: "Strength training",
      reason: "Joint-friendly resistance that rebuilds muscle safely after 40.",
    },
    yoga_mat: {
      role: "Floor foundation",
      reason: "Cushioned support for every stretch, flow and floor exercise.",
    },
    yoga_accessories: {
      role: "Flexibility aid",
      reason: "Blocks and wheels help you reach deeper safely.",
    },
    smart_scale: {
      role: "Progress tracking",
      reason: "Body composition matters more than weight after 40 — track the trend.",
    },
    dumbbell: {
      role: "Bone-building strength",
      reason: "Approachable weights preserve bone density at midlife.",
    },
    foam_roller: {
      role: "Recovery & mobility",
      reason: "Myofascial release speeds recovery and restores range of motion.",
    },
    massage_gun: {
      role: "Targeted recovery",
      reason: "Soothes sore muscles and eases chronic tension quickly.",
    },
    jump_rope: {
      role: "Quick cardio",
      reason: "A fun, portable way to spike your heart rate in minutes.",
    },
    rowing_machine: {
      role: "Full-body cardio",
      reason: "Low-impact, full-body conditioning in a single fluid motion.",
    },
    pull_up_bar: {
      role: "Upper-body strength",
      reason: "Doorway bar for posture and back strength.",
    },
    squat_machine: {
      role: "Lower-body strength",
      reason: "Supported squats that protect your knees and build glutes.",
    },
    inversion_table: {
      role: "Spinal decompression",
      reason: "Eases back tension and improves circulation.",
    },
    fitness_tracker: {
      role: "Activity tracking",
      reason: "Celebrate every step, heartbeat and win — motivation that sticks.",
    },
    general_fitness: {
      role: "Wellness essential",
      reason: "A thoughtful extra for a complete home studio.",
    },
  };

  for (const cat of allowedCategories) {
    const meta = ROLE_MAP[cat] ?? { role: "Recommended", reason: "Quality-scored pick for your goals." };
    tryFill(cat, meta.role, meta.reason);
  }

  const totalCost = slots.reduce((s, slot) => s + (slot.product?.price ?? 0), 0);
  const knownPriced = slots.filter((s) => s.product?.price != null).length;
  const hasNa = slots.some((s) => s.product?.price === null);
  const withinBudget = totalCost <= budget;

  return {
    slots,
    totalCost,
    withinBudget,
    remainingBudget: Math.max(0, budget - totalCost),
    categories: Array.from(filledCategories),
    // surface that some items have N/A prices
    hasNaPrice: hasNa,
    pricedCount: knownPriced,
  };
}

/** Friendly labels for each goal. */
export const GOAL_LABELS: Record<FitnessGoal, { label: string; icon: string; blurb: string }> = {
  weight_loss: { label: "Lose weight", icon: "Flame", blurb: "Burn calories gently, consistently" },
  strength: { label: "Build strength", icon: "Dumbbell", blurb: "Muscle & bone density" },
  flexibility: { label: "Improve flexibility", icon: "Flower2", blurb: "Mobility & range of motion" },
  recovery: { label: "Recover & restore", icon: "HeartPulse", blurb: "Soothe sore muscles" },
  cardio: { label: "Cardio fitness", icon: "Footprints", blurb: "Heart health & endurance" },
};

/** Friendly labels for each room size. */
export const ROOM_LABELS: Record<RoomSize, { label: string; blurb: string; sqft: string }> = {
  closet: { label: "Small space", blurb: "A corner or closet", sqft: "~25–75 sq ft" },
  bedroom: { label: "Spare room", blurb: "A bedroom or office", sqft: "~100–150 sq ft" },
  dedicated: { label: "Dedicated room", blurb: "A full home gym room", sqft: "200+ sq ft" },
};
