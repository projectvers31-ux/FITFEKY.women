import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Find My Perfect Fit — Personalized Fitness Recommendations for Women 45+ | FitFeky",
  description:
    "Answer a few simple questions and receive personalized fitness and wellness gear recommendations — built for women 45–65 who want joint-friendly, sustainable movement at home.",
  robots: { index: true, follow: true },
  keywords: [
    "fitness recommendation quiz for women over 45",
    "personalized wellness plan",
    "what fitness equipment should I start with",
    "low impact home workout finder",
    "joint friendly fitness match",
  ],
  openGraph: {
    title: "Find My Perfect Fit — Personalized Fitness Recommendations | FitFeky",
    description:
      "Answer a few simple questions and get a personalized wellness plan with gear recommendations built for women 45–65.",
    url: "https://www.fitfeky.com/find-my-perfect-fit",
    type: "website",
  },
  ...pageMetadata("/find-my-perfect-fit"),
};

export default function FindMyPerfectFitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}