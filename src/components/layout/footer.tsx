import Link from "next/link";
import { Heart, Mail, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-secondary/40">
      {/* Affiliate disclosure banner */}
      <div className="border-b border-border/70 bg-background/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground/80">
            <ShieldCheck size={15} className="text-accent" />
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <Heart size={18} className="fill-primary-foreground" />
              </span>
              <span className="font-display text-lg font-bold">FitFeky</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
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
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Shop by Category
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              {CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link
                    href="#catalog"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Explore
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm">
              <li><Link href="#catalog" className="text-muted-foreground transition-colors hover:text-primary">All Products</Link></li>
              <li><Link href="#featured" className="text-muted-foreground transition-colors hover:text-primary">Editor's Picks</Link></li>
              <li><Link href="#categories" className="text-muted-foreground transition-colors hover:text-primary">Categories</Link></li>
              <li><Link href="#calculators" className="text-muted-foreground transition-colors hover:text-primary">Calculators</Link></li>
              <li><Link href="#editorial" className="text-muted-foreground transition-colors hover:text-primary">Wellness Journal</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              Why FitFeky
            </h3>
            <ul className="grid grid-cols-1 gap-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>172 products quality-scored by our editorial team</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Built around joint-friendly, low-impact movement</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>Transparent pricing — N/A means we point you to live Amazon pricing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} FitFeky. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Affiliate Disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
