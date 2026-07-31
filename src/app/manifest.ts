import type { MetadataRoute } from "next";

/**
 * Web App Manifest — enables installability (PWA) and provides rich metadata
 * to browsers and AI tools about the app's identity.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FitFeky — Premium At-Home Fitness Gear for Women Over 45",
    short_name: "FitFeky",
    description:
      "Quality-scored walking pads, resistance bands, yoga mats, smart scales & recovery tools for women 45+. Expert reviews, free calculators, real ratings.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#7a9e7e",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en-US",
    categories: ["health", "fitness", "shopping", "lifestyle"],
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Shop all gear",
        short_name: "Shop",
        url: "/#catalog",
        description: "Browse the full quality-scored product catalog",
      },
      {
        name: "Home Gym Planner",
        short_name: "Planner",
        url: "/#calculators",
        description: "Get a personalized equipment kit from your budget and goals",
      },
      {
        name: "Body Fat Calculator",
        short_name: "Body Fat",
        url: "/#calculators",
        description: "Estimate your body fat percentage (U.S. Navy method)",
      },
      {
        name: "Wellness Journal",
        short_name: "Journal",
        url: "/#editorial",
        description: "Expert buying guides and fitness advice for women 45+",
      },
    ],
  };
}
