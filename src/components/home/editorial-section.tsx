"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ARTICLES, type Article } from "@/lib/articles";

export function EditorialSection() {
  const [active, setActive] = useState<Article | null>(null);
  const [featured, ...rest] = ARTICLES;

  return (
    <section id="editorial" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 section-editorial">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="kicker mb-4">The Wellness Journal</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Honest guidance,{" "}
            <span className="text-gradient-warm">written for you.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            No fad diets, no “blast your belly” nonsense. Just thoughtful,
            science-backed reading for women building strength at midlife and
            beyond.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Featured article */}
        <button
          onClick={() => setActive(featured)}
          className="card-modern group relative flex flex-col overflow-hidden p-0 text-left"
        >
          <div className="relative h-56 overflow-hidden sm:h-72">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute left-4 top-4">
              <span className="badge-minimal border-none bg-white/90 text-foreground backdrop-blur">
                <Sparkles size={11} /> Featured read
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="kicker text-white/80">{featured.category}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                {featured.title}
              </h3>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
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
        </button>

        {/* Article list */}
        <div className="flex flex-col gap-4">
          {rest.map((a) => (
            <button
              key={a.id}
              onClick={() => setActive(a)}
              className="card-modern group flex gap-5 p-5 text-left"
            >
              <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:block">
                <Image
                  src={a.image}
                  alt={a.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="128px"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <p className="kicker text-[0.625rem]">{a.category}</p>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {a.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock size={12} /> {a.readMinutes} min</span>
                  <span className="inline-flex items-center gap-1 text-primary">Read <ArrowRight size={12} /></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ArticleReader article={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ArticleReader({ article, onClose }: { article: Article | null; onClose: () => void }) {
  return (
    <Dialog open={article !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-2xl">
        {article && (
          <>
            <DialogTitle className="sr-only">{article.title}</DialogTitle>
            <DialogDescription className="sr-only">
              An article from the FitFeky Wellness Journal: {article.title}.
            </DialogDescription>
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 672px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                  {article.category}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold leading-tight sm:text-2xl">
                  {article.title}
                </h2>
              </div>
            </div>
            <ScrollArea className="max-h-[60vh]">
              <div className="px-6 py-5 sm:px-7">
                <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock size={13} /> {article.readMinutes} min read</span>
                  <span>·</span>
                  <span>FitFeky Editorial</span>
                </div>
                <div className="prose-sm space-y-4">
                  {article.body.map((para, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-border/70 bg-secondary/40 p-4 text-sm text-muted-foreground">
                  Ready to put this into practice? Explore our quality-scored
                  gear below — every product is chosen to support exactly this
                  kind of sustainable, joint-friendly routine.
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    onClose();
                    setTimeout(() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }), 80);
                  }}
                >
                  Browse the catalog
                </Button>
              </div>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
