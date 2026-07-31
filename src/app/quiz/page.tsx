"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Footprints,
  Home,
  Leaf,
  RotateCcw,
  Scale,
  Sparkles,
  TimerReset,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page-shell";
import { fbTrack } from "@/lib/meta-pixel";

/**
 * The 2-minute Personalized Gear Quiz.
 *
 * 5 gentle questions → a recommended category from the FitFeky catalog.
 * Fires Meta Pixel InitiateCheckout when the quiz starts and
 * CompleteRegistration when results are shown.
 */

type CategoryId = "treadmill" | "resistance_bands" | "yoga_mat" | "smart_scale";

interface QuizOption {
  label: string;
  /** Category this answer leans toward. */
  vote: CategoryId;
}

interface QuizQuestion {
  question: string;
  hint?: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: "What feels best for your body right now?",
    hint: "There's no wrong answer — this is about what you'll enjoy most.",
    options: [
      { label: "Gentle, steady movement every day", vote: "treadmill" },
      { label: "Strength and toning without heavy weights", vote: "resistance_bands" },
      { label: "Stretching, mobility and de-stressing", vote: "yoga_mat" },
      { label: "Tracking progress and staying motivated", vote: "smart_scale" },
    ],
  },
  {
    question: "How much room do you have to move?",
    options: [
      { label: "A small corner — my living room is cozy", vote: "yoga_mat" },
      { label: "A little space beside my desk or sofa", vote: "treadmill" },
      { label: "A spare room or garage corner", vote: "resistance_bands" },
      { label: "No room needed — it lives on a shelf", vote: "smart_scale" },
    ],
  },
  {
    question: "Do your knees, hips or back ever complain?",
    options: [
      { label: "Yes — I want low-impact everything", vote: "treadmill" },
      { label: "Sometimes — I'm careful with movement", vote: "yoga_mat" },
      { label: "Not really — I'm ready to push a little", vote: "resistance_bands" },
      { label: "No issues — just want to see progress", vote: "smart_scale" },
    ],
  },
  {
    question: "What would make you smile most in 6 months?",
    options: [
      { label: "More energy and 8,000 steps a day", vote: "treadmill" },
      { label: "Stronger arms and a firmer core", vote: "resistance_bands" },
      { label: "Being able to touch my toes again", vote: "yoga_mat" },
      { label: "Seeing my numbers trending in the right direction", vote: "smart_scale" },
    ],
  },
  {
    question: "How much do you want to spend to start?",
    options: [
      { label: "Under $50", vote: "yoga_mat" },
      { label: "$50–$150", vote: "resistance_bands" },
      { label: "$150–$400", vote: "smart_scale" },
      { label: "Whatever it takes — this matters to me", vote: "treadmill" },
    ],
  },
];

const CATEGORY_META: Record<
  CategoryId,
  { label: string; blurb: string; gift: string }
> = {
  treadmill: {
    label: "A Walking Pad",
    blurb:
      "Gentle, joint-friendly cardio you can do while watching TV or catching up on emails. The single best habit-builder for daily movement at midlife.",
    gift: "your daily 30 minutes of sunshine-free walking",
  },
  resistance_bands: {
    label: "Resistance Bands",
    blurb:
      "Strength training that protects your joints while building the muscle and bone density your body needs after 45. Easy to store, gentle to start.",
    gift: "stronger arms, a firmer core, and happier joints",
  },
  yoga_mat: {
    label: "A Yoga Mat",
    blurb:
      "Cushioned, non-slip support for stretching, mobility and stress relief. The perfect foundation for flexibility and calm — right on your living room floor.",
    gift: "a softer back, calmer mind, and toes you can actually reach",
  },
  smart_scale: {
    label: "A Smart Scale",
    blurb:
      "Body-composition tracking that shows muscle, water and trends — not just the number. The quiet accountability partner behind every win.",
    gift: "motivation you can actually see, week after week",
  },
};

/** Count votes per category; ties break by this priority (movement-first). */
const TIEBREAK: CategoryId[] = [
  "treadmill",
  "resistance_bands",
  "yoga_mat",
  "smart_scale",
];

