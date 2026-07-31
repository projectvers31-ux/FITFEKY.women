import Link from "next/link";
import { Mail, ShieldCheck, Star } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { Logo } from "@/components/shared/logo";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";

export function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-background">
      {/* Affiliate disclosure banner */}
      <div className="border-b border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-xs text-background/60 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <span className="inline-flex items-center gap-1.5 font-semibold text-background/80">
            <ShieldCheck size={14} className="text-accent" />
            Affiliate Disclosure
          </span>
          <p className="sm:ml-2">
            As an Amazon Associate, FitFeky earns from qualifying purchases.
            Prices and availability are accurate as of the date/time indicated
            and are subject to change. Any price and availability information
            displayed on Amazon at the time of purchase will apply.{" "}
            <Link
              href="/affiliate-disclosure"
              className="font-medium text-accent underline underline-offset-2 hover:text-background"
            >
              Read the full disclosure
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <Link href="/" prefetch={false}>
                <Logo size={36} />
              </Link>
              <span className="font-display text-xl font-semibold text-background">
                FitFeky
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/60">
              Premium, quality-scored at-home fitness gear curated for women
              over 45. Build gentle strength with joint-friendly gear â€” right
              from your living room.
            </p>

            {/* Social proof */}
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-background/15 bg-background/5 px-4 py-2 text-xs font-semibold text-background/85">
              <Star size={13} className="fill-accent text-accent" />
              Trusted by 100,000+ women over 45
            </p>

            <p className="mt-5 flex items-center gap-1.5 text-xs font-medium text-accent">
              <Mail size={14} /> hello@fitfeky.com
            </p>

            <FooterNewsletter />
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h3 className="kicker mb-4 text-background/50">Shop by Category</h3>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link
                    href="/#catalog" prefetch={false}
                    className="text-background/70 transition-colors hover:text-accent"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h3 className="kicker mb-4 text-background/50">Explore</h3>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              <li><Link href="/#catalog" prefetch={false} className="text-background/70 transition-colors hover:text-accent">All Products</Link></li>
              <li><Link href="/compare" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Compare Gear</Link></li>
              <li><Link href="/blog" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Wellness Journal</Link></li>
              <li><Link href="/about" prefetch={false} className="text-background/70 transition-colors hover:text-accent">About Us</Link></li>
              <li><Link href="/#calculators" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Calculators</Link></li>
              <li><Link href="/features" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Features</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="kicker mb-4 text-background/50">Legal</h3>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              <li><Link href="/affiliate-disclosure" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Privacy Policy</Link></li>
              <li><Link href="/terms" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Terms of Use</Link></li>
            </ul>
            <div className="mt-6 flex gap-3">
              <ShieldCheck size={15} className="shrink-0 text-accent" />
              <p className="text-xs leading-relaxed text-background/50">
                Independently reviewed. Never paid for placement.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-xs text-background/50 sm:flex-row">
          <p>Â© 2026 FitFeky. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/about" prefetch={false} className="transition-colors hover:text-accent">About</Link>
            <Link href="/blog" prefetch={false} className="transition-colors hover:text-accent">Blog</Link>
            <Link href="/compare" prefetch={false} className="transition-colors hover:text-accent">Compare</Link>
            <Link href="/privacy" prefetch={false} className="transition-colors hover:text-accent">Privacy</Link>
            <Link href="/terms" prefetch={false} className="transition-colors hover:text-accent">Terms</Link>
            <Link href="/affiliate-disclosure" prefetch={false} className="transition-colors hover:text-accent">Affiliate Disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
