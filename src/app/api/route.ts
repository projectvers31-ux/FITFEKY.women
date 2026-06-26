import { NextResponse } from "next/server";
import { catalogStats } from "@/lib/product-utils";

/** GET /api — health check + catalog summary. */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "FitFeky Affiliate Platform",
    stats: catalogStats(),
    endpoints: {
      products: "/api/products",
    },
  });
}
