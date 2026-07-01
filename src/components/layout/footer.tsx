import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  const year = new Date().getFullYear();

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
            displayed on Amazon at the time of purchase will apply.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-display text-xl font-semibold text-background">FitFeky</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/60">
              Premium, quality-scored at-home fitness gear curated for women
              over 40. Move with strength, grace and confidence — right from
              your living room.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
              <Mail size={14} /> hello@fitfeky.com
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h3 className="kicker mb-4 text-background/50">Shop by Category</h3>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link
                    href="/#catalog"
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
              <li><Link href="/#catalog" className="text-background/70 transition-colors hover:text-accent">All Products</Link></li>
              <li><Link href="/#featured" className="text-background/70 transition-colors hover:text-accent">Editor's Picks</Link></li>
              <li><Link href="/#categories" className="text-background/70 transition-colors hover:text-accent">Categories</Link></li>
              <li><Link href="/#calculators" className="text-background/70 transition-colors hover:text-accent">Calculators</Link></li>
              <li><Link href="/blog" className="text-background/70 transition-colors hover:text-accent">Wellness Journal</Link></li>
              <li><Link href="/about" className="text-background/70 transition-colors hover:text-accent">About Us</Link></li>
              <li><Link href="/features" className="text-background/70 transition-colors hover:text-accent">Features</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div className="md:col-span-3">
            <h3 className="kicker mb-4 text-background/50">Why FitFeky</h3>
            <ul className="grid grid-cols-1 gap-3 text-sm text-background/70">
              <li className="flex gap-2">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>172 products quality-scored by our editorial team</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>Built around joint-friendly, low-impact movement</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>Transparent pricing — we point you to live Amazon pricing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-xs text-background/50 sm:flex-row">
          <p>© {year} FitFeky. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/about" className="transition-colors hover:text-accent">About</Link>
            <Link href="/blog" className="transition-colors hover:text-accent">Blog</Link>
            <Link href="/features" className="transition-colors hover:text-accent">Features</Link>
            <Link href="/privacy" className="transition-colors hover:text-accent">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-accent">Terms</Link>
            <Link href="/affiliate-disclosure" className="transition-colors hover:text-accent">Affiliate Disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
