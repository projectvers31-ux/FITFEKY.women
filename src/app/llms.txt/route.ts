import { llmsTxt } from "@/lib/ai-content";

/**
 * GET /llms.txt
 *
 * The llms.txt convention (https://llmstxt.org) is the AI equivalent of
 * robots.txt. Major LLM crawlers (GPTBot, ClaudeBot, PerplexityBot) read
 * this to understand what the site is about and how to cite it.
 *
 * Served as text/plain so it's indexable verbatim.
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
