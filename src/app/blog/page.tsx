import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Wellness Journal — Fitness Advice for Women Over 40 | FitFeky",
  description:
    "Expert buying guides, workout tips and recovery advice for women 40+. Walking pads, resistance bands, yoga, smart scales, massage guns — honest, science-backed reading.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  keywords: [
    "fitness blog for women over 40",
    "home workout advice",
    "walking pad guide",
    "resistance band training",
    "yoga for women 50+",
    "recovery after 50",
  ],
};

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES;
  const categories = Array.from(new Set(ARTICLES.map((a) => a.category)));

  return (
    <PageShell
      kicker="The Wellness Journal"
      title="Honest fitness reading for women 40+"
      subtitle="No fad diets, no “blast your belly” nonsense. Just thoughtful, science-backed guidance on gear, training and recovery — written for the body you have today."
    >
      {/* Category pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span
            key={c}
            className="rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Featured article */}
      <article className="mt-10">
        <Link
          href={`/#editorial`}
          className="card-modern group block overflow-hidden p-0"
        >
          <div className={`relative h-56 bg-gradient-to-br ${featured.accent} sm:h-72`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute left-5 top-5">
              <span className="badge-minimal border-none bg-white/90 text-foreground backdrop-blur">
                <BookOpen size={11} /> Featured
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="kicker text-white/80">{featured.category}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                {featured.title}
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={13} /> {featured.readMinutes} min read
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </article>

      {/* Article grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {rest.map((a) => (
          <Link
            key={a.id}
            href={`/#editorial`}
            className="card-modern group flex flex-col p-0 overflow-hidden"
          >
            <div className={`relative h-40 bg-gradient-to-br ${a.accent}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="kicker text-white/80">{a.category}</p>
                <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
                  {a.title}
                </h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} /> {a.readMinutes} min
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Keyword-rich SEO footer */}
      <div className="mt-14 rounded-2xl bg-secondary/40 p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          What we write about
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Our Wellness Journal covers the topics women over 40 actually search
          for: the best walking pads for weight loss, resistance bands vs.
          weights for bone density, gentle yoga for stiff hips, smart scale
          accuracy, low-impact cardio for bad knees, muscle recovery after 50,
          and honest buying guides for every category of home fitness gear.
          Every article is written by our editorial team and reviewed for
          medical accuracy.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-card/40 p-8 text-center">
        <Search className="text-primary" size={24} />
        <p className="font-display text-xl font-semibold text-foreground">
          Looking for specific gear?
        </p>
        <p className="max-w-md text-sm text-muted-foreground">
          Browse our full catalog of 172 quality-scored products, filtered by
          category, price and priority tier.
        </p>
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Shop the catalog <ArrowRight size={16} />
        </Link>
      </div>
    </PageShell>
  );
}
