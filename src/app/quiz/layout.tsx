import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Personalized Gear Quiz — 2-Minute Fitness Match | FitFeky",
  description:
    "Answer 5 gentle questions and get a personalized at-home fitness gear recommendation for women over 45 — walking pads, bands, mats or scales.",
  robots: { index: true, follow: true },
  keywords: [
    "fitness gear quiz for women over 45",
    "what fitness equipment should I buy",
    "walking pad or resistance bands",
    "home workout equipment finder",
  ],
  openGraph: {
    title: "Personalized Gear Quiz — 2-Minute Fitness Match | FitFeky",
    description:
      "Answer 5 gentle questions and get a personalized at-home fitness gear recommendation for women over 45.",
    url: "https://www.fitfeky.com/quiz",
    type: "website",
  },
  ...pageMetadata("/quiz"),
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
