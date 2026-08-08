import type { Metadata } from "next";
import { Footprints, StretchHorizontal, Shield, Quote } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { JoinForm } from "@/components/community/join-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FitFeky Circle | Joint-Friendly Fitness Community for Women 45+",
  description:
    "Join a safe, supportive community of active women 45+ sharing low-impact fitness habits, monthly challenges, and real tips for joint-friendly living at home.",
  robots: { index: true, follow: true },
  keywords: [
    "fitness community for women over 45",
    "low impact workout group",
    "walking pad challenge",
    "joint friendly fitness",
    "active living after 45",
  ],
  ...pageMetadata("/community"),
};

const CHALLENGES = [
  {
    icon: Footprints,
    title: "7-Day Gentle Walking Pad Streak",
    body: "Walk 20 gentle minutes a day for seven days — on a pad, in the park or around the block. Small daily habit, big joint-friendly payoff.",
    meta: "7 days · ~20 min/day · Beginner",
    accent: "from-emerald-400/15 to-teal-400/15",
  },
  {
    icon: StretchHorizontal,
    title: "10-Min Joint-Mobility & Band Stretch",
    body: "A daily resistance-band mobility routine for hips, shoulders and spine. Done after a walk or a workout, it keeps you moving pain-free.",
    meta: "10 min · No equipment needed",
    accent: "from-rose-400/15 to-amber-400/15",
  },
  {
    icon: Shield,
    title: "Post-Workout Knee & Back Relief Protocol",
    body: "Two minutes of gentle targeted stretches after every session to protect the two areas women 45+ most often overdo.",
    meta: "14 days · 2 min after each workout",
    accent: "from-emerald-400/15 to-sky-400/15",
  },
];

const STORIES = [
  {
    initials: "L",
    name: "Linda, 58",
    location: "Austin, TX",
    habit: "20-min walks, 6 days a week",
    accent: "from-rose-400 to-amber-400",
    quote:
      "The walking streak is why a schedule beat a gym membership. Four months in, my knees feel younger. I never miss a Friday plan.",
  },
  {
    initials: "R",
    name: "Rania, 52",
    location: "Chicago, IL",
    habit: "Band mobility every morning",
    accent: "from-emerald-400 to-teal-400",
    quote:
      "I used to let joint stiffness talk me out of moving. A ten-minute band stretch before tea changed that. It feels like a new superpower.",
  },
  {
    initials: "J",
    name: "June, 58",
    location: "Portland, OR",
    habit: "2-min cool-down after each session",
    accent: "from-violet-400 to-purple-400",
    quote:
      "A two-minute recovery cool-down has outlasted every intense plan I ever tried. It covers a small weekly pace, and my back has noticed.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageShell
        kicker="The FitFeky Circle"
        title="Welcome to the FitFeky Circle"
        subtitle="A safe, supportive space for women 45+ embracing active, joint-friendly living at home."
        wide
      >
        {/* Active challenges */}
        <section aria-labelledby="challenges-heading" className="mt-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker mb-2">Monthly challenges</p>
              <h2 id="challenges-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Community challenges
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                Pick a challenge, keep it gentle, and keep each other going.
                Every one is built for joints first.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {CHALLENGES.map((c) => (
              <div
                key={c.title}
                className={`card-modern flex flex-col rounded-2xl border border-border/50 bg-gradient-to-br ${c.accent} p-6 transition-all hover:border-primary/30`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-primary shadow-sm">
                  <c.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                  {c.body}
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {c.meta}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Real stories */}
        <section aria-labelledby="stories-heading" className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker mb-2">Real women · Real habits</p>
            <h2 id="stories-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Real stories, real consistency
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Small, sustainable low-impact habits that actually stuck.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {STORIES.map((s) => (
              <figure
                key={s.name}
                className="card-modern flex flex-col rounded-2xl border border-border/50 bg-card/60 p-6"
              >
                <Quote size={20} className="text-primary/40" />
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/80">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${s.accent}`}
                    aria-hidden
                  >
                    {s.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="text-sm text-muted-foreground">{s.habit}</p>
                    <p className="text-xs text-muted-foreground/70">{s.location}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Newsletter lead magnet */}
        <section aria-labelledby="join-heading" className="mt-16">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border/50 bg-card/50 p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 blob bg-primary/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 blob-2 bg-accent/15 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="kicker mb-3 text-primary">Friday plans</p>
              <h2 id="join-heading" className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Get Your Weekly Joint-Friendly Workout Plan
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                Join 1,000+ women receiving safe exercise routines and gear
                reviews every Friday.
              </p>
              <div className="mt-7 text-left">
                <JoinForm />
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}