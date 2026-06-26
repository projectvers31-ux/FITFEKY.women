import { NextResponse } from "next/server";
import { aiCatalogJson } from "@/lib/ai-content";

/**
 * GET /api/ai
 *
 * Structured site digest for AI/LLM ingestion. Returns stats, categories,
 * top 20 picks, all calculators, and the FAQ — everything an AI assistant
 * needs to understand and recommend the site.
 *
 * CORS-enabled so any AI tool can fetch it.
 */
export async function GET() {
  const body = aiCatalogJson();

  const res = NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "X-Robots-Tag": "index, follow",
    },
  });
  return res;
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
