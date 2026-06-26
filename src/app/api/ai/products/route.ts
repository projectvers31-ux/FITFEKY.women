import { NextResponse } from "next/server";
import { aiProductsJson } from "@/lib/ai-content";
import { products } from "@/lib/product-data";
import type { CategoryId, Priority } from "@/lib/types";

/**
 * GET /api/ai/products
 *
 * Full structured product catalog for AI ingestion. Supports optional filters
 * so an AI assistant can retrieve a targeted subset (e.g. "all Priority A
 * walking pads under $300").
 *
 * Query params: category, priority, limit, editorsChoice (bool)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as CategoryId | null;
  const priority = searchParams.get("priority") as Priority | null;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;
  const editorsChoice = searchParams.get("editorsChoice") === "true";

  let list = [...products];

  if (category) list = list.filter((p) => p.category === category);
  if (priority) list = list.filter((p) => p.priority === priority);
  if (editorsChoice) list = list.filter((p) => p.qualityScore >= 90);

  // Sort by priority then quality (best first)
  list.sort((a, b) => {
    const pr = (a.priority === "A" ? 0 : a.priority === "B" ? 1 : 2) - (b.priority === "A" ? 0 : b.priority === "B" ? 1 : 2);
    if (pr !== 0) return pr;
    return b.qualityScore - a.qualityScore;
  });

  if (limit && limit > 0) list = list.slice(0, limit);

  const body = {
    ...aiProductsJson(),
    count: list.length,
    filtered: category != null || priority != null || editorsChoice,
    products: list.map((p) => ({
      id: p.id,
      asin: p.asin,
      title: p.title,
      category: p.category,
      categoryLabel: p.category,
      price: p.price,
      priceDisplay: p.priceDisplay,
      rating: p.rating,
      reviews: p.reviews,
      priority: p.priority,
      qualityScore: p.qualityScore,
      editorsChoice: p.qualityScore >= 90,
      mainKeyword: p.mainKeyword,
      secondaryKeywords: p.secondaryKeywords,
      longTailKeywords: p.longTailKeywords,
      suggestedCalculator: p.suggestedCalculator,
      affiliateUrl: p.affiliateUrl,
      image: p.image,
    })),
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "X-Robots-Tag": "index, follow",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
