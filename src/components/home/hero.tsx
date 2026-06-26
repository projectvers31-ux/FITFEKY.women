import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogStats } from "@/lib/product-utils";

export function Hero() {
  const stats = catalogStats();

  return (
    <section id="top" className="relative overflow-hidden bg-wellness-glow">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles size={13} />
            Curated for women 40 · 50 · 60+
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Move with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              strength & grace
            </span>{" "}
            — at home.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            We quality-score every walking pad, resistance band, yoga mat and
            recovery tool so you can skip the overwhelm. Joint-friendly,
            low-impact gear that fits your life — and your living room.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group gap-2 font-semibold shadow-md">
              <Link href="#featured">
                Shop Editor's Picks
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-border bg-background/60 font-semibold">
              <Link href="#calculators">Try a Free Calculator</Link>
            </Button>
          </div>

          {/* Inline trust row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck size={16} className="text-accent" />
              {stats.total} products quality-scored
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              {stats.avgRating} avg rating
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck size={16} className="text-accent" />
              {stats.priorityA} top-tier picks
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative z-10">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Main image card */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-2xl">
              <div className="aspect-[4/5] w-full bg-gradient-to-br from-secondary to-muted sm:aspect-[5/5]">
                <img
                  src="/hero-lifestyle.png"
                  alt="A woman in her late forties practicing a gentle yoga stretch at home in soft morning light"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
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

            {/* Floating stats card */}
            <div className="animate-floaty absolute -bottom-4 -right-2 hidden rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur sm:block" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
                  <Star size={16} className="fill-accent" />
                </span>
                <div className="leading-tight">
                  <p className="text-base font-bold text-foreground">{stats.avgRating}★</p>
                  <p className="text-[10px] text-muted-foreground">avg across {stats.totalReviews.toLocaleString()} reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
