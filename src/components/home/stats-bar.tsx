import { catalogStats } from "@/lib/product-utils";

const STATS = [
  { value: "172", label: "Products vetted", sub: "Quality-scored" },
  { value: "4.7★", label: "Average rating", sub: "100,000+ reviews" },
  { value: "50K+", label: "Women served", sub: "Since 2024" },
  { value: "0", label: "Paid placements", sub: "Ever — we promise" },
];

/** Refined editorial stats bar — generous spacing, no heavy dividers. */
export function StatsBar() {
  return (
    <section className="border-y border-border/50 bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:px-8 lg:grid-cols-4 lg:px-12">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-1 py-7 ${
              i !== 0 ? "lg:border-l lg:border-border/50 lg:pl-8" : ""
            } ${i === 2 ? "lg:pl-8" : ""}`}
          >
            <p className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {s.value}
            </p>
            <p className="text-sm font-medium text-foreground/80">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const MARQUEE = [
  "Low-impact cardio",
  "Joint-friendly strength",
  "Walking pad workouts",
  "Gentle yoga flows",
  "Smart body composition",
  "Recovery & mobility",
  "Resistance band toning",
  "Flexibility at every age",
];

export function TrustMarquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden border-b border-border/50 py-4">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-medium tracking-wide text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary/50" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
