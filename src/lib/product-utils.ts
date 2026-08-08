import type { Product, ProductQuery, SortKey, CategoryId, Priority } from "./types";
import { products } from "./product-data";

export { products };

/** All category ids present in the catalog (sorted by CATEGORIES order). */
export function allCategories(): CategoryId[] {
  const seen = new Set<CategoryId>();
  for (const p of products) seen.add(p.category);
  return Array.from(seen);
}

/**
 * SEO alt-text phrases per category — keyword-rich, joint-friendly language
 * for women 45+ (e.g. "Quiet joint-friendly walking pad for women over 45").
 */
const ALT_PHRASES: Record<string, string> = {
  treadmill: "quiet joint-friendly walking pad for women over 45",
  walking_pad: "quiet joint-friendly walking pad for women over 45",
  recovery_tools: "recovery tools for joint-friendly muscle care after 45",
  resistance_bands: "ergonomic resistance bands for joint-safe strength training at home",
  yoga_mat: "cushioned yoga mat for joint support during low-impact home workouts",
  yoga_accessories: "yoga accessories for gentle, joint-friendly stretching at home",
  foam_roller: "foam roller for mobility and joint-friendly recovery after workouts",
  massage_gun: "massage gun for muscle recovery after joint-friendly workouts",
  smart_scale: "smart body composition scale for tracking fitness progress after 45",
  dumbbell: "adjustable dumbbells for building bone density after 45",
  rowing_machine: "low-impact rowing machine for knee-friendly full-body cardio",
  jump_rope: "low-impact jump rope for joint-friendly cardio at home",
  pull_up_bar: "doorway pull-up bar for posture and upper-body strength after 45",
  squat_machine: "squat machine with knee support for joint-safe strength training",
  inversion_table: "inversion table for back pain relief and spinal decompression",
  fitness_tracker: "fitness tracker for women over 45 monitoring steps and heart health",
  general_fitness: "joint-friendly home gym essentials for women over 45",
  shaker_bottle: "post-workout shaker bottle for protein after 45",
};

/** Generic fallback for categories without a dedicated phrase. */
const FALLBACK_ALT = "joint-friendly home fitness gear for women over 45";

/**
 * Builds a keyword-rich image alt for a product: a short title clause plus a
 * category-specific joint-friendly phrase. Works with both `Product` and
 * `ComparisonProduct` shapes.
 */
export function productImageAlt(p: { title?: string; name?: string; category: string }): string {
  const phrase = ALT_PHRASES[p.category] ?? FALLBACK_ALT;
  const title = (p.title ?? p.name ?? "").trim();
  if (!title) return phrase;
  const short = title.split(/[,\-–—;|]| at /i)[0].trim().slice(0, 80).trim();
  return short ? `${short} — ${phrase}` : phrase;
}

/** Apply the catalog query (filter + sort + slice). Pure & shared. */
export function queryProducts(q: ProductQuery = {}): Product[] {
  const {
    category = "all",
    priority = "all",
    sort = "featured",
    search = "",
    minPrice,
    maxPrice,
    includeNaPrice = true,
    limit,
  } = q;

  const term = search.trim().toLowerCase();

  let list = products.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (priority !== "all" && p.priority !== priority) return false;
    if (term) {
      const haystack = [
        p.title,
        p.mainKeyword,
        p.secondaryKeywords.join(" "),
        p.longTailKeywords.join(" "),
        p.category,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    if (p.price === null) {
      if (!includeNaPrice) return false;
    } else {
      if (minPrice != null && p.price < minPrice) return false;
      if (maxPrice != null && p.price > maxPrice) return false;
    }
    return true;
  });

  list = sortProducts(list, sort);

  if (limit != null && limit > 0) list = list.slice(0, limit);
  return list;
}

const PRIORITY_RANK: Record<Priority, number> = { A: 0, B: 1, C: 2 };

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const arr = [...list];
  switch (sort) {
    case "quality":
      arr.sort((a, b) => b.qualityScore - a.qualityScore);
      break;
    case "price-low":
      // N/A prices sort to the end
      arr.sort((a, b) => priceCompare(a.price, b.price));
      break;
    case "price-high":
      arr.sort((a, b) => priceCompare(b.price, a.price));
      break;
    case "rating":
      arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "reviews":
      arr.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
      break;
    case "featured":
    default:
      arr.sort((a, b) => {
        const pr = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
        if (pr !== 0) return pr;
        return b.qualityScore - a.qualityScore;
      });
      break;
  }
  return arr;
}

function priceCompare(a: number | null, b: number | null): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return a - b;
}

/** Top hero picks: Priority A with the highest quality scores. */
export function featuredPicks(limit = 8): Product[] {
  return queryProducts({ priority: "A", sort: "quality", limit });
}

/** Best picks within a category. */
export function topInCategory(category: CategoryId, limit = 4): Product[] {
  return queryProducts({ category, sort: "featured", limit });
}

/** Products that recommend a given calculator id. */
export function productsForCalculator(calculatorId: string, limit = 4): Product[] {
  return products
    .filter((p) => p.suggestedCalculator === calculatorId)
    .sort((a, b) => b.qualityScore - a.qualityScore)
    .slice(0, limit);
}

/** Aggregate stats for the trust bar. */
export function catalogStats() {
  const total = products.length;
  const avgRating =
    products.reduce((s, p) => s + (p.rating ?? 0), 0) /
    Math.max(1, products.filter((p) => p.rating != null).length);
  const totalReviews = products.reduce((s, p) => s + (p.reviews ?? 0), 0);
  const priorityA = products.filter((p) => p.priority === "A").length;
  const avgQuality =
    products.reduce((s, p) => s + p.qualityScore, 0) / Math.max(1, total);
  return {
    total,
    avgRating: Math.round(avgRating * 10) / 10,
    totalReviews,
    priorityA,
    avgQuality: Math.round(avgQuality),
    categories: new Set(products.map((p) => p.category)).size,
  };
}

/** Find a single product by id (ASIN). */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.asin === id);
}

/** Related products in the same category (excluding self). */
export function relatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => b.qualityScore - a.qualityScore)
    .slice(0, limit);
}
