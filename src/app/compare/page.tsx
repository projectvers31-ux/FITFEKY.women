import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gauge, HeartPulse, Scale } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { ComparisonTable } from "@/components/products/comparison-table";
import { breadcrumbJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare Fitness Gear Side by Side | FitFeky",
  description:
    "Quality-scored fitness gear compared side by side — walking pads, bands, yoga mats, scales and recovery tools. Filter by category, price and joint impact.",
  robots: { index: true, follow: true },
  ...pageMetadata("/compare"),
};

export default function ComparePage() {
  const breadcrumbLd = jsonLdScript(
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Product Comparison", url: "/compare" },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbLd }} />
      <PageShell
        kicker="Compare side by side"
        title="The best joint-friendly gear, compared."
        subtitle="We scored every product on our 0–100 editorial scale and rated how gentle each one is on aging joints. Filter by category, price or impact level — then pick the piece of gear that fits your body and your budget."
        wide
      >
        {/* How to read this table */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <ReadCard
            icon={Gauge}
            title="Quality score"
            body="Our editorial 0–100 score. Green bar (90+) is our best-in-class tier, amber (80–89) is strong, orange means good but not great."
          />
          <ReadCard
            icon={HeartPulse}
            title="Joint-friendly rating"
            body="How gentle the exercise is on knees, hips and shoulders — 5 stars means very low impact, 3 is moderate, 1–2 is more demanding."
          />
          <ReadCard
            icon={Scale}
            title="Best for"
            body="The one-line answer to “who is this actually for?” — use it to match the gear to your goals, space and routine."
          />
        </div>

        {/* The comparison table */}
        <div className="mt-10">
          <ComparisonTable />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* How we score */}
          <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              How we score products
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Every product is evaluated against four weighted criteria —
              joint safety, build quality, ease of use and real customer
              feedback — and given one transparent number. We never accept
              payment for placement, so a high score always means we tested
              it, we like it, and we&rsquo;d buy it for our own mothers.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Products that earn 90+ are our <strong>Editor&rsquo;s
              Choice</strong> picks; <strong>Top Pick</strong> badges mark the
              best value in their category. Read more about our{" "}
              <Link href="/#how-we-test" className="text-primary underline underline-offset-3">
                testing methodology
              </Link>
              .
            </p>
          </div>

          {/* Affiliate + CTA */}
          <div className="flex flex-col rounded-2xl bg-primary p-6 text-primary-foreground">
            <h2 className="font-display text-lg font-semibold">
              Prices &amp; availability
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
              The &ldquo;View on Amazon&rdquo; buttons are affiliate links —
              if you buy through them we may earn a small commission at no
              extra cost to you. It never affects our scores. Prices change
              constantly, so the number you see on Amazon is always the
              final one.
            </p>
            <Link
              href="/#catalog"
              className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
            >
              Browse the full catalog <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </PageShell>
    </>
  );
}

function ReadCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Gauge;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/60 p-5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon size={17} />
      </span>
      <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-foreground/70">{body}</p>
    </div>
  );
}
