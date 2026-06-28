import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Script from "next/script";
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
  display: "optional",
  preload: true,
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
        {/* Preload hero LCP image */}
        <link rel="preload" as="image" href="/hero-editorial.png" fetchPriority="high" />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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

        {/* AI crawler directives */}
        <meta name="gptbot" content="index, follow" />
        <meta name="ccbot" content="index, follow" />
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

        {/* Theme initialization — injected into <head> as raw HTML by Next.js (beforeInteractive) */}
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `!function(){try{var e=localStorage.getItem("theme")||"light";"system"===e&&(e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(e);document.documentElement.style.colorScheme=e}catch(e){}}()` }} />
      </body>
    </html>
  );
}
