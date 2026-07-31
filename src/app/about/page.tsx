import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Handshake,
  Heart,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  PageShell,
  PageHeading,
  PageP,
  PageList,
  PageMeta,
} from "@/components/layout/page-shell";
import { TESTING_CRITERIA } from "@/lib/content";
import { resolveIcon } from "@/lib/icon-registry";
import { aboutPageJsonLd, reviewerJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Why We Exist — FitFeky's Story & Editorial Promise | FitFeky",
  description:
    "FitFeky started when our founder's mother couldn't find joint-friendly gear after 50. Meet our team and see exactly how we score products.",
  robots: { index: true, follow: true },
  ...pageMetadata("/about"),
};

const TEAM = [
  {
    name: "Anna",
    role: "Founder & Lead Reviewer",
    credentials: "Certified personal trainer · 12+ years testing home fitness gear",
    blurb:
      "The one whose mother inspired all of this. Anna tests every Editor's Choice pick in her own living room before it earns a badge.",
  },
  {
    name: "Maria",
    role: "Senior Product Tester",
    credentials: "Former group fitness instructor · 20+ years coaching",
    blurb:
      "A former group fitness instructor in her 50s. Maria walks 10,000 steps a day on a walking pad and has tried more resistance bands than she cares to count.",
  },
  {
    name: "Ellen",
    role: "Physical Therapy Consultant",
    credentials: "Licensed Doctor of Physical Therapy (DPT)",
    blurb:
      "A licensed DPT who reviews every recommendation for joint safety. If Ellen wouldn't prescribe it to her patients, it doesn't make our list.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(aboutPageJsonLd()) }}
      />
      {TEAM.map((m) => (
      <script
        key={m.name}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(reviewerJsonLd(m.name)) }}
      />
      ))}
      <PageShell
        kicker="About FitFeky"
      title="Why We Exist"
      subtitle="Every product we recommend is tested or deeply researched, scored on a transparent 0–100 scale, and chosen for the woman who wants to build strength at home — without wrecking her joints."
    >
      <PageMeta updated="July 2026" />

      {/* ============ Origin story ============ */}
      <PageHeading id="our-story">The story that started FitFeky</PageHeading>
      <PageP>
        FitFeky began with my mother. After her knee surgery, her doctor told
        her the same thing so many women over 50 hear: &ldquo;you need to move
        more.&rdquo; So she went looking for gear — a walking pad for bad
        weather, bands for gentle strength — and found a wall of products
        designed for 25-year-olds, marketed with promises that ranged from
        hype to outright misleading.
      </PageP>
      <PageP>
        The reviews didn&rsquo;t help. Most &ldquo;best of&rdquo; lists were
        paid placements — the same five products shuffled around by whichever
        brand paid most. There was no one asking the questions that actually
        mattered to her: Will this hurt my knees? Is it easy to set up? Can I
        use it on my own, in my living room, at 60?
      </PageP>
      <PageP>
        So I started FitFeky to answer those questions. Today, every product
        in our catalog is either{" "}
        <Link href="/#how-we-test" className="text-primary underline underline-offset-3">
          tested by our team
        </Link>{" "}
        or researched to the same depth — and scored on a scale we publish
        openly. Our{" "}
        <Link href="/compare" className="text-primary underline underline-offset-3">
          product comparison tables
        </Link>{" "}
        show you exactly how we ranked them, side by side.
      </PageP>

      {/* ============ Our process ============ */}
      <PageHeading id="how-we-score">How we score every product</PageHeading>
      <PageP>
        Every product is evaluated against four weighted criteria. The score
        you see next to each product is the result — nothing hidden, nothing
        negotiable.
      </PageP>
      <div className="mt-6 space-y-3">
        {TESTING_CRITERIA.map((c) => {
          const Icon = resolveIcon(c.icon);
          return (
            <div
              key={c.title}
              className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/40 p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <span className="text-xs font-semibold text-primary">
                    {c.weight}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <PageP>
        Products that score 85 or higher earn our{" "}
        <strong>Editor&rsquo;s Choice</strong> badge. You can see the full
        ranking in the{" "}
        <Link href="/#catalog" className="text-primary underline underline-offset-3">
          product catalog
        </Link>
        .
      </PageP>

      {/* ============ Editorial policy ============ */}
      <PageHeading id="editorial-policy">Our editorial policy</PageHeading>
      <PageP>
        Trust is the whole point of FitFeky. Three promises we make — and
        keep:
      </PageP>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <PolicyCard
          icon={ShieldCheck}
          title="No paid placements"
          body="Brands cannot pay to appear, score higher, or move up our rankings. If a brand offers us money, we decline — and we don't feature the product."
        />
        <PolicyCard
          icon={BadgeCheck}
          title="Full disclosure"
          body="FitFeky is an Amazon affiliate. If you buy through our links, we earn a small commission at no cost to you — and it never influences a score."
        />
        <PolicyCard
          icon={Handshake}
          title="Total independence"
          body="We're not owned by a fitness brand, a media group, or an Amazon subsidiary. Our only loyalty is to the reader who trusts us with her health."
        />
      </div>
      <PageP>
        Read the full legal details in our{" "}
        <Link href="/affiliate-disclosure" className="text-primary underline underline-offset-3">
          Affiliate Disclosure
        </Link>
        ,{" "}
        <Link href="/privacy" className="text-primary underline underline-offset-3">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="text-primary underline underline-offset-3">
          Terms of Use
        </Link>
        .
      </PageP>

      {/* ============ Meet the team ============ */}
      <PageHeading id="meet-the-team">Meet the team</PageHeading>
      <PageP>
        We&rsquo;re a small team of women who actually use this gear. No
        anonymous content farm, no freelancers who&rsquo;ve never touched a
        walking pad — just us, our joints, and a lot of product boxes.
      </PageP>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {TEAM.map((m) => (
          <div
            key={m.name}
            className="rounded-xl border border-border/50 bg-card/40 p-5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/20 text-accent-foreground">
              <Users size={18} />
            </span>
            <h3 className="mt-3 text-base font-semibold text-foreground">
              {m.name}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {m.role}
            </p>
            <p className="mt-1.5 inline-flex items-start gap-1.5 text-xs font-medium text-muted-foreground">
              <BadgeCheck size={13} className="mt-0.5 shrink-0 text-primary" />
              {m.credentials}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {m.blurb}
            </p>
          </div>
        ))}
      </div>

      {/* ============ Contact ============ */}
      <PageHeading id="contact-us">Get in touch</PageHeading>
      <PageP>
        Found a product we should review? Spot an error? Or just want to tell
        us how the checklist worked out? We read every message:
      </PageP>
      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-secondary/40 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Mail size={19} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              hello@fitfeky.com
            </p>
            <p className="text-xs text-muted-foreground">
              We reply within 48 hours — usually faster.
            </p>
          </div>
        </div>
        <Link
          href="mailto:hello@fitfeky.com"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Email us <ArrowRight size={16} />
        </Link>
      </div>

      <PageP>
        Want to see our recommendations in action first? Browse the{" "}
        <Link href="/#catalog" className="text-primary underline underline-offset-3">
          full catalog
        </Link>
        , compare products{" "}
        <Link href="/compare" className="text-primary underline underline-offset-3">
          side by side
        </Link>
        , or read the{" "}
        <Link href="/blog" className="text-primary underline underline-offset-3">
          Wellness Journal
        </Link>{" "}
        for guides and routines written for your body.
      </PageP>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <p className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
          <Heart size={16} className="text-primary" />
          Our promise
        </p>
        <PageList>
          We never accept payment to feature a product.
          Every recommendation is tested or deeply researched.
          Every score is transparent and published.
          We write for the woman you are today — not the one the fitness
          industry wishes you were.
        </PageList>
      </div>
    </PageShell>
    </>
  );
}

function PolicyCard({
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
