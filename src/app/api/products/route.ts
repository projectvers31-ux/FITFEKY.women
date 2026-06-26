import { NextResponse } from "next/server";
import { queryProducts, catalogStats } from "@/lib/product-utils";
import { CATEGORIES } from "@/lib/categories";
import type { SortKey, Priority, CategoryId } from "@/lib/types";

/**
 * GET /api/products
 *
 * Query params:
 *   category     - CategoryId | "all"            (default "all")
 *   priority     - "A" | "B" | "C" | "all"        (default "all")
 *   sort         - SortKey                         (default "featured")
 *   search       - string                          (default "")
 *   minPrice     - number                          (optional)
 *   maxPrice     - number                          (optional)
 *   includeNa    - "true" | "false"                (default "true")
 *   limit        - number                          (optional)
 *
 * Returns: { products: Product[], total: number, stats, categories }
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = (searchParams.get("category") as CategoryId | "all" | null) ?? "all";
  const priority = (searchParams.get("priority") as Priority | "all" | null) ?? "all";
  const sort = (searchParams.get("sort") as SortKey | null) ?? "featured";
  const search = searchParams.get("search") ?? "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const includeNa = (searchParams.get("includeNa") ?? "true") !== "false";
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;

  const products = queryProducts({
    category,
    priority,
    sort,
    search,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    includeNaPrice: includeNa,
    limit,
  });

  return NextResponse.json({
    products,
    total: products.length,
    stats: catalogStats(),
    categories: CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  });
}
