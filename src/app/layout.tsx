import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { homeMetadata, organizationJsonLd, websiteJsonLd, jsonLdScript } from "@/lib/seo";
import { ExitIntentPopup } from "@/components/shared/exit-intent-popup";
import { MetaPixelPageView } from "@/components/shared/meta-pixel-pageview";

/**
 * Meta Pixel ID — set NEXT_PUBLIC_META_PIXEL_ID in .env.local / Vercel.
 * When unset the pixel scripts are rendered but disabled (never initialized),
 * so Meta never receives an invalid "YOUR_PIXEL_ID" / null init call.
 */
const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();
const metaPixelConfigured = META_PIXEL_ID !== "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "optional",
  preload: true,
});

export const metadataBase = new URL("https://www.fitfeky.com");

/**
 * Sitewide metadata, generated dynamically so the canonical and en-us
 * hreflang are always emitted in the <head> of every route. Child pages
 * spread `pageMetadata(path)` from lib/seo to self-reference their own
 * canonical; the "/" defaults here only apply where a page doesn't.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    ...homeMetadata,
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: "https://www.fitfeky.com/",
      languages: { "en-us": "https://www.fitfeky.com/" },
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
}

export const viewport: Viewport = {
  themeColor: "#7a9e7e",
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
        {/* Hero LCP image is preloaded by the hero's next/image priority prop — no duplicate here. */}
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

        {/* Favicons — /logo.svg for sharp rendering at any size,
            favicon.ico for legacy browsers, android-chrome for Android PWA
            home screens, apple-touch-icon for iOS home screen */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect + DNS-prefetch for external assets. No crossorigin on the
            Amazon preconnect: plain <img> loads are no-cors, so a CORS-mode
            preconnect would never be reused by the browser. */}
        <link rel="preconnect" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* AI crawler directives */}
        <meta name="gptbot" content="index, follow" />
        <meta name="ccbot" content="index, follow" />

        {/* Pinterest site verification */}
        <meta name="pinterest-site-verification" content="81b1dc0d56bdc58a9041f5c5cb56097e" />

        {/* Google Search Console site verification */}
        <meta name="google-site-verification" content="QLvmAoX4FSm-FQifh4tAeUyjvNC170AbtkdCxfaw5mw" />
      </head>
      <body
        className={`${geistSans.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />
        <ExitIntentPopup />
        {/* Meta Pixel — PageView on client-side route changes (Suspense keeps static prerendering working) */}
        <Suspense fallback={null}>
          <MetaPixelPageView />
        </Suspense>

        {/* Meta Pixel (Facebook) — lazy-loaded; early events are buffered and
            replayed by lib/meta-pixel.ts once window.fbq exists. Only loads
            when NEXT_PUBLIC_META_PIXEL_ID is configured. */}
        {metaPixelConfigured && (
          <Script
            id="meta-pixel"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        )}
        {metaPixelConfigured && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        {/* Theme initialization — injected into <head> as raw HTML by Next.js (beforeInteractive) */}
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `!function(){try{var e=localStorage.getItem("theme")||"light";"system"===e&&(e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.remove("light","dark");document.documentElement.classList.add(e);document.documentElement.style.colorScheme=e}catch(e){}}()` }} />
      </body>
    </html>
  );
}
