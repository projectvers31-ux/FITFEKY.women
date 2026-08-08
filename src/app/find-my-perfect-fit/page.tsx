"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Calendar,
  Check,
  Clock,
  Compass,
  Dumbbell,
  ExternalLink,
  Heart,
  HeartHandshake,
  Leaf,
  ListChecks,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  TimerReset,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page-shell";
import { RecommendedProductCard } from "@/components/products/recommended-product-card";
import { RecommendedProductsTable } from "@/components/products/recommended-products-table";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { getProductById } from "@/lib/product-utils";
import { MATCH_PICK_THEME, MATCH_RECOMMENDATIONS } from "@/data/match-recommendations";
import { fbTrack } from "@/lib/meta-pixel";

/**
 * Find My Perfect Fit — FitFeky's flagship 5-question wellness assessment.
 *
 * Welcome → age → main goal → knee pain → activity → budget → AI Analysis
 * (animated) → personalized wellness plan → recommended products →
 * compare products → buyer's guide → view on Amazon. Answers auto-save to
 * localStorage so nothing is lost on refresh. Designed to be easy for
 * women aged 45–65.
 */

type MatchId = "treadmill" | "resistance_bands" | "yoga_mat" | "smart_scale";

const TOTAL_STEPS = 5;
const STORAGE_KEY = "fitfeky:find-my-perfect-fit:v3";

/* ---------- answer shapes ---------- */

interface Answers {
  age?: number;
  mainGoal?: string;
  kneePain?: string;
  activity?: string;
  budget?: string;
}

type AnswerValue = number | string;

/* ---------- question data ---------- */

type ChoiceDef = { label: string; hint?: string; vote: MatchId };

interface StepDef {
  id: keyof Answers;
  kind: "number" | "choice";
  question: string;
  hint?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  fallback?: number;
  choices?: ChoiceDef[];
}

const STEPS: StepDef[] = [
  {
    id: "age",
    kind: "number",
    question: "What is your age?",
    hint: "Tap the + / − buttons to set your age — this tunes the plan to your body right now.",
    unit: "years",
    min: 18,
    max: 100,
    step: 1,
    fallback: 55,
  },
  {
    id: "mainGoal",
    kind: "choice",
    question: "What is your main goal?",
    hint: "Pick the option that feels most like you today.",
    choices: [
      { label: "Lose Weight", hint: "Steady, healthy change", vote: "treadmill" },
      { label: "Build Strength", hint: "Tone without heavy weights", vote: "resistance_bands" },
      { label: "Improve Mobility", hint: "Move and bend with ease", vote: "yoga_mat" },
      { label: "Joint Pain Relief", hint: "Gentler movement, less strain", vote: "treadmill" },
      { label: "Healthy Lifestyle", hint: "Sustainable habits, all around", vote: "resistance_bands" },
    ],
  },
  {
    id: "kneePain",
    kind: "choice",
    question: "Do you have knee pain?",
    hint: "Be honest — the plan is built around what your knees can enjoy.",
    choices: [
      { label: "Yes, regularly", hint: "Knees complain day to day", vote: "treadmill" },
      { label: "Sometimes", hint: "Only on some activities", vote: "yoga_mat" },
      { label: "No, not really", hint: "Knees feel fine", vote: "resistance_bands" },
    ],
  },
  {
    id: "activity",
    kind: "choice",
    question: "How active are you?",
    hint: "No judgement — answer honestly, it helps us get it right.",
    choices: [
      { label: "Just starting out", hint: "Little to no regular activity", vote: "yoga_mat" },
      { label: "Occasionally active", hint: "A weekly walk or class", vote: "treadmill" },
      { label: "Regularly active", hint: "Moving most days of the week", vote: "resistance_bands" },
      { label: "Very active", hint: "Structured sessions several days", vote: "smart_scale" },
    ],
  },
  {
    id: "budget",
    kind: "choice",
    question: "What is your budget?",
    hint: "There is a quality pick at every price level.",
    choices: [
      { label: "Under $50", hint: "Mats, bands, small tools", vote: "yoga_mat" },
      { label: "$50 – $150", hint: "Great mid-range options", vote: "resistance_bands" },
      { label: "$150 – $400", hint: "Walking pads and more", vote: "treadmill" },
      { label: "$400 – $1,000", hint: "Full setups and smart gear", vote: "smart_scale" },
      { label: "Open – quality first", hint: "Show me the best", vote: "treadmill" },
    ],
  },
];

