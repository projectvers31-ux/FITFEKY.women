import { openApiSpec } from "@/lib/ai-content";

/**
 * GET /api/ai/openapi.json
 *
 * OpenAPI 3.0 spec describing the AI-facing API endpoints. Referenced by
 * /.well-known/ai-plugin.json so AI assistants know how to query the catalog.
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(JSON.stringify(openApiSpec(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
