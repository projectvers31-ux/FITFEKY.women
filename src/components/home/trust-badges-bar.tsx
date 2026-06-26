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
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-8 lg:grid-cols-4 lg:px-12">
        {BADGES.map((b, i) => (
          <div
            key={b.label}
            className={`flex flex-col gap-0.5 py-5 sm:py-6 ${
              i % 2 === 1 ? "border-l border-border/50 pl-4 sm:pl-8" : ""
            } ${i >= 2 ? "border-t border-border/50 pt-5 sm:border-t-0 sm:pt-6" : ""}`}
          >
            <p className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {b.value}
            </p>
            <p className="text-xs font-medium text-foreground/80 sm:text-sm">{b.label}</p>
            <p className="text-[11px] text-muted-foreground sm:text-xs">{b.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