const MATCH_META: Record<
  MatchId,
  { label: string; blurb: string; gift: string; plan: string[]; cta: string; guide: { title: string; bullets: string[] } }
> = {
  treadmill: {
    label: "A Walking Pad",
    blurb:
      "Gentle, joint-friendly cardio you can ease into — while watching TV, catching up on a podcast or standing through a call. The most repeatable habit-builder for daily movement at midlife.",
    gift: "a daily dose of low-impact movement you can actually keep",
    plan: [
      "Start with 10 gentle minutes, three times this week.",
      "Ramp by 2–3 minutes each week until you reach 20.",
      "Pair it with knee-friendly shoes and a flat surface.",
    ],
    cta: "Browse Walking Pads",
    guide: {
      title: "Learn what makes a walking pad kind to your knees",
      bullets: [
        "Look for a deck long enough for your full stride.",
        "A quiet, brushless motor keeps morning walks private.",
        "Folding models slide under a desk or bed between uses.",
      ],
    },
  },
  resistance_bands: {
    label: "Resistance Bands",
    blurb:
      "Strength that protects your joints while building the muscle and bone density your body needs after 45. Easy to store, gentle to start, endlessly adjustable.",
    gift: "resilient joints and steady, visible strength gains",
    plan: [
      "Begin with light tension — 8–10 reps, two rounds.",
      "Learn two hinge and two press patterns first.",
      "Add a session every other day, never through pain.",
    ],
    cta: "Browse Resistance Bands",
    guide: {
      title: "How to choose a band set that grows with you",
      bullets: [
        "Cushioned handles make grips kinder to your hands.",
        "Multiple resistance levels let you start light and progress.",
        "Carry bags mean no equipment excuses when you travel.",
      ],
    },
  },
  yoga_mat: {
    label: "A Yoga Mat & Mobility Set",
    blurb:
      "Cushioned, non-slip support for stretching, mobility and genuine calm. The perfect foundation for flexibility — right on your living room floor, at whatever pace feels right.",
    gift: "a softer back, a calmer mind, and range you can actually feel",
    plan: [
      "Do one 8-minute floor stretch before bed.",
      "Use a mat with real cushioning for knees and hips.",
      "Add a deep-breath minute after every session.",
    ],
    cta: "Browse Yoga Mats",
    guide: {
      title: "What to look for in a mat that flatters older joints",
      bullets: [
        "Extra thickness cushions knees in kneeling poses.",
        "A non-slip top surface keeps poses stable.",
        "Longer mats give hips and shoulders room to move.",
      ],
    },
  },
  smart_scale: {
    label: "A Smart Scale",
    blurb:
      "Body-composition tracking that shows muscle, water and honest trends — not just a single number. The quiet accountability partner behind every small win.",
    gift: "motivation you can clearly see, week after week",
    plan: [
      "Weigh in at the same time twice a week.",
      "Watch trends, not single weigh-ins.",
      "Celebrate non-scale wins: energy, sleep, stairs.",
    ],
    cta: "Browse Smart Scales",
    guide: {
      title: "How smart scales give you feedback, not judgement",
      bullets: [
        "A large display makes numbers easy to read mid-morning.",
        "Muscle and water trends beat a single weigh-in.",
        "Private app syncing keeps your progress yours alone.",
      ],
    },
  },
};

const TIEBREAK: MatchId[] = [
  "treadmill",
  "resistance_bands",
  "yoga_mat",
  "smart_scale",
];

function tally(votes: MatchId[]): MatchId {
  const counts = new Map<MatchId, number>();
  for (const v of votes) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best: MatchId = TIEBREAK[0];
  for (const id of TIEBREAK) {
    if ((counts.get(id) ?? 0) > (counts.get(best) ?? 0)) best = id;
  }
  return best;
}

