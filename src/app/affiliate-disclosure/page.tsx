import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, DollarSign, Heart, ExternalLink } from "lucide-react";
import { PageShell, PageHeading, PageP, PageList, PageMeta } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — How FitFeky Earns (Not From You) | FitFeky",
  description:
    "FitFeky is an Amazon Associates affiliate. We earn a commission from Amazon on qualifying purchases — at no extra cost to you. Read our full, transparent disclosure.",
  alternates: { canonical: "/affiliate-disclosure" },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  return (
    <PageShell
      kicker="Transparency"
      title="Affiliate Disclosure"
      subtitle="We believe in complete honesty about how we make money. The short version: we earn a commission from Amazon when you buy — never from you."
    >
      <PageMeta updated="June 2026" />

      {/* Key principle callout */}
      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <DollarSign size={20} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              You never pay more because of us.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">
              The commission we earn is paid by <strong>Amazon out of its own
              margin</strong> — it is <strong>not</strong> added to your price.
              You pay exactly the same price you would have paid visiting Amazon
              directly. Sometimes our links even unlock the same or better
              pricing, because Amazon tracks the referral.
            </p>
          </div>
        </div>
      </div>

      <PageHeading id="what-is-fitfeky">What FitFeky is</PageHeading>
      <PageP>
        FitFeky is an independent editorial website that curates, reviews and
        quality-scores at-home fitness equipment for women over 40. We are a
        participant in the{" "}
        <a
          href="https://affiliate-program.amazon.com/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Amazon Services LLC Associates Program
        </a>{" "}
        — an affiliate advertising program designed to provide a means for
        sites to earn advertising fees by linking to Amazon.com.
      </PageP>

      <PageHeading id="how-we-earn">How we earn (and how we don&rsquo;t)</PageHeading>
      <PageP>
        When you click a &ldquo;Check Price on Amazon&rdquo; button on FitFeky
        and complete a qualifying purchase on Amazon within 24 hours, Amazon
        pays us a small percentage of the sale. The important points:
      </PageP>
      <PageList
        items={[
          <><strong>The commission comes from Amazon, not you.</strong> Amazon pays us out of its own revenue. Your price is identical to what you&rsquo;d pay without our link.</>,
          <><strong>You never pay a fee to FitFeky.</strong> We have no paywall, no subscription, no checkout. Our content and tools are 100% free.</>,
          <><strong>The price you see on Amazon is the price you pay.</strong> We display the price Amazon reports at the time we published the recommendation, but Amazon sets the final price — and it can change at any moment.</>,
          <><strong>Clicking our link never costs you anything.</strong> There is no surcharge, no hidden fee, no difference in your Amazon checkout total.</>,
          <><strong>It doesn&rsquo;t matter what you buy.</strong> If you click our link and then buy anything on Amazon within the session (not just the product we recommended), we may earn a commission on those items too — still at zero extra cost to you.</>,
        ]}
      />

      <PageHeading id="why-this-matters">Why this matters to us</PageHeading>
      <PageP>
        The affiliate model lets us keep FitFeky free, independent and
        ad-light. It also means our incentives are aligned with yours: we only
        earn when you find something genuinely worth buying. That&rsquo;s why
        we invest so heavily in our{" "}
        <Link href="/#how-we-test">quality-scoring methodology</Link> — a
        recommendation that disappoints you earns us nothing and costs us your
        trust.
      </PageP>
      <blockquote>
        We never accept payment for product placement. Our quality scores are
        editorial signals, not bought endorsements. If a brand offers us money
        to feature a product, we say no — and we don&rsquo;t feature it.
      </blockquote>

      <PageHeading id="our-commitments">Our commitments to you</PageHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Commitment
          icon={ShieldCheck}
          title="No paid placements"
          body="Brands cannot pay to appear in our catalog, rise in our sort order, or earn a higher quality score. Every ranking is earned through real customer data and editorial evaluation."
        />
        <Commitment
          icon={DollarSign}
          title="No price markups"
          body="We never add a cent to Amazon&rsquo;s price. The commission is Amazon&rsquo;s cost of acquisition, paid from its own margin — not a surcharge on your order."
        />
        <Commitment
          icon={Heart}
          title="Honest reviews"
          body="We surface negative reviews and product weaknesses alongside the positives. Our editorial blurb on every product explains who it suits and who it doesn&rsquo;t."
        />
        <Commitment
          icon={ExternalLink}
          title="Clear affiliate links"
          body="Every link to Amazon uses rel=&quot;sponsored nofollow noopener noreferrer&quot; and opens in a new tab. We never disguise an affiliate link as something else."
        />
      </div>

      <PageHeading id="amazon-operating-agreement">The Amazon Associates Operating Agreement</PageHeading>
      <PageP>
        Our participation in the Amazon Associates Program is governed by the{" "}
        <a
          href="https://affiliate-program.amazon.com/help/operating/agreement"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Amazon Associates Program Operating Agreement
        </a>{" "}
        and its{" "}
        <a
          href="https://affiliate-program.amazon.com/help/operating/policies"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Program Policies
        </a>
        . As required by those terms and by the U.S. Federal Trade Commission
        (FTC), we clearly disclose our affiliate relationship on every page of
        the site and in our footer.
      </PageP>

      <PageHeading id="price-accuracy">Price &amp; availability accuracy</PageHeading>
      <PageP>
        Product prices, availability and deals displayed on FitFeky are
        accurate as of the date and time indicated on each product, and are
        subject to change without notice. Any price and availability
        information displayed on Amazon at the time of purchase will apply to
        the purchase of the product. Some products in our catalog show
        &ldquo;Price on Amazon&rdquo; because Amazon&rsquo;s API did not return
        a current price — in those cases, clicking through to Amazon is the
        only way to see live pricing.
      </PageP>

      <PageHeading id="other-affiliate-programs">Other affiliate programs</PageHeading>
      <PageP>
        At present, FitFeky participates only in the Amazon Associates Program.
        If we join additional affiliate programs in the future, we will update
        this page to disclose every one, with the same commitment: the
        commission is always paid by the retailer, never added to your price.
      </PageP>

      <PageHeading id="questions">Questions?</PageHeading>
      <PageP>
        If you have any questions about how FitFeky makes money, our affiliate
        relationships, or our editorial independence, we&rsquo;re happy to
        answer them. Email us at{" "}
        <a href="mailto:hello@fitfeky.com">hello@fitfeky.com</a> and
        we&rsquo;ll reply within 48 hours.
      </PageP>

      <div className="mt-12 rounded-2xl bg-secondary/40 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Thank you for trusting FitFeky. Every click that earns us a
          commission is a vote of confidence — and it costs you nothing.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to shopping
        </Link>
      </div>
    </PageShell>
  );
}

function Commitment({
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
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon size={17} />
      </span>
      <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{body}</p>
    </div>
  );
}
