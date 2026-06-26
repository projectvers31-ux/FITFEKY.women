import { catalogStats } from "@/lib/product-utils";

const BADGES = [
  { value: "172", label: "Products vetted", sub: "Quality-scored" },
  { value: "4.7★", label: "Average rating", sub: "100,000+ reviews" },
  { value: "65", label: "Editor's top picks", sub: "Priority A tier" },
  { value: "0", label: "Paid placements", sub: "Independently reviewed" },
];

/** Refined editorial trust strip — sits directly under the hero. */
export function TrustBadgesBar() {
  return (
    <section aria-label="Why women trust FitFeky" className="bg-card/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:px-8 lg:grid-cols-4 lg:px-12">
        {BADGES.map((b, i) => (
          <div
            key={b.label}
            className={`flex flex-col gap-0.5 py-6 ${
              i !== 0 ? "lg:border-l lg:border-border/50 lg:pl-8" : ""
            }`}
          >
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {b.value}
            </p>
            <p className="text-sm font-medium text-foreground/80">{b.label}</p>
            <p className="text-xs text-muted-foreground">{b.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
