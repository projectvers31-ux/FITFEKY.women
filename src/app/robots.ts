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
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly allow Anthropic's ClaudeBot
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly allow Claude-Web
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly allow PerplexityBot
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Google's AI training crawler
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Common Crawl (used by many open-source LLMs)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Amazon's crawler (feeds Alexa, Amazon product AI)
      {
        userAgent: "Amazonbot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Meta's crawler
      {
        userAgent: "meta-externalagent",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Apple's AI crawler
      {
        userAgent: "AppleBot-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Default rule for everyone else
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://www.fitfeky.com/sitemap.xml",
    host: "https://www.fitfeky.com",
  };
}
