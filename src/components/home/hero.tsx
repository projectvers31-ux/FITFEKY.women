import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Star, Users, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogStats } from "@/lib/product-utils";

export function Hero() {
  const stats = catalogStats();

  return (
    <section
      id="top"
      aria-label="FitFeky — premium at-home fitness gear for women over 40"
      className="relative overflow-hidden bg-wellness-glow"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.6),transparent_60%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Copy — takes 7 of 12 cols for stronger hierarchy */}
        <div className="relative z-10 lg:col-span-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles size={13} />
            The #1 reviewed gear guide for women 40 · 50 · 60+
          </span>

          <h1 className="mt-5 font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            The best{" "}
            <span className="bg-gradient-to-r from-primary via-rose-500 to-accent bg-clip-text text-transparent">
              at-home fitness gear
            </span>{" "}
            for women over 40
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We quality-score every walking pad, resistance band, yoga mat and
            recovery tool so you skip the overwhelm. Joint-friendly, low-impact
            equipment that fits your life — and your living room. Reviewed by
            women, for women.
          </p>

          {/* Strong dual CTA */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group gap-2 px-7 py-6 text-base font-bold shadow-lg shadow-primary/20">
              <Link href="#featured">
                Shop Editor's Top Picks
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-border bg-background/60 px-6 py-6 text-base font-semibold backdrop-blur">
              <Link href="#calculators">
                <PlayCircle size={18} />
                Try a Free Calculator
              </Link>
            </Button>
          </div>

          {/* Inline trust row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck size={16} className="text-accent" />
              <span className="font-semibold text-foreground">{stats.total}</span> products tested
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{stats.avgRating}★</span> avg rating
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Users size={16} className="text-accent" />
              <span className="font-semibold text-foreground">50,000+</span> women served
            </span>
          </div>
        </div>

        {/* Visual — takes 5 of 12 cols */}
        <div className="relative z-10 lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Main image card */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-2xl">
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-secondary to-muted">
                <Image
                  src="/hero-lifestyle.png"
                  alt="Woman in her late forties practicing a gentle yoga stretch at home with premium fitness gear"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
            </div>

            {/* Floating quality card */}
            <div className="animate-floaty absolute -left-3 top-10 hidden rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center gap-2">
                <div className="quality-ring grid h-11 w-11 place-items-center rounded-full" style={{ ["--score" as string]: 95 }}>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-card text-xs font-bold">95</div>
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Quality</p>
                  <p className="text-xs font-bold text-primary">Editor's Choice</p>
                </div>
              </div>
            </div>

            {/* Floating social-proof card */}
            <div className="animate-floaty absolute -bottom-4 -right-2 hidden rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur sm:block" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  {["from-rose-400 to-pink-500", "from-emerald-400 to-teal-500", "from-amber-400 to-orange-500"].map((g, i) => (
                    <span key={i} className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${g} text-[10px] font-bold text-white ring-2 ring-card`}>
                      {["M", "L", "P"][i]}
                    </span>
                  ))}
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">12,400+ happy women</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
