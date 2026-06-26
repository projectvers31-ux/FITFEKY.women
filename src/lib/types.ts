/**
 * Core domain types for the FitFeky affiliate platform.
 */

/** Affiliate priority tier used for merchandising (A = hero picks). */
export type Priority = "A" | "B" | "C";

/** One of the 15 curated equipment categories. */
export type CategoryId =
  | "resistance_bands"
  | "yoga_accessories"
  | "smart_scale"
  | "general_fitness"
  | "foam_roller"
  | "massage_gun"
  | "treadmill"
  | "dumbbell"
  | "rowing_machine"
  | "pull_up_bar"
  | "jump_rope"
  | "squat_machine"
  | "yoga_mat"
  | "inversion_table"
  | "fitness_tracker";

/** Canonical product record ingested from the curated catalog. */
export interface Product {
  /** Stable id (equals ASIN). Used for routing / detail lookup. */
  id: string;
  /** Amazon Standard Identification Number. */
  asin: string;
  /** Full product title. */
  title: string;
  /** Equipment category slug. */
  category: CategoryId;
  /** Numeric price in USD, or null when unavailable ("N/A"). */
  price: number | null;
  /** Pre-formatted price string (e.g. "$44.99"), or null. */
  priceDisplay: string | null;
  /** Star rating 0-5, or null. */
  rating: number | null;
  /** Number of customer reviews, or null. */
  reviews: number | null;
  /** Product image URL (Amazon CDN). */
  image: string;
  /** External affiliate URL (already contains the tracking tag). */
  affiliateUrl: string;
  /** Merchandising priority tier. */
  priority: Priority;
  /** Editorial quality score 0-100. */
  qualityScore: number;
  /** Primary SEO keyword. */
  mainKeyword: string;
  /** Supporting keywords. */
  secondaryKeywords: string[];
  /** Long-tail search keywords. */
  longTailKeywords: string[];
  /** Recommended interactive calculator for this product type. */
  suggestedCalculator: string | null;
}

/** Sort options exposed by the catalog / API. */
export type SortKey =
  | "featured" // priority A first, then quality score
  | "quality" // quality score desc
  | "price-low"
  | "price-high"
  | "rating" // rating desc
  | "reviews"; // review count desc

/** Query params accepted by /api/products. */
export interface ProductQuery {
  category?: CategoryId | "all";
  priority?: Priority | "all";
  sort?: SortKey;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  /** Include products with no price (N/A). Defaults to true. */
  includeNaPrice?: boolean;
  limit?: number;
}

/** Metadata describing a category for display + SEO. */
export interface CategoryMeta {
  id: CategoryId;
  /** Human label, e.g. "Resistance Bands". */
  label: string;
  /** Short empathetic description for women 40+. */
  blurb: string;
  /** Lucide icon name (resolved on the client). */
  icon: string;
  /** Tailwind gradient classes for the category tile. */
  accent: string;
}

/** Metadata describing a calculator. */
export interface CalculatorMeta {
  id: string;
  label: string;
  description: string;
  icon: string;
  /** Categories this calculator is most relevant to. */
  categories: CategoryId[];
}
