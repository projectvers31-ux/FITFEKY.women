import { llmsFullTxt } from "@/lib/ai-content";

/**
 * GET /llms-full.txt
 *
 * The complete catalog export for deep AI ingestion — every product, every
 * calculator, every FAQ. LLMs can retrieve this to answer specific product
 * questions with accurate quality scores, prices and affiliate URLs.
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
