import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Serve appropriately-sized images for common device widths.
    // Next.js generates variants at each of these widths and the browser
    // picks the smallest that fits the viewport via srcset.
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Longer cache TTL for optimized images (less reprocessing).
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Allow dangerouslyAllowSVG for our logo if needed (default false is safe)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Compress responses
  compress: true,
  // Experimental: optimize package imports for smaller bundles
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
