import type { MetadataRoute } from "next";

/**
 * Web App Manifest — enables installability (PWA) and provides rich metadata
 * to browsers and AI tools about the app's identity.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FitFeky — Premium At-Home Fitness Gear for Women Over 40",
    short_name: "FitFeky",
    description:
      "Quality-scored walking pads, resistance bands, yoga mats, smart scales & recovery tools for women 40+. Expert reviews, free calculators, real ratings.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f4ee",
    theme_color: "#b85c3a",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en-US",
    categories: ["health", "fitness", "shopping", "lifestyle"],
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
        purpose: "any",
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
        description: "Expert buying guides and fitness advice for women 40+",
      },
    ],
  };
}
