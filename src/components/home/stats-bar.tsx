import { Award, HeartPulse, Users, TrendingUp } from "lucide-react";
import { catalogStats } from "@/lib/product-utils";

export function StatsBar() {
  const stats = catalogStats();
  const items = [
    {
      icon: Award,
      value: `${stats.total}`,
      label: "Quality-scored products",
      sub: "Hand-curated for women 40+",
    },
    {
      icon: HeartPulse,
      value: `${stats.avgRating}★`,
      label: "Average customer rating",
      sub: "Across thousands of reviews",
    },
    {
      icon: TrendingUp,
      value: `${stats.avgQuality}`,
      label: "Average quality score",
      sub: "Out of 100 — only the best",
    },
    {
      icon: Users,
      value: `${stats.priorityA}`,
      label: "Editor's top-tier picks",
      sub: "Priority A selections",
    },
  ];

  return (
    <section className="border-y border-border/70 bg-card/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border/60 px-4 sm:px-6 lg:grid-cols-4 lg:divide-y-0 lg:px-8">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 p-4 sm:p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <it.icon size={20} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {it.value}
              </p>
              <p className="text-xs font-semibold text-foreground/80 sm:text-sm">{it.label}</p>
              <p className="text-[11px] text-muted-foreground">{it.sub}</p>
            </div>
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
    <div className="overflow-hidden border-b border-border/60 bg-secondary/30 py-3">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
