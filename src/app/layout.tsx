import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { homeMetadata, organizationJsonLd, websiteJsonLd, jsonLdScript } from "@/lib/seo";

/** Google Analytics 4 measurement ID. */
export const GA_MEASUREMENT_ID = "G-94FHK4LBMY";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...homeMetadata,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  // Extra meta tags for AI/social discovery
  other: {
    "ai-content-disclosure":
      "FitFeky content is editorially curated. Product data is factual (prices, ratings, ASINs) and updated regularly.",
    "content-language": "en-US",
    "geo.region": "US",
    "geo.placename": "United States",
    "distribution": "global",
    "rating": "general",
    "revisit-after": "3 days",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#2a2420" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Organization + WebSite structured data (sitewide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd()) }}
        />

        {/* AI discovery links — help LLM crawlers find our content */}
        <link rel="llms-txt" href="/llms.txt" type="text/plain" title="LLMs.txt — AI site summary" />
        <link rel="llms-full-txt" href="/llms-full.txt" type="text/plain" title="Full catalog for AI ingestion" />

        {/* OpenSearch — lets browsers register us as a search provider */}
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          href="/opensearch.xml"
          title="FitFeky"
        />

        {/* PWA / manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Content authentication (optional, for AI provenance) */}
        <link rel="contents" href="/llms-full.txt" type="text/plain" />

        {/* Prefetch key AI endpoints for faster assistant responses */}
        <link rel="preconnect" href="https://fitfeky.com" />

        {/* Extra SEO + AI meta tags */}
        <meta name="content-language" content="en-US" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta name="ai-content-disclosure" content="FitFeky content is editorially curated. Product data is factual (prices, ratings, ASINs) and updated regularly." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, noarchive" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        {/* AI crawler directives */}
        <meta name="gptbot" content="index, follow" />
        <meta name="ccbot" content="index, follow" />
        {/* Author + publisher for E-E-A-T signals */}
        <meta name="author" content="FitFeky Editorial Team" />
        <meta name="publisher" content="FitFeky" />
        <meta name="rights" content="© 2026 FitFeky. All rights reserved." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />

        {/* Google Analytics 4 — async, privacy-friendly, Googlebot-aware */}
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
