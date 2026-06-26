import { aiPluginManifest } from "@/lib/ai-content";

/**
 * GET /.well-known/ai-plugin.json
 *
 * OpenAI's plugin discovery convention. Allows ChatGPT and compatible AI
 * assistants to discover and use the FitFeky API for product recommendations.
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(JSON.stringify(aiPluginManifest(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