function tally(votes: CategoryId[]): CategoryId {
  const counts = new Map<CategoryId, number>();
  for (const v of votes) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best: CategoryId = TIEBREAK[0];
  for (const id of TIEBREAK) {
    if ((counts.get(id) ?? 0) > (counts.get(best) ?? 0)) best = id;
  }
  return best;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<CategoryId[]>([]);
  const [result, setResult] = useState<CategoryId | null>(null);
  const startedRef = useRef(false);

  const answer = useCallback((vote: CategoryId) => {
    // Meta Pixel — quiz started (fires once, on the first answer).
    if (!startedRef.current) {
      startedRef.current = true;
      fbTrack("InitiateCheckout", {
        content_name: "Gear Quiz",
        content_category: "Quiz",
        num_items: 1,
      });
    }
    const next = [...answers, vote];
    setAnswers(next);
    if (next.length >= QUESTIONS.length) {
      const winner = tally(next);
      setResult(winner);
      // Meta Pixel — quiz finished, results shown.
      fbTrack("CompleteRegistration", {
        content_name: "Gear Quiz Results",
        content_category: "Quiz",
        status: "complete",
      });
    } else {
      setStep(step + 1);
    }
  }, [answers, step]);

  const restart = useCallback(() => {
    setAnswers([]);
    setResult(null);
    setStep(0);
    startedRef.current = false;
  }, []);

  const meta = result ? CATEGORY_META[result] : null;
  const progress = result ? 100 : Math.round((step / QUESTIONS.length) * 100);

  return (
    <PageShell
      title="Personalized Gear Quiz"
      subtitle="2 minutes to your perfect match"
      kicker="Find your fit"
      wide
    >
      <section aria-label="Gear quiz" className="mx-auto max-w-2xl px-6 pb-20 sm:px-8">
        {!meta ? (
          <>
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-[#7a9e7e] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {step + 1}/{QUESTIONS.length}
              </span>
            </div>

            {/* Question card */}
            <div className="mt-8 rounded-3xl border border-[#7a9e7e]/25 bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                {QUESTIONS[step].question}
              </h2>
              {QUESTIONS[step].hint && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {QUESTIONS[step].hint}
                </p>
              )}
              <div className="mt-6 grid gap-3">
                {QUESTIONS[step].options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => answer(o.vote)}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-background px-5 py-4 text-left text-[15px] font-medium text-foreground transition-all duration-200 hover:border-[#7a9e7e]/60 hover:bg-[#7a9e7e]/10 hover:shadow-sm active:scale-[0.99]"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full border border-[#7a9e7e]/40 text-[11px] font-semibold text-[#7a9e7e] group-hover:bg-[#7a9e7e] group-hover:text-white">
                      {String.fromCharCode(65 + QUESTIONS[step].options.indexOf(o))}
                    </span>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={restart}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw size={12} /> Start over
            </button>
          </>
        ) : (
          /* Results */
          <div className="rounded-3xl border border-[#7a9e7e]/25 bg-card p-6 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#7a9e7e]/15 text-[#7a9e7e]">
              <Leaf size={30} strokeWidth={1.5} />
            </div>
            <p className="kicker mt-5 text-[#7a9e7e]">Your match</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {meta.label}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {meta.blurb}
            </p>
            <p className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-[#7a9e7e]/10 px-4 py-3 text-sm font-medium text-foreground">
              <Sparkles size={14} className="shrink-0 text-[#7a9e7e]" />
              Your gift from this quiz: {meta.gift}.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="rounded-full bg-[#7a9e7e] px-7 hover:bg-[#6b8f6f]">
                <Link href={`/?category=${result}`}>
                  Browse {meta.label}s <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-[#7a9e7e]/40 px-7 hover:bg-[#7a9e7e]/10">
                <Link href="/">
                  <Home size={15} /> Back to Home
                </Link>
              </Button>
            </div>
            <button
              onClick={restart}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <TimerReset size={12} /> Retake the quiz
            </button>
          </div>
        )}

        {/* Category shortcut footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground">
          <Scale size={13} className="text-[#7a9e7e]" />
          <span>Not feeling it? Jump straight to:</span>
          <Link href="/?category=treadmill" className="font-medium text-foreground underline-offset-2 hover:text-[#7a9e7e] hover:underline">Walking Pads</Link>
          <span>·</span>
          <Link href="/?category=resistance_bands" className="font-medium text-foreground underline-offset-2 hover:text-[#7a9e7e] hover:underline">Resistance Bands</Link>
          <span>·</span>
          <Link href="/?category=yoga_mat" className="font-medium text-foreground underline-offset-2 hover:text-[#7a9e7e] hover:underline">Yoga Mats</Link>
          <span>·</span>
          <Link href="/?category=smart_scale" className="font-medium text-foreground underline-offset-2 hover:text-[#7a9e7e] hover:underline">Smart Scales</Link>
        </div>
        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
          <Footprints size={12} /> Answers are kept on your device — nothing is saved.
        </p>
      </section>
    </PageShell>
  );
}
