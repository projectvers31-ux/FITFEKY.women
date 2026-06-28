"use client";

import { useState, useMemo } from "react";
import { Scale, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";

type Unit = "imperial" | "metric";

function bmiCategory(bmi: number): { label: string; tone: string; pct: number } {
  if (bmi < 18.5) return { label: "Underweight", tone: "text-amber-600", pct: 25 };
  if (bmi < 25) return { label: "Healthy range", tone: "text-accent", pct: 50 };
  if (bmi < 30) return { label: "Overweight", tone: "text-amber-600", pct: 72 };
  return { label: "Obese range", tone: "text-rose-600", pct: 90 };
}

export function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("4");
  const [cm, setCm] = useState("163");
  const [lbs, setLbs] = useState("160");
  const [kg, setKg] = useState("72");

  const { bmi, healthyLow, healthyHigh } = useMemo(() => {
    let heightM = 0;
    let weightKg = 0;
    if (unit === "imperial") {
      const f = Number(feet) || 0;
      const i = Number(inches) || 0;
      heightM = (f * 12 + i) * 0.0254;
      weightKg = (Number(lbs) || 0) * 0.45359237;
    } else {
      heightM = (Number(cm) || 0) / 100;
      weightKg = Number(kg) || 0;
    }
    const b = heightM > 0 ? weightKg / (heightM * heightM) : 0;
    // healthy BMI range 18.5–24.9 → healthy weight for this height
    const low = 18.5 * heightM * heightM;
    const high = 24.9 * heightM * heightM;
    return { bmi: b, healthyLow: low, healthyHigh: high };
  }, [unit, feet, inches, cm, lbs, kg]);

  const cat = bmi > 0 ? bmiCategory(bmi) : null;
  const rounded = Math.round(bmi * 10) / 10;

  const fmtWeight = (kgVal: number) =>
    unit === "imperial" ? `${Math.round(kgVal / 0.45359237)} lbs` : `${Math.round(kgVal)} kg`;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-4">
        <ToggleGroup
          type="single"
          value={unit}
          onValueChange={(v) => v && setUnit(v as Unit)}
          className="justify-start"
          aria-label="Unit system"
        >
          <ToggleGroupItem value="imperial" className="rounded-full">Imperial (lb / ft)</ToggleGroupItem>
          <ToggleGroupItem value="metric" className="rounded-full">Metric (kg / cm)</ToggleGroupItem>
        </ToggleGroup>

        {unit === "imperial" ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="feet">Height (ft)</Label>
              <Input id="feet" type="number" min="3" max="8" value={feet} onChange={(e) => setFeet(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="inches">Height (in)</Label>
              <Input id="inches" type="number" min="0" max="11" value={inches} onChange={(e) => setInches(e.target.value)} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="lbs">Weight (lbs)</Label>
              <Input id="lbs" type="number" min="50" max="500" value={lbs} onChange={(e) => setLbs(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label htmlFor="cm">Height (cm)</Label>
              <Input id="cm" type="number" min="120" max="220" value={cm} onChange={(e) => setCm(e.target.value)} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="kg">Weight (kg)</Label>
              <Input id="kg" type="number" min="40" max="200" value={kg} onChange={(e) => setKg(e.target.value)} />
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          BMI is a screening tool — not a full health picture. Body composition
          (muscle vs. fat) matters more after 40, which is why we love smart scales.
        </p>
      </div>

      {/* Result */}
      <div className="flex flex-col justify-center rounded-2xl border border-border/70 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        {bmi > 0 && cat ? (
          <>
            <div className="flex items-end gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Scale size={22} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your BMI</p>
                <p className="font-display text-4xl font-bold text-foreground tabular-nums">{rounded}</p>
              </div>
            </div>
            <p className={`mt-1 text-sm font-semibold ${cat.tone}`}>{cat.label}</p>
            <Progress value={cat.pct} className="mt-4 h-2" />
            <div className="mt-4 rounded-xl bg-card/70 p-3 text-sm">
              <p className="flex items-center gap-1.5 font-medium text-foreground">
                <Heart size={14} className="text-accent" /> Healthy weight for your height
              </p>
              <p className="mt-0.5 text-muted-foreground">
                {fmtWeight(healthyLow)} – {fmtWeight(healthyHigh)}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Enter your height and weight to see your BMI.</p>
        )}
      </div>
    </div>
  );
}
