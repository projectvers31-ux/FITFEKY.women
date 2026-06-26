import type { MetadataRoute } from "next";

/**
 * robots.txt — explicitly allows major AI/LLM crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended, CCBot, Amazonbot) in addition to standard
 * search engines. Points to the sitemap and llms.txt for AI discovery.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly allow OpenAI's GPTBot
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow Anthropic's ClaudeBot
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow Claude-Web
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow PerplexityBot
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Google's AI training crawler
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      // Common Crawl (used by many open-source LLMs)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Amazon's crawler (feeds Alexa, Amazon product AI)
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Meta's crawler
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: ["/api/"],
      },
      // Apple's AI crawler
      {
        userAgent: "AppleBot-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      // Default rule for everyone else
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://fitfeky.com/sitemap.xml",
    host: "https://fitfeky.com",
  };
}
