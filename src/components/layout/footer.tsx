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
              over 45. Build gentle strength with joint-friendly gear — right
              from your living room.
            </p>

            {/* Social proof */}
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-background/15 bg-background/5 px-4 py-2 text-xs font-semibold text-background/85">
              <Star size={13} className="fill-accent text-accent" />
              Trusted by 100,000+ women over 45
            </p>

            <a
              href="mailto:hello@fitfeky.com"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-background"
            >
              <Mail size={14} /> hello@fitfeky.com
            </a>

            <a
              href="https://x.com/ve77022"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-background"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow on X
            </a>

            <a
              href="https://www.pinterest.com/fitfeky2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-background"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.31-.09-.79-.17-2.01.03-2.87.18-.78 1.18-4.97 1.18-4.97s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.42 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.82 1.49 1.82 1.79 0 3.16-1.89 3.16-4.61 0-2.41-1.73-4.1-4.2-4.1-2.86 0-4.54 2.15-4.54 4.37 0 .87.33 1.8.75 2.3.08.1.09.19.07.29-.07.31-.25 1.01-.28 1.15-.04.19-.14.23-.33.14-1.24-.58-2.02-2.39-2.02-3.85 0-3.13 2.28-6.01 6.56-6.01 3.44 0 6.12 2.45 6.12 5.72 0 3.42-2.16 6.17-5.15 6.17-1.01 0-1.95-.52-2.28-1.14l-.62 2.36c-.22.87-.83 1.96-1.24 2.62.93.29 1.92.45 2.95.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
              Pinterest
            </a>

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
              <li><Link href="/community" prefetch={false} className="text-background/70 transition-colors hover:text-accent">Community Circle</Link></li>
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
          <p>© 2026 FitFeky. All rights reserved.</p>
          <a
            href="https://www.seobility.net/en/seocheck/check?url=https%3A%2F%2Fwww.fitfeky.com%2F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-background/50 transition-colors hover:text-background"
          >
            <ShieldCheck size={13} className="text-accent" />
            Checked with Seobility
          </a>
          <p className="text-xs text-background/40">
            Made with care for women over 45.
          </p>
        </div>
      </div>
    </footer>
  );
}
