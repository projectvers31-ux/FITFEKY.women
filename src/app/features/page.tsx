import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Activity,
  Scale,
  Flame,
  Moon,
  ShieldCheck,
  Search,
  Award,
  ArrowRight,
  Calculator as CalcIcon,
} from "lucide-react";
import { PageShell, PageHeading, PageP } from "@/components/layout/page-shell";
import { catalogStats } from "@/lib/product-utils";

export const metadata: Metadata = {
  title: "Features — Free Fitness Tools & Smart Product Discovery | FitFeky",
  description:
    "Discover FitFeky's free tools: Home Gym Planner, Body Fat Calculator, BMI & Calorie Burn calculators, quality-scored product catalog, buying guides and more — built for women over 40.",
  alternates: { canonical: "/features" },
  robots: { index: true, follow: true },
};

const FEATURES = [
  {
    icon: Home,
    title: "Home Gym Planner",
    description:
      "Tell us your budget, room size and fitness goals. We'll build a personalized equipment kit from our 172-product catalog — with a total cost, budget tracking, and direct Amazon links for every item.",
    href: "/#calculators",
    cta: "Plan my home gym",
    accent: "from-rose-400/15 to-amber-400/15",
  },
  {
    icon: Activity,
    title: "Body Fat Calculator",
    description:
      "Estimate your body fat percentage using the U.S. Navy circumference method — accurate within ~3% of a DEXA scan, without calipers. Includes healthy category comparison and personalized advice.",
    href: "/#calculators",
    cta: "Calculate body fat",
    accent: "from-emerald-400/15 to-teal-400/15",
  },
  {
    icon: Scale,
    title: "BMI & Healthy Weight",
    description:
      "Calculate your BMI and see the healthy weight range for your height. We explain why body composition matters more than the number after 40 — and which smart scales track it.",
    href: "/#calculators",
    cta: "Check my BMI",
    accent: "from-amber-400/15 to-orange-400/15",
  },
  {
    icon: Flame,
    title: "Calorie Burn Calculator",
    description:
      "Estimate calories burned for walking pad sessions, yoga, resistance bands, dumbbells, jump rope and more. Based on MET values, with weight and duration inputs.",
    href: "/#calculators",
    cta: "Estimate calorie burn",
    accent: "from-fuchsia-400/15 to-rose-400/15",
  },
  {
    icon: Moon,
    title: "Recovery Time Calculator",
    description:
      "Plan smart recovery. Enter your age, session intensity and sleep to get a personalized rest recommendation before training the same muscle group again.",
    href: "/#calculators",
    cta: "Plan recovery",
    accent: "from-violet-400/15 to-purple-400/15",
  },
  {
    icon: Award,
    title: "Quality-Scored Catalog",
    description:
      "Every product is rated on a transparent 0–100 quality score based on four weighted criteria. Priority A picks are our Editor's Choice — the gear we'd buy for our own mothers.",
    href: "/#catalog",
    cta: "Browse the catalog",
    accent: "from-primary/15 to-accent/15",
  },
  {
    icon: Search,
    title: "Smart Product Filtering",
    description:
      "Filter 172 products by category, priority tier, price and rating. Sort by quality score, price, rating or review volume. Search by name or keyword across the entire catalog.",
    href: "/#catalog",
    cta: "Filter products",
    accent: "from-sky-400/15 to-cyan-400/15",
  },
  {
    icon: ShieldCheck,
    title: "Buying Guides & Reviews",
    description:
      "In-depth, keyword-rich buying guides for every category. We answer the questions women over 40 actually ask — about knee pain, weight loss, flexibility and recovery.",
    href: "/#editorial",
    cta: "Read the guides",
    accent: "from-lime-400/15 to-green-400/15",
  },
];

export default function FeaturesPage() {
  const stats = catalogStats();

  return (
    <PageShell
      kicker="Everything FitFeky offers"
      title="Free tools and smart features built for women 40+"
      subtitle="From a personalized home gym planner to a body fat calculator accurate within ~3% of a DEXA scan — every tool on FitFeky is free, genuinely useful, and built for the body you have today."
    >
      {/* Stats band */}
      <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat value={stats.total} label="Products scored" />
        <Stat value="5" label="Free calculators" />
        <Stat value="15" label="Categories" />
        <Stat value="100%" label="Free, always" />
      </div>

      <PageHeading id="the-tools">The tools</PageHeading>
      <PageP>
        Every calculator runs entirely in your browser — your measurements
        and inputs are never sent to our servers. They&rsquo;re real,
        working utilities, not lead magnets.
      </PageP>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`group rounded-2xl border border-border/50 bg-gradient-to-br ${f.accent} p-6 transition-all hover:border-primary/30`}
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-primary shadow-sm">
                <f.icon size={20} />
              </span>
              <ArrowRight
                size={18}
                className="text-muted-foreground/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {f.description}
            </p>
            <Link
              href={f.href}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-1.5 transition-all"
            >
              {f.cta} <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      <PageHeading id="the-catalog">The catalog</PageHeading>
      <PageP>
        Our catalog isn&rsquo;t a random dump of Amazon products. Every one
        of the {stats.total} items has been evaluated, scored and prioritized
        using our four-criteria methodology:
      </PageP>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CriterionCard weight="30%" title="Customer ratings" body="Real reviews from women 40+" />
        <CriterionCard weight="20%" title="Review volume" body="Sustained, recent feedback" />
        <CriterionCard weight="25%" title="Build quality" body="Materials, capacity, warranty" />
        <CriterionCard weight="25%" title="Fit for 40+" body="Joint-friendly, approachable" />
      </div>
      <PageP>
        Products scoring 85+ earn our Editor&rsquo;s Choice badge. Learn more
        in our <Link href="/about">About page</Link> or the{" "}
        <Link href="/#how-we-test">How We Test</Link> section.
      </PageP>

      {/* CTA band */}
      <div className="mt-12 rounded-2xl bg-primary p-8 text-center text-primary-foreground">
        <CalcIcon className="mx-auto" size={28} />
        <h2 className="mt-3 font-display text-2xl font-semibold">
          Try every tool — free, no signup
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-primary-foreground/80">
          No paywall, no email required to use the calculators. Jump straight
          into the Home Gym Planner or Body Fat Calculator.
        </p>
        <Link
          href="/#calculators"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
        >
          Open the tools <ArrowRight size={16} />
        </Link>
      </div>
    </PageShell>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 p-4 text-center">
      <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function CriterionCard({ weight, title, body }: { weight: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 p-4">
      <p className="font-display text-xl font-semibold text-primary">{weight}</p>
      <h3 className="mt-1 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-0.5 text-xs text-muted-foreground">{body}</p>
    </div>
  );
}