function votesFromAnswers(a: Answers): MatchId[] {
  const votes: MatchId[] = [];
  (["mainGoal", "kneePain", "activity", "budget"] as const).forEach((id) => {
    const chosen = a[id] as string | undefined;
    if (!chosen) return;
    const def = STEPS.find((s) => s.id === id);
    const vote = def?.choices?.find((c) => c.label === chosen)?.vote;
    if (vote) votes.push(vote);
    // Guarantee the main goal is never outvoted by routine info
    if (id === "mainGoal" && vote) votes.push(vote);
  });
  return votes;
}

/* ---------- localStorage auto-save ---------- */

interface SavedState {
  answers: Answers;
  step: number;
}

const EMPTY_ANSWERS: Answers = {};

function loadSaved(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedState;
    if (!parsed || typeof parsed.answers !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

/* ---------- page ---------- */

type Phase = "questions" | "analysis" | "results";

interface CoachPlan {
  summary?: string;
  workoutStyle?: string;
  equipment?: string[];
  routines?: string;
  habits?: string[];
  safety?: string[];
  motivation?: string;
}

export default function FindMyPerfectFitPage() {
  const saved = useMemo(() => loadSaved(), []);
  const [started, setStarted] = useState(
    () => saved !== null && (saved.step > 0 || Object.keys(saved.answers).length > 0),
  );
  const [step, setStep] = useState(saved?.step ?? 0);
  const [answers, setAnswers] = useState<Answers>(saved?.answers ?? EMPTY_ANSWERS);
  const [phase, setPhase] = useState<Phase>("questions");
  const [match, setMatch] = useState<MatchId | null>(null);
  const [coach, setCoach] = useState<CoachPlan | null>(null);
  const [coachStatus, setCoachStatus] = useState<"loading" | "ready" | "error">("loading");
  const startedRef = useRef(false);

  // Auto-save to localStorage on every change (answers + position).
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step }));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [answers, step]);

  const fireStart = useCallback(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      fbTrack("InitiateCheckout", {
        content_name: "Find My Perfect Fit",
        content_category: "Assessment",
        num_items: 1,
      });
    }
  }, []);

  const isAnswered = useCallback(
    (s: number): boolean => {
      const def = STEPS[s];
      if (!def) return true;
      const v = answers[def.id];
      if (def.kind === "number") return typeof v === "number";
      return typeof v === "string" && v.length > 0;
    },
    [answers],
  );

  const next = useCallback(() => {
    fireStart();
    if (step >= TOTAL_STEPS - 1) {
      const votes = votesFromAnswers(answers);
      if (votes.length) {
        setMatch(tally(votes));
        setPhase("analysis");
      }
      return;
    }
    setStep((p) => Math.min(p + 1, TOTAL_STEPS - 1));
  }, [answers, step, fireStart]);

  const back = useCallback(() => setStep((p) => Math.max(p - 1, 0)), []);

  const restart = useCallback(() => {
    setAnswers(EMPTY_ANSWERS);
    setStep(0);
    setMatch(null);
    setPhase("questions");
    setCoach(null);
    setCoachStatus("loading");
    setStarted(false);
    startedRef.current = false;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const setAnswer = useCallback((id: keyof Answers, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  // AI analysis — min ~3s of visible "analyzing" while the coach plan loads.
  useEffect(() => {
    if (phase !== "analysis" || !match) return;
    let cancelled = false;
    const startedAt = Date.now();
    const load = async () => {
      const settle = async () => {
        const elapsed = Date.now() - startedAt;
        if (elapsed < 3000) {
          await new Promise((r) => setTimeout(r, 3000 - elapsed));
        }
      };
      try {
        const res = await fetch("/api/ai/fit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            match,
            answers: {
              age: answers.age,
              mainGoal: answers.mainGoal,
              fitnessLevel: answers.activity,
              budget: answers.budget,
              conditions: answers.kneePain && answers.kneePain !== "No, not really" ? ["Knee issues"] : [],
            },
          }),
        });
        const data = (await res.json()) as { ok?: boolean } & CoachPlan & { error?: string };
        await settle();
        if (cancelled) return;
        setCoach(data.ok ? data : null);
        setCoachStatus(data.ok ? "ready" : "error");
      } catch {
        await settle();
        if (cancelled) return;
        setCoach(null);
        setCoachStatus("error");
      }
      if (!cancelled) {
        setPhase("results");
        fbTrack("CompleteRegistration", {
          content_name: "Find My Perfect Fit Results",
          content_category: "assessment",
          status: "complete",
        });
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [phase, match, answers]);

  const progress = phase === "results" ? 100 : Math.round((step / TOTAL_STEPS) * 100);
  const answered = isAnswered(step);
  const meta = match ? MATCH_META[match] : null;

  return (
    <PageShell
      kicker="Find My Perfect Fit"
      title="Find My Perfect Fit"
      subtitle="Answer 5 gentle questions and receive your personalized wellness plan — powered by our AI coach."
      wide
    >
      {!started && phase === "questions" && !meta ? (
        <StartScreen
          onStart={() => {
            fireStart();
            setStarted(true);
          }}
          hasSaved={!!saved && Object.keys(saved.answers).length > 0}
        />
      ) : phase === "analysis" ? (
        <AnalysisScreen />
      ) : meta ? (
        <Results
          meta={meta}
          match={match as MatchId}
          onRestart={restart}
          answers={answers}
          coach={coach}
          coachStatus={coachStatus}
        />
      ) : (
        <>
          {/* Progress */}
          <div className="mx-auto max-w-2xl pt-2">
            <div
              className="flex items-center gap-3"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Assessment progress"
            >
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-[#7a9e7e] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-sm tabular-nums text-muted-foreground">
                Step {step + 1} of {TOTAL_STEPS}
              </span>
            </div>
          </div>

          {/* Question */}
          <div className="mx-auto mt-6 max-w-2xl">
            <StepCard step={step} def={STEPS[step]} value={answers[STEPS[step].id]} onChange={(v) => setAnswer(STEPS[step].id, v)} />
          </div>

          {/* Prev / Next */}
          <div className="mx-auto mt-6 flex max-w-2xl gap-3 px-2 sm:px-6">
            <Button
              variant="outline"
              size="lg"
              onClick={back}
              disabled={step === 0}
              aria-label="Previous question"
              className="h-14 min-w-0 flex-1 gap-2 rounded-full border-border/70 text-[15px] font-medium sm:flex-none sm:px-8"
            >
              <ArrowLeft size={18} /> Previous
            </Button>
            <Button
              size="lg"
              onClick={next}
              disabled={!answered}
              aria-label={step === TOTAL_STEPS - 1 ? "Start my AI analysis" : "Next question"}
              className="group h-14 min-w-0 flex-1 gap-2 rounded-full bg-[#7a9e7e] px-8 text-[15px] font-medium shadow-md shadow-[#7a9e7e]/20 hover:bg-[#6b8f6f] disabled:opacity-50 sm:flex-none sm:px-10"
            >
              {step === TOTAL_STEPS - 1 ? (
                <>
                  Run AI Analysis <BrainCircuit size={18} className="transition-transform group-hover:rotate-12" />
                </>
              ) : (
                <>
                  Next <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>

          <p className="mx-auto mt-5 flex max-w-2xl items-center justify-center gap-1.5 px-2 text-center text-xs text-muted-foreground sm:px-6">
            <Lock size={11} /> Your answers auto-save on this device as you advance.
          </p>
        </>
      )}
    </PageShell>
  );
}

/* ---------- start screen ---------- */

function StartScreen({ onStart, hasSaved }: { onStart: () => void; hasSaved: boolean }) {
  return (
    <section aria-label="Welcome" className="mx-auto max-w-2xl pt-2 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#7a9e7e]/15 text-[#7a9e7e]">
        <HeartHandshake size={30} strokeWidth={1.5} />
      </div>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Welcome 👋
      </h2>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        Let&rsquo;s find the fitness gear that fits your body, your goals and your real life —
        just 5 gentle questions, then your personalized wellness plan.
      </p>
      <div className="mx-auto mt-5 inline-flex flex-wrap items-center justify-center gap-2 text-[13px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-[#7a9e7e]" /> 2 minutes</span>
        <span className="inline-flex items-center gap-1.5"><Lock size={13} className="text-[#7a9e7e]" /> Auto-saved as you go</span>
        <span className="inline-flex items-center gap-1.5"><BrainCircuit size={13} className="text-[#7a9e7e]" /> AI-powered plan</span>
      </div>
      <Button
        size="lg"
        onClick={onStart}
        className="group mt-7 h-14 gap-2 rounded-full bg-[#7a9e7e] px-10 text-base font-medium shadow-lg shadow-[#7a9e7e]/25 transition-transform hover:scale-[1.03] hover:bg-[#6b8f6f] active:scale-[0.98]"
        aria-label="Start my personalized assessment"
      >
        {hasSaved ? "Continue My Assessment" : "Start My Assessment"}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        No account needed. Your answers stay on this device.
      </p>

      <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
        <FactCard icon={Sparkles} title="5 quick questions" body="One shown at a time — age, goal, knees, activity, budget." />
        <FactCard icon={BrainCircuit} title="AI analysis" body="A personal wellness plan shaped around your answers." />
        <FactCard icon={Leaf} title="Start small, stay safe" body="Recommendations built for joints, knees and real life." />
      </div>
    </section>
  );
}

function FactCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/70 p-5 shadow-sm">
      <span className="grid size-10 place-items-center rounded-full bg-[#7a9e7e]/12 text-[#7a9e7e]">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/* ---------- AI analysis screen ---------- */

const ANALYSIS_PHASES = [
  { icon: Check, label: "Reading your answers" },
  { icon: Heart, label: "Checking your joint-friendly needs" },
  { icon: Compass, label: "Matching quality-scored gear" },
  { icon: Sparkles, label: "Writing your personal wellness plan" },
];

function AnalysisScreen() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1050);
    return () => clearInterval(id);
  }, []);

  return (
    <section aria-label="AI analysis in progress" className="mx-auto max-w-md text-center">
      <div className="relative mx-auto flex size-24 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#7a9e7e]/20" />
        <span className="relative grid size-20 place-items-center rounded-full bg-[#7a9e7e]/15 text-[#7a9e7e]">
          <BrainCircuit size={34} className="animate-pulse" strokeWidth={1.5} />
        </span>
      </div>

      <p className="kicker mt-6 text-[#7a9e7e]">AI Analysis</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Building your plan…
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        Wait — our coach is studying your answers and hand‑picking the gear that fits you best.
      </p>

      {/* Progress list */}
      <div className="mt-8 space-y-2.5 text-left" aria-live="polite">
        {ANALYSIS_PHASES.map((p, i) => {
          const Icon = p.icon;
          const done = tick > i;
          const active = tick === i;
          return (
            <div
              key={p.label}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500 ${
                done
                  ? "border-[#7a9e7e]/40 bg-[#7a9e7e]/10"
                  : active
                    ? "border-[#7a9e7e]/60 bg-[#7a9e7e]/5"
                    : "border-border/60 bg-background opacity-50"
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full ${
                  done ? "bg-[#7a9e7e] text-white" : "bg-[#7a9e7e]/12 text-[#7a9e7e]"
                }`}
              >
                {done ? <Check size={15} strokeWidth={3} /> : <Icon size={15} className={active ? "animate-pulse" : ""} />}
              </span>
              <span className="text-sm font-medium text-foreground/90">{p.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-[#7a9e7e] transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(95, tick * 30)}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">Almost there — hang tight…</p>
    </section>
  );
}

/* ---------- single question card ---------- */

function StepCard({
  step,
  def,
  value,
  onChange,
}: {
  step: number;
  def: StepDef;
  value: unknown;
  onChange: (v: AnswerValue) => void;
}) {
  const selected = typeof value === "string" ? value : "";

  return (
    <div className="rounded-3xl border border-[#7a9e7e]/25 bg-card p-6 shadow-sm sm:p-8 animate-fade-up" aria-live="polite">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7a9e7e]">
        Question {step + 1} of {TOTAL_STEPS}
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[1.6rem]">
        {def.question}
      </h2>
      {def.hint && <p className="mt-2 text-sm text-muted-foreground">{def.hint}</p>}

      {def.kind === "number" && (
        <NumberStepper
          unit={def.unit ?? ""}
          min={def.min ?? 0}
          max={def.max ?? 100}
          step={def.step ?? 1}
          value={typeof value === "number" ? value : def.fallback ?? 0}
          onInput={(n) => onChange(n)}
        />
      )}

      {def.kind === "choice" && def.choices && (
        <div className="mt-6 grid gap-3">
          {def.choices.map((c) => {
            const active = c.label === selected;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => onChange(c.label)}
                aria-pressed={active}
                className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 sm:px-5 ${
                  active
                    ? "border-[#7a9e7e] bg-[#7a9e7e]/10 shadow-sm"
                    : "border-border bg-background hover:border-[#7a9e7e]/60 hover:bg-[#7a9e7e]/5"
                }`}
              >
                <span className={`grid size-6 shrink-0 place-items-center rounded-full border transition-colors ${
                  active ? "border-[#7a9e7e] bg-[#7a9e7e] text-white" : "border-[#7a9e7e]/40 text-transparent"
                }`}>
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug text-foreground">{c.label}</span>
                  {c.hint && <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{c.hint}</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- big number stepper ---------- */

function NumberStepper({
  unit,
  min,
  max,
  step,
  value,
  onInput,
}: {
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onInput: (n: number) => void;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-3 py-3 sm:px-4">
      <button
        type="button"
        onClick={() => onInput(clamp(value - step))}
        aria-label="Decrease age"
        className="grid size-12 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-[#7a9e7e] hover:bg-[#7a9e7e]/10 active:scale-95"
      >
        <Minus size={20} />
      </button>
      <span aria-live="polite" className="flex flex-col items-center text-center">
        <span className="font-display text-4xl font-semibold tabular-nums leading-none text-foreground">
          {value}
          {unit && <span className="ml-1 text-lg font-medium text-muted-foreground">{unit}</span>}
        </span>
      </span>
      <button
        type="button"
        onClick={() => onInput(clamp(value + step))}
        aria-label="Increase age"
        className="grid size-12 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-[#7a9e7e] hover:bg-[#7a9e7e]/10 active:scale-95"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

/* ---------- results ---------- */

function Results({
  meta,
  match,
  onRestart,
  answers,
  coach,
  coachStatus,
}: {
  meta: (typeof MATCH_META)[MatchId];
  match: MatchId;
  onRestart: () => void;
  answers: Answers;
  coach: CoachPlan | null;
  coachStatus: "loading" | "ready" | "error";
}) {
  const picks = MATCH_RECOMMENDATIONS[match];
  const theme = MATCH_PICK_THEME[match];

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-fade-up" aria-live="polite">
      {/* Step 1 — AI Analysis */}
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-[#7a9e7e] text-white">
          <BrainCircuit size={17} />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            AI Analysis
          </p>
          <p className="text-sm font-semibold text-foreground">
            Complete — here is what it found for you
          </p>
        </div>
      </div>

      {/* Match result card */}
      <div className="rounded-3xl border border-[#7a9e7e]/25 bg-card p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#7a9e7e]/15 text-[#7a9e7e]">
          <Leaf size={30} strokeWidth={1.5} />
        </div>
        <p className="kicker mt-5 text-[#7a9e7e]">Your match</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {meta.label}
        </h2>

        {answers.age && (
          <p className="mt-3 text-sm text-muted-foreground">
            Based on your answers — age {answers.age}
            {answers.kneePain === "Yes, regularly" && ", protecting your knees"}
          </p>
        )}

        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">{meta.blurb}</p>

        <p className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-[#7a9e7e]/10 px-4 py-3 text-sm font-medium text-foreground">
          <Sparkles size={14} className="shrink-0 text-[#7a9e7e]" />
          Your gift from this match: {meta.gift}.
        </p>
      </div>

      {/* 2 — AI personalized wellness plan */}
      <FunnelStep icon={BrainCircuit} title="Your Personalized Wellness Plan" label="AI analysis">
        {coachStatus === "ready" && coach ? (
          <CoachReport plan={coach} />
        ) : coachStatus === "error" ? (
          <div className="rounded-3xl border border-[#7a9e7e]/25 bg-card p-6 shadow-sm sm:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles size={15} className="text-[#7a9e7e]" /> Your personalized plan
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your AI coach will personalize this even more once its API key is configured.
              Either way, your gentle starter plan below is ready to guide you today.
            </p>
            <PlanList items={meta.plan} />
          </div>
        ) : (
          <div className="rounded-3xl border border-border/70 bg-secondary/30 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#7a9e7e]/15 text-[#7a9e7e]">
                <Sparkles size={22} className="animate-pulse" />
              </span>
              <p className="text-sm font-medium text-foreground">Your personal wellness coach is writing your plan…</p>
            </div>
          </div>
        )}

        {/* Gentle 2-week start — always available */}
        <div className="mt-4 rounded-2xl border border-border/70 bg-secondary/30 p-5 text-left">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Leaf size={13} className="text-[#7a9e7e]" /> Your gentle 2-week start
          </p>
          <PlanList items={meta.plan} />
        </div>
      </FunnelStep>

      {/* 3 — Recommended products */}
      {picks?.length ? (
        <div>
          <FunnelStep icon={ListChecks} title="Recommended Products" label="Quality over quantity">
            <p className="text-sm text-muted-foreground">
              {theme?.intro ?? "A small, hand-curated set — no overwhelming walls of options."}
            </p>
            <div className="mt-4 space-y-4">
              {picks.map((rec) => (
                <RecommendedProductCard key={rec.asin} rec={rec} />
              ))}
            </div>
          </FunnelStep>
        </div>
      ) : null}

      {/* 4 — Compare products */}
      {picks?.length ? (
        <FunnelStep icon={ListChecks} title="Compare Products" label="Side by side">
          <p className="text-sm text-muted-foreground">
            See price, rating, difficulty, noise, warranty and space side by side — then explore the
            full quality-scored catalog.
          </p>
          <div className="mt-4">
            <RecommendedProductsTable picks={picks} />
          </div>
          <div className="mt-4 flex justify-start">
            <Button asChild size="lg" variant="outline" className="rounded-full border-[#7a9e7e]/40 px-6 hover:bg-[#7a9e7e]/10">
              <Link href="/compare">
                Compare All Products <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </FunnelStep>
      ) : null}

      {/* 5 — Read Buyer's Guide */}
      <FunnelStep icon={BookOpen} title="Read Buyer's Guide" label="Buy with confidence">
        <p className="text-sm text-muted-foreground">{meta.guide.title}.</p>
        <ul className="mt-3 space-y-2.5">
          {meta.guide.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7a9e7e]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-start">
          <Button asChild size="lg" variant="outline" className="rounded-full border-[#7a9e7e]/40 px-6 hover:bg-[#7a9e7e]/10">
            <Link href="/compare">
              Read the Full Buyer's Guide <BookOpen size={16} />
            </Link>
          </Button>
        </div>
      </FunnelStep>

      {/* 6 — View on Amazon */}
      {picks?.length ? (
        <FunnelStep icon={ExternalLink} title="View on Amazon" label="Secure, official links" isLast>
          <p className="text-sm text-muted-foreground">
            Prices and availability are set by Amazon — every link below opens the official listing.
          </p>
          <div className="mt-4 space-y-3">
            {picks.map((rec) => {
              const product = getProductById(rec.asin);
              if (!product) return null;
              return (
                <div key={rec.asin} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold leading-snug text-foreground">
                      {product.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {product.priceDisplay ?? "Live pricing on Amazon"}
                    </p>
                  </div>
                  <AffiliateButton
                    href={product.affiliateUrl}
                    label="View on Amazon"
                    contentId={product.id}
                    contentName={product.title}
                    price={product.price}
                    size="sm"
                    className="h-11 whitespace-nowrap"
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            As an Amazon Associate, FitFeky earns from qualifying purchases at no extra cost to you.
          </p>
        </FunnelStep>
      ) : null}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-center">
        <Button asChild size="lg" className="rounded-full bg-[#7a9e7e] px-7 hover:bg-[#6b8f6f]">
          <Link href={`/?category=${match}`}>
            {meta.cta} <ArrowRight size={16} />
          </Link>
        </Button>
        <Button variant="ghost" onClick={onRestart} className="inline-flex items-center gap-1.5 rounded-full px-5 text-sm text-muted-foreground hover:text-foreground">
          <TimerReset size={14} /> Retake the assessment
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><BadgeCheck size={13} className="text-[#7a9e7e]" /> Every pick editor-scored</span>
        <span className="inline-flex items-center gap-1.5"><Lock size={13} className="text-[#7a9e7e]" /> Answers never leave your device</span>
        <span className="inline-flex items-center gap-1.5"><Sparkles size={13} className="text-[#7a9e7e]" /> Free, no signup</span>
      </div>
    </div>
  );
}

/** Section wrapper that mirrors the funnel step labels. */
function FunnelStep({
  icon: Icon,
  title,
  label,
  isLast,
  children,
}: {
  icon: LucideIcon;
  title: string;
  label: string;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="relative pl-12 sm:pl-14">
      {/* connector line */}
      {!isLast && <span aria-hidden className="absolute left-[17px] top-12 h-[calc(100%-2rem)] w-px bg-[#7a9e7e]/30" />}
      <span className="absolute left-0 top-0 grid size-9 place-items-center rounded-full border border-[#7a9e7e]/40 bg-card text-[#7a9e7e]">
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function PlanList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((p, i) => (
        <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/85">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7a9e7e]" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

/** Renders the structured AI coach output. */
function CoachReport({ plan }: { plan: CoachPlan }) {
  return (
    <div className="space-y-4 text-left">
      {plan.summary && (
        <CoachCard icon={Heart} title="Your personalized summary">
          <p className="text-sm leading-relaxed text-foreground/85">{plan.summary}</p>
        </CoachCard>
      )}

      {plan.workoutStyle && (
        <CoachCard icon={Activity} title="Recommended workout style">
          <p className="text-sm leading-relaxed text-foreground/85">{plan.workoutStyle}</p>
        </CoachCard>
      )}

      {plan.routines && (
        <CoachCard icon={Calendar} title="Your gentle weekly routine">
          <p className="text-sm leading-relaxed text-foreground/85">{plan.routines}</p>
        </CoachCard>
      )}

      {plan.equipment?.length ? (
        <CoachCard icon={Dumbbell} title="Recommended equipment">
          <ul className="space-y-2">
            {plan.equipment.map((e, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7a9e7e]" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </CoachCard>
      ) : null}

      {plan.habits?.length ? (
        <CoachCard icon={Leaf} title="Healthy habit suggestions">
          <ul className="space-y-2">
            {plan.habits.map((h, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7a9e7e]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </CoachCard>
      ) : null}

      {plan.safety?.length ? (
        <CoachCard icon={ShieldCheck} title="Safety advice">
          <ul className="space-y-2">
            {plan.safety.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </CoachCard>
      ) : null}

      {plan.motivation && (
        <div className="rounded-2xl bg-[#7a9e7e]/10 p-5 text-center">
          <p className="text-[15px] font-medium leading-relaxed text-foreground">
            &ldquo;{plan.motivation}&rdquo;
          </p>
        </div>
      )}

      <p className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
        These are general wellness suggestions, not medical advice. If you have
        an injury, condition or any concerns, please consult a qualified
        healthcare professional before starting something new.
      </p>
    </div>
  );
}

function CoachCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="grid size-8 place-items-center rounded-full bg-[#7a9e7e]/12 text-[#7a9e7e]">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        {title}
      </p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}