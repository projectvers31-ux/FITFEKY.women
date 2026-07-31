"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Footprints,
  Home,
  Search,
  Sparkles,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ARTICLES } from "@/lib/articles";

/**
 * Custom 404 — warm, empathetic, zero dead ends.
 * Every link on this page leads somewhere real: search goes to the catalog
 * (?search=), category tiles filter it (?category=), guides open in the
 * Wellness Journal, and the quiz is a live page. Next.js renders this file
 * automatically with a 404 status code for any unmatched route.
 */

const TOP_CATEGORIES = [
  { id: "treadmill", label: "Walking Pads", blurb: "Gentle daily steps" },
  { id: "resistance_bands", label: "Resistance Bands", blurb: "Strength that protects joints" },
  { id: "yoga_mat", label: "Yoga Mats", blurb: "Cushioned, non-slip support" },
  { id: "smart_scale", label: "Smart Scales", blurb: "Track progress, not just weight" },
] as const;

const POPULAR_GUIDES = ARTICLES.slice(0, 3);

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/?search=${encodeURIComponent(q)}` : "/#catalog");
  };

  return (
    <main className="bg-[#faf7f2] dark:bg-[#1b211c]">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-28">
        {/* Rest-day illustration — warm, minimal */}
        <div className="flex size-20 items-center justify-center rounded-full bg-[#7a9e7e]/15 text-[#7a9e7e] dark:bg-[#7a9e7e]/25 dark:text-[#a8c4ab]">
          <Footprints size={36} strokeWidth={1.5} />
        </div>

        <p className="kicker mt-6 text-[#7a9e7e] dark:text-[#a8c4ab]">
          Page not found · Error 404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
          Oops, this page took a{" "}
          <span className="text-[#7a9e7e] dark:text-[#a8c4ab]">rest day.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          The page you were looking for slipped out of our yoga class — but the
          good stuff is still right here. Search the catalog, hop into a
          category, or take our 2-minute Gear Quiz to find exactly what your
          home workout needs.
        </p>

        {/* Search — goes straight to the product catalog */}
        <form
          onSubmit={submitSearch}
          role="search"
          className="mt-8 w-full max-w-lg"
          aria-label="Search products and guides"
        >
          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “yoga mat”, “walking pad”, “resistance bands”…"
              aria-label="Search the FitFeky catalog"
              className="h-13 rounded-full border-[#7a9e7e]/30 bg-card pl-11 pr-28 text-[15px] shadow-sm dark:border-[#7a9e7e]/40"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full bg-[#7a9e7e] px-5 text-[13px] font-medium hover:bg-[#6b8f6f]"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Quick waypoints — no dead ends */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full border-[#7a9e7e]/40 text-foreground hover:bg-[#7a9e7e]/10">
            <Link href="/">
              <Home size={15} className="text-[#7a9e7e]" /> Back to Home
            </Link>
          </Button>
          <Button asChild className="rounded-full bg-[#7a9e7e] hover:bg-[#6b8f6f]">
            <Link href="/quiz">
              <Sparkles size={15} /> Take the Gear Quiz
            </Link>
          </Button>
        </div>

        {/* Top categories */}
        <section className="mt-14 w-full" aria-label="Shop top categories">
          <h2 className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Sprout size={13} className="text-[#7a9e7e]" /> Shop these first
          </h2>
          <div className="mt-5 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {TOP_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/?category=${c.id}`}
                className="group rounded-2xl border border-[#7a9e7e]/25 bg-card/80 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7a9e7e]/60 hover:bg-[#7a9e7e]/10 hover:shadow-md"
              >
                <span className="block font-display text-[15px] font-semibold leading-snug text-foreground">
                  {c.label}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{c.blurb}</span>
                <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-[#7a9e7e] opacity-0 transition-opacity group-hover:opacity-100">
                  Browse <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular guides */}
        <section className="mt-14 w-full" aria-label="Popular guides">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Popular guides
          </h2>
          <div className="mt-5 grid w-full gap-3 sm:grid-cols-3">
            {POPULAR_GUIDES.map((a) => (
              <Link
                key={a.id}
                href={`/#article-${a.slug}`}
                className="group rounded-2xl border border-border/70 bg-card/80 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7a9e7e]/50 hover:shadow-md"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[#7a9e7e]">
                  {a.category} · {a.readMinutes} min
                </span>
                <span className="mt-2 line-clamp-3 block font-display text-[15px] font-semibold leading-snug text-foreground group-hover:text-primary">
                  {a.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-12 text-sm text-muted-foreground">
          Lost track of your favorite tool?{" "}
          <Link href="/#calculators" className="font-medium text-[#7a9e7e] underline-offset-2 hover:underline">
            Free wellness calculators →
          </Link>
        </p>
      </div>
    </main>
  );
}
