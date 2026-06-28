"use client";

import { useState, useMemo } from "react";
import { Activity, Heart, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Sex = "female" | "male";
type Unit = "imperial" | "metric";

interface BfCategory {
  label: string;
  tone: string;
  pct: number;
  range: string;
  advice: string;
}

/** American Council on Exercise (ACE) body fat categories for women. */
function bfCategory(bf: number, sex: Sex): BfCategory {
  const tiers: { max: number; label: string; tone: string; pct: number; range: string; advice: string }[] =
    sex === "female"
      ? [
          { max: 13, label: "Essential", tone: "text-sky-600", pct: 12, range: "10–13%", advice: "Minimum fat needed for basic physiological functions." },
          { max: 20, label: "Athletic", tone: "text-accent", pct: 30, range: "14–20%", advice: "Lean, athletic range — common in trained women." },
          { max: 24, label: "Fitness", tone: "text-accent", pct: 48, range: "21–24%", advice: "Healthy and fit — a great target for women over 40." },
          { max: 31, label: "Acceptable", tone: "text-amber-600", pct: 72, range: "25–31%", advice: "Average healthy range for most women." },
          { max: 100, label: "Higher than optimal", tone: "text-rose-600", pct: 92, range: "32%+", advice: "Consider gentle, consistent movement and strength work." },
        ]
      : [
          { max: 5, label: "Essential", tone: "text-sky-600", pct: 10, range: "2–5%", advice: "Minimum fat needed for basic physiological functions." },
          { max: 13, label: "Athletic", tone: "text-accent", pct: 28, range: "6–13%", advice: "Lean, athletic range." },
          { max: 17, label: "Fitness", tone: "text-accent", pct: 46, range: "14–17%", advice: "Healthy and fit." },
          { max: 24, label: "Acceptable", tone: "text-amber-600", pct: 70, range: "18–24%", advice: "Average healthy range for most men." },
          { max: 100, label: "Higher than optimal", tone: "text-rose-600", pct: 90, range: "25%+", advice: "Consider consistent movement and strength work." },
        ];

  return tiers.find((t) => bf <= t.max) ?? tiers[tiers.length - 1];
}

/**
 * U.S. Navy body fat formula (circumference-based). Accurate within ~3% of
 * DEXA scans — the best estimate without calipers or a smart scale.
 *
 * Women: 495 / (1.29579 − 0.35004·log₁₀(waist+hip−neck)) − 450
 * Men:   495 / (1.0324 − 0.19077·log₁₀(waist−neck))   − 450
 *
 * All measurements in inches for the imperial path; converted to cm then
 * back as needed since the formula is unit-invariant when consistent.
 */
export function BodyFatCalculator() {
  const [sex, setSex] = useState<Sex>("female");
  const [unit, setUnit] = useState<Unit>("imperial");
  const [age, setAge] = useState("48");
  const [height, setHeight] = useState("64"); // inches or cm
  const [neck, setNeck] = useState("13");
  const [waist, setWaist] = useState("32");
  const [hip, setHip] = useState("40");

  const { bodyFat, category, ffm } = useMemo(() => {
    const h = Number(height) || 0;
    const n = Number(neck) || 0;
    const w = Number(waist) || 0;
    const hp = Number(hip) || 0;

    if (h <= 0 || n <= 0 || w <= 0) {
      return { bodyFat: null, category: null, ffm: null };
    }

    // Convert everything to inches — the imperial Navy formulas are the
    // reliable standard used by every online calculator.
    const toIn = (v: number) => (unit === "metric" ? v / 2.54 : v);
    const hIn = toIn(h);
    const nIn = toIn(n);
    const wIn = toIn(w);
    const hpIn = toIn(hp);

    let bf: number;
    if (sex === "female") {
      if (hp <= 0) return { bodyFat: null, category: null, ffm: null };
      const val = wIn + hpIn - nIn;
      if (val <= 0) return { bodyFat: null, category: null, ffm: null };
      // U.S. Navy imperial formula for women (inches)
      bf = 163.205 * Math.log10(val) - 97.684 * Math.log10(hIn) - 78.387;
    } else {
      const val = wIn - nIn;
      if (val <= 0) return { bodyFat: null, category: null, ffm: null };
      // U.S. Navy imperial formula for men (inches)
      bf = 86.01 * Math.log10(val) - 70.041 * Math.log10(hIn) + 36.76;
    }

    // Sanity bounds
    bf = Math.max(2, Math.min(60, bf));
    const cat = bfCategory(bf, sex);

    return { bodyFat: Math.round(bf * 10) / 10, category: cat, ffm: null };
  }, [sex, unit, height, neck, waist, hip]);

  const unitLabel = unit === "imperial" ? "in" : "cm";

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-5">
        <div className="flex flex-wrap gap-4">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sex
            </Label>
            <ToggleGroup
              type="single"
              value={sex}
              onValueChange={(v) => v && setSex(v as Sex)}
              className="mt-2 justify-start"
              aria-label="Sex"
            >
              <ToggleGroupItem value="female" className="rounded-full">Female</ToggleGroupItem>
              <ToggleGroupItem value="male" className="rounded-full">Male</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Units
            </Label>
            <ToggleGroup
              type="single"
              value={unit}
              onValueChange={(v) => v && setUnit(v as Unit)}
              className="mt-2 justify-start"
              aria-label="Unit system"
            >
              <ToggleGroupItem value="imperial" className="rounded-full">Imperial</ToggleGroupItem>
              <ToggleGroupItem value="metric" className="rounded-full">Metric</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div>
          <Label htmlFor="bf-age">Age</Label>
          <Input id="bf-age" type="number" min="18" max="100" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="bf-height">Height ({unitLabel})</Label>
          <Input id="bf-height" type="number" min="40" max="220" value={height} onChange={(e) => setHeight(e.target.value)} />
          <p className="mt-1 text-xs text-muted-foreground">
            {unit === "imperial" ? "e.g. 64 = 5′4″" : "e.g. 163 cm"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="bf-neck">Neck ({unitLabel})</Label>
            <Input id="bf-neck" type="number" min="8" max="60" value={neck} onChange={(e) => setNeck(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="bf-waist">Waist ({unitLabel})</Label>
            <Input id="bf-waist" type="number" min="20" max="80" value={waist} onChange={(e) => setWaist(e.target.value)} />
          </div>
        </div>

        {sex === "female" && (
          <div>
            <Label htmlFor="bf-hip">Hip ({unitLabel})</Label>
            <Input id="bf-hip" type="number" min="25" max="80" value={hip} onChange={(e) => setHip(e.target.value)} />
          </div>
        )}

        <div className="flex items-start gap-2 rounded-xl bg-secondary/40 p-3 text-xs text-muted-foreground">
          <Info size={14} className="mt-0.5 shrink-0 text-primary" />
          <span>
            Uses the U.S. Navy circumference method — accurate within ~3% of
            a DEXA scan. Measure at the narrowest part of your waist, the
            widest part of your hips, and just below the larynx on your neck.
          </span>
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col justify-center rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        {bodyFat != null && category ? (
          <>
            <div className="flex items-end gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Activity size={22} />
              </span>
              <div>
                <p className="kicker">Estimated body fat</p>
                <p className="font-display text-4xl font-semibold tracking-tight text-foreground">
                  {bodyFat}<span className="text-2xl">%</span>
                </p>
              </div>
            </div>

            <p className={cn("mt-1 text-sm font-semibold", category.tone)}>
              {category.label} · {category.range}
            </p>

            <Progress value={category.pct} className="mt-4 h-2" />

            <div className="mt-4 rounded-xl bg-card/70 p-3 text-sm">
              <p className="flex items-center gap-1.5 font-medium text-foreground">
                <Heart size={14} className="text-accent" /> What this means
              </p>
              <p className="mt-1 text-muted-foreground">{category.advice}</p>
            </div>

            {/* Healthy range scale */}
            <div className="mt-5">
              <p className="kicker mb-2">Where you land on the scale</p>
              <div className="flex h-2 overflow-hidden rounded-full">
                <div className="flex-1 bg-sky-400/40" title="Essential" />
                <div className="flex-1 bg-accent/50" title="Athletic" />
                <div className="flex-1 bg-accent/70" title="Fitness" />
                <div className="flex-1 bg-amber-400/60" title="Acceptable" />
                <div className="flex-1 bg-rose-400/50" title="Higher" />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                <span>Essential</span>
                <span>Athletic</span>
                <span>Fitness</span>
                <span>Avg</span>
                <span>Higher</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              For women over 40, body fat % is a far better health signal than
              scale weight — muscle is denser than fat, so the mirror and your
              favorite jeans tell the real story. Pair this with a smart scale
              to track the trend monthly.
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter your measurements to estimate your body fat percentage.
          </p>
        )}
      </div>
    </div>
  );
}
