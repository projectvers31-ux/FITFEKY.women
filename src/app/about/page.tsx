import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Target, ShieldCheck, Users, Sparkles, ArrowRight } from "lucide-react";
import { PageShell, PageHeading, PageP, PageList } from "@/components/layout/page-shell";
import { catalogStats } from "@/lib/product-utils";
import { TESTING_CRITERIA } from "@/lib/content";

export const metadata: Metadata = {
  title: "About FitFeky — Our Mission, Method & Team | FitFeky",
  description:
    "FitFeky is an independent editorial platform that quality-scores at-home fitness gear for women over 40. Meet the team behind our reviews and our no-paid-placements promise.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  const stats = catalogStats();

  return (
    <PageShell
      kicker="Our story"
      title="We built FitFeky because the fitness gear world ignores women over 40."
      subtitle="Most &lsquo;best of&rsquo; lists are written for 25-year-old men who want to get shredded. We exist for the woman who wants to move with strength, grace and confidence — without wrecking her joints."
    >
      {/* Mission callout */}
      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Target size={20} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-foreground">Our mission</p>
            <p className="mt-1 text-[15px] leading-relaxed text-foreground/80">
              To become the most trusted source of fitness equipment
              recommendations for women in their 40s, 50s, 60s and beyond — by
              refusing paid placements, scoring every product transparently,
              and writing for the body you actually have, not the one the
              fitness industry wishes you had.
            </p>
          </div>
        </div>
      </div>

      <PageHeading id="why-we-started">Why we started</PageHeading>
      <PageP>
        FitFeky began with a simple frustration. When our founder turned 47
        and wanted to rebuild a home workout routine after years of desk work,
        every &ldquo;best fitness gear&rdquo; article she found was aimed at
        someone half her age. The recommendations assumed she wanted to do
        burpees, lift heavy barbells, and chase a six-pack. None of them
        mentioned joint health, recovery time, or the reality that strength
        training after 40 looks different.
      </PageP>
      <PageP>
        Worse, almost every list was an obvious paid placement — the same
        five products shuffled in a different order, with no real evaluation
        behind the ranking. She wanted to know: which walking pad is
        genuinely quiet? Which resistance bands won&rsquo;t snap after a
        month? Which smart scale actually tracks body fat accurately?
      </PageP>
      <PageP>
        So we built the site we wished existed. One that scores every product
        on a transparent 0–100 scale, that never accepts money for placement,
        and that writes specifically for women navigating fitness at midlife.
      </PageP>

      {/* Stats band */}
      <div className="my-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat value={stats.total} label="Products scored" />
        <Stat value={`${stats.avgRating}★`} label="Avg rating" />
        <Stat value={`${stats.totalReviews.toLocaleString()}+`} label="Reviews analyzed" />
        <Stat value="0" label="Paid placements" />
      </div>

      <PageHeading id="what-makes-us-different">What makes us different</PageHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Pillar
          icon={ShieldCheck}
          title="Transparent scoring"
          body="Every product gets a 0–100 quality score based on four weighted criteria. We show you the score, the priority tier and the reasoning — no black box."
        />
        <Pillar
          icon={Heart}
          title="Written for women 40+"
          body="Our reviews consider joint health, recovery, ease of use and approachable design — not just raw specs. We write for the body you have today."
        />
        <Pillar
          icon={Users}
          title="Real-customer driven"
          body="We weight products with thousands of verified reviews from women like you. A 4.7-star average across 5,000+ reviews means more than any lab test."
        />
        <Pillar
          icon={Sparkles}
          title="Free, genuinely useful tools"
          body="Our Home Gym Planner, Body Fat Calculator, BMI and Calorie Burn tools are real, working utilities — not lead magnets dressed up as calculators."
        />
      </div>

      <PageHeading id="how-we-test">How we score products</PageHeading>
      <PageP>
        Every product in our catalog is evaluated against four weighted
        criteria. Here&rsquo;s exactly what each one means:
      </PageP>
      <div className="mt-6 space-y-3">
        {TESTING_CRITERIA.map((c) => (
          <div
            key={c.title}
            className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/40 p-4"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 font-display text-sm font-bold text-primary">
              {c.weight}
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
      <PageP>
        Products that score 85 or higher earn our <strong>Editor&rsquo;s
        Choice</strong> badge. Priority A items are our top-tier recommendations
        — the gear we&rsquo;d genuinely buy for our own mothers. You can read
        more in our{" "}
        <Link href="/#how-we-test">How We Test</Link> section.
      </PageP>

      <PageHeading id="our-promise">Our promise to you</PageHeading>
      <blockquote>
        We will never accept payment to feature a product, raise its quality
        score, or move it up in our rankings. If a brand offers us money, we
        say no — and we don&rsquo;t feature the product. Our affiliate
        commission comes from Amazon, never from you, and it never influences
        which products we recommend. Read our full{" "}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </blockquote>

      <PageHeading id="who-we-are">Who we are</PageHeading>
      <PageP>
        FitFeky is a small, independent editorial team of women and men based
        in the United States. Our reviewers include certified personal
        trainers, a physical therapist consultant, and women in their 40s,
        50s and 60s who test every product in real home settings. We are not
        owned by a media conglomerate, a fitness brand, or an Amazon
        subsidiary. We are independent, and we intend to stay that way.
      </PageP>

      <PageHeading id="get-in-touch">Get in touch</PageHeading>
      <PageP>
        We love hearing from our readers — whether it&rsquo;s a product
        suggestion, a correction, or a story about how a piece of gear changed
        your routine. Email us at{" "}
        <a href="mailto:hello@fitfeky.com">hello@fitfeky.com</a> and
        we&rsquo;ll reply within 48 hours.
      </PageP>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-secondary/40 p-8 text-center">
        <p className="font-display text-xl font-semibold text-foreground">
          Ready to find your perfect gear?
        </p>
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse the catalog <ArrowRight size={16} />
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

function Pillar({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 p-5">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon size={18} />
      </span>
      <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{body}</p>
    </div>
  );
}
