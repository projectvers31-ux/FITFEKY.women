/**
 * Sample data for the product comparison table.
 *
 * Replace the COMPARISON_PRODUCTS array below with your real catalog rows
 * (or load them from data/products.json). Keep the same shape.
 */

export type ComparisonCategoryId =
  | "walking_pad"
  | "resistance_bands"
  | "yoga_mat"
  | "smart_scale"
  | "recovery_tools";

export type ComparisonBadge = "editor" | "top_pick";

export interface ComparisonProduct {
  id: string;
  name: string;
  category: ComparisonCategoryId;
  /** Numeric price in USD, or null for "N/A". */
  price: number | null;
  /** Pre-formatted price string (e.g. "$129.99"), or null. */
  priceDisplay: string | null;
  /** Editorial quality score 0-100. */
  qualityScore: number;
  /** Joint-friendly rating 1-5 (5 = gentlest on joints). */
  jointFriendly: 1 | 2 | 3 | 4 | 5;
  /** Short description of who this product is for. */
  bestFor: string;
  /** Number of customer reviews. */
  reviews: number;
  /** Product image URL (lazy-loaded via next/image). */
  image: string;
  /** Amazon affiliate URL (must contain your tracking tag). */
  affiliateUrl: string;
  /** Optional merchandising badge. */
  badge?: ComparisonBadge;
}

export const COMPARISON_CATEGORIES: {
  id: ComparisonCategoryId | "all";
  label: string;
}[] = [
  { id: "all", label: "All Categories" },
  { id: "walking_pad", label: "Walking Pads & Treadmills" },
  { id: "resistance_bands", label: "Ergonomic Resistance Bands" },
  { id: "yoga_mat", label: "Cushioned Yoga & Joint Support" },
  { id: "smart_scale", label: "Smart Scales" },
  { id: "recovery_tools", label: "Recovery Tools" },
];

export const PRICE_RANGES: {
  id: "all" | "under50" | "50-100" | "100-200" | "200+";
  label: string;
}[] = [
  { id: "all", label: "All Prices" },
  { id: "under50", label: "Under $50" },
  { id: "50-100", label: "$50–$100" },
  { id: "100-200", label: "$100–$200" },
  { id: "200+", label: "$200+" },
];

export const JOINT_FRIENDLY_LEVELS: {
  id: "all" | "gentle" | "moderate" | "intense";
  label: string;
}[] = [
  { id: "all", label: "All Joint-Friendly" },
  { id: "gentle", label: "Gentle" },
  { id: "moderate", label: "Moderate" },
  { id: "intense", label: "Intense" },
];

export function categoryLabel(id: ComparisonCategoryId): string {
  switch (id) {
    case "walking_pad":
      return "Walking Pads & Treadmills";
    case "resistance_bands":
      return "Ergonomic Resistance Bands";
    case "yoga_mat":
      return "Cushioned Yoga & Joint Support";
    case "smart_scale":
      return "Smart Scales";
    case "recovery_tools":
      return "Recovery Tools";
  }
}

export function jointFriendlyLabel(rating: number): string {
  if (rating >= 4) return "Gentle";
  if (rating === 3) return "Moderate";
  return "Intense";
}

export const COMPARISON_PRODUCTS: ComparisonProduct[] = [
  {
    id: "walking-pad-premium",
    name: "SuperFit Folding Walking Pad",
    category: "walking_pad",
    price: 299.99,
    priceDisplay: "$299.99",
    qualityScore: 94,
    jointFriendly: 5,
    bestFor: "Low-impact daily steps & knee recovery",
    reviews: 8421,
    image: "https://placehold.co/400x400/fdf8f3/b5654a?text=Walking+Pad",
    affiliateUrl: "https://www.amazon.com/dp/B0B9XX0001?tag=fitfeky-20",
    badge: "editor",
  },
  {
    id: "walking-pad-budget",
    name: "Goplus 2-in-1 Under Desk Treadmill",
    category: "walking_pad",
    price: 99.99,
    priceDisplay: "$99.99",
    qualityScore: 82,
    jointFriendly: 4,
    bestFor: "Desk walking while you work",
    reviews: 3205,
    image: "https://placehold.co/400x400/fdf8f3/b5654a?text=Desk+Treadmill",
    affiliateUrl: "https://www.amazon.com/dp/B0B9XX0002?tag=fitfeky-20",
  },
  {
    id: "resistance-bands-set",
    name: "FitSimplify Pro Loop Bands Set",
    category: "resistance_bands",
    price: 24.99,
    priceDisplay: "$24.99",
    qualityScore: 88,
    jointFriendly: 5,
    bestFor: "Gentle full-body strength at home",
    reviews: 15670,
    image: "https://placehold.co/400x400/fdf8f3/6f8265?text=Bands",
    affiliateUrl: "https://www.amazon.com/dp/B0B9XX0003?tag=fitfeky-20",
    badge: "top_pick",
  },
  {
    id: "yoga-mat-liforme",
    name: "Liforme Yoga Mat",
    category: "yoga_mat",
    price: 129.99,
    priceDisplay: "$129.99",
    qualityScore: 91,
    jointFriendly: 4,
    bestFor: "Joint cushioning for floor workouts",
    reviews: 3400,
    image: "https://placehold.co/400x400/fdf8f3/6f8265?text=Yoga+Mat",
    affiliateUrl: "https://www.amazon.com/dp/B0B9XX0004?tag=fitfeky-20",
  },
  {
    id: "smart-scale-etekcity",
    name: "Etekcity Smart Body Scale",
    category: "smart_scale",
    price: 39.99,
    priceDisplay: "$39.99",
    qualityScore: 85,
    jointFriendly: 3,
    bestFor: "Tracking progress without joint strain",
    reviews: 145000,
    image: "https://placehold.co/400x400/fdf8f3/6f8265?text=Smart+Scale",
    affiliateUrl: "https://www.amazon.com/dp/B0B9XX0005?tag=fitfeky-20",
  },
  {
    id: "recovery-massage-gun",
    name: "Theragun Mini 2 Massage Gun",
    category: "recovery_tools",
    price: 149.99,
    priceDisplay: "$149.99",
    qualityScore: 89,
    jointFriendly: 4,
    bestFor: "Soothing sore muscles after workouts",
    reviews: 5400,
    image: "https://placehold.co/400x400/fdf8f3/b5654a?text=Massage+Gun",
    affiliateUrl: "https://www.amazon.com/dp/B0B9XX0006?tag=fitfeky-20",
  },
];
