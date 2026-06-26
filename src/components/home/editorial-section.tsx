"use client";

import { useState } from "react";
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

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  accent: string;
  body: string[];
}

const ARTICLES: Article[] = [
  {
    id: "walking-pad-40",
    category: "Low-Impact Cardio",
    title: "Why a Walking Pad Is the Perfect First Piece of Home Cardio at 45",
    excerpt:
      "Joint-friendly, apartment-friendly and Netflix-friendly. Here's how 30 minutes a day on a walking pad can transform your energy — without the impact of running.",
    readMinutes: 5,
    accent: "from-orange-400/70 to-rose-500/70",
    body: [
      "If you're returning to movement in your 40s or 50s, the single best investment you can make is a low-impact cardio option you'll actually use every day. For most women, that's a walking pad.",
      "Unlike a full treadmill, a walking pad slides under your desk or beside the couch. The speed stays in a comfortable 1–4 mph range, which means your heart rate rises gently, your joints stay happy, and you can rack up 5,000–8,000 steps without ever changing into 'workout clothes.'",
      "The metabolic payoff is real: a 160 lb woman walking at 2.5 mph burns roughly 90–120 calories per 30 minutes. Do that five days a week and you've created a meaningful weekly deficit — plus the blood-sugar and mood benefits of breaking up long sits.",
      "Look for a pad with a quiet brushless motor, a weight capacity of at least 250 lb, and a remote so you can adjust speed mid-stride. Our Editor's Choice picks all clear those bars.",
    ],
  },
  {
    id: "resistance-bands-strength",
    category: "Strength Training",
    title: "Resistance Bands vs. Weights After 40: What Actually Builds Bone",
    excerpt:
      "Weights win for bone density, but bands win for consistency. Here's how to combine both — and why bands are the safest place to (re)start.",
    readMinutes: 6,
    accent: "from-rose-400/70 to-fuchsia-500/70",
    body: [
      "After 40, preserving muscle and bone becomes non-negotiable. The question isn't whether to strength train — it's how to start without flaring up old injuries.",
      "Resistance bands offer ascending resistance: the further you stretch them, the harder they pull. That means the load is lightest where your joints are most vulnerable (the start of the movement) and heaviest where you're strongest. It's a remarkably forgiving way to rebuild strength.",
      "That said, true bone-density gains respond best to progressive external load — dumbbells and bodyweight. The smart play is to spend 4–8 weeks rebuilding movement quality with bands, then layer in light dumbbells once your joints feel ready.",
      "A simple twice-weekly routine: 15 minutes of band rows, presses, squats and glute bridges. Add a dumbbell goblet squat when it feels easy. That's it. Consistency beats intensity every single time.",
    ],
  },
  {
    id: "yoga-flexibility",
    category: "Mobility & Yoga",
    title: "Gentle Yoga for Stiff Hips: A 15-Minute Flow You Can Do Every Day",
    excerpt:
      "Sitting shortens your hip flexors and weakens your glutes. This short, restorative flow reopens your hips and decompresses your lower back.",
    readMinutes: 4,
    accent: "from-emerald-400/70 to-teal-500/70",
    body: [
      "Stiff hips are one of the most common complaints we hear from women over 45 — and almost always, the culprit is hours of sitting, not age.",
      "A daily 15-minute flow centered on hip openers (low lunge, pigeon, reclined figure-four) and gentle spinal twists can restore range of motion in a matter of weeks. The key is frequency over intensity: a little, often.",
      "Invest in a yoga wheel and a pair of blocks. Blocks bring the floor up to you so you can relax into poses instead of fighting gravity. A wheel gently decompresses the spine and lets you backbend safely.",
      "Pair this with our Yoga Flexibility Progress Calculator to track your seated forward reach week over week. Watching the number climb is surprisingly motivating.",
    ],
  },
  {
    id: "smart-scale-truth",
    category: "Body Composition",
    title: "Stop Watching the Scale: What a Smart Scale Really Tells You",
    excerpt:
      "Body fat %, muscle mass, water weight — a smart scale reframes 'progress' so you stop quitting on week three. Here's how to read yours.",
    readMinutes: 5,
    accent: "from-amber-400/70 to-orange-500/70",
    body: [
      "The number on a regular bathroom scale is a blunt instrument. It can't tell the difference between fat loss, muscle gain, water retention or a salty dinner. That's why so many women quit a perfectly good routine on week three.",
      "A smart scale uses bioelectrical impedance to estimate body fat percentage, muscle mass, water and even bone mass. None of these are lab-accurate, but they're directionally correct — and direction is exactly what you need.",
      "What to actually track: the trend of your body-fat percentage over 4-week windows, not the daily weight. If fat % trends down while muscle % holds steady, you're winning — even if the scale hasn't moved.",
      "Weigh once a week, first thing in the morning, after the bathroom, before water. Log it and step away. The trendline is your friend.",
    ],
  },
];

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
          <div className={`relative h-56 bg-gradient-to-br ${featured.accent} sm:h-72`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
              <div className={`hidden h-24 w-32 shrink-0 rounded-xl bg-gradient-to-br ${a.accent} sm:block`} />
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
            <div className={`relative h-40 bg-gradient-to-br ${article.accent}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
