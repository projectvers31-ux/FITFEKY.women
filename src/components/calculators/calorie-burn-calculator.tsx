"use client";

import { useState, useMemo } from "react";
import { Flame, Footprints, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * MET-based calorie burn. Activities chosen to match the catalog's low-impact,
 * women-40+ focus. MET values are conservative moderate-effort estimates.
 */
const ACTIVITIES: { id: string; label: string; met: number; calc: string }[] = [
  { id: "walking", label: "Walking pad (2.5 mph)", met: 3.0, calc: "Calories Burned Walking Calculator" },
  { id: "yoga", label: "Yoga / stretching flow", met: 2.5, calc: "Yoga Calorie Burn Calculator" },
  { id: "bands", label: "Resistance band workout", met: 3.5, calc: "Resistance Band Workout Calculator" },
  { id: "dumbbells", label: "Light dumbbell training", met: 3.5, calc: "Dumbbell Workout Calorie Calculator" },
  { id: "jumprope", label: "Jump rope (easy pace)", met: 7.0, calc: "Jump Rope Calorie Burn Calculator" },
  { id: "home", label: "General home workout", met: 3.5, calc: "Home Workout Calorie Calculator" },
  { id: "row", label: "Rowing machine (moderate)", met: 4.5, calc: "Fitness Calorie Calculator" },
  { id: "foam", label: "Foam rolling / mobility", met: 2.0, calc: "Muscle Recovery Time Calculator" },
];

export function CalorieBurnCalculator({
  onActivityChange,
}: {
  onActivityChange?: (calculatorId: string) => void;
}) {
  const [activity, setActivity] = useState(ACTIVITIES[0].id);
  const [weightLbs, setWeightLbs] = useState("160");
  const [minutes, setMinutes] = useState("30");

  const { calories, steps } = useMemo(() => {
    const a = ACTIVITIES.find((x) => x.id === activity) ?? ACTIVITIES[0];
    const kg = (Number(weightLbs) || 0) * 0.45359237;
    const hrs = (Number(minutes) || 0) / 60;
    const cal = a.met * kg * hrs;
    // ~0.04 cal per step for an average adult
    const st = Math.round(cal / 0.04);
    return { calories: Math.round(cal), steps: st };
  }, [activity, weightLbs, minutes]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="activity">Activity</Label>
          <Select
            value={activity}
            onValueChange={(v) => {
              setActivity(v);
              const a = ACTIVITIES.find((x) => x.id === v);
              if (a && onActivityChange) onActivityChange(a.calc);
            }}
          >
            <SelectTrigger id="activity" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ACTIVITIES.map((a) => (
                <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input id="weight" type="number" min="80" max="400" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="minutes">Duration (min)</Label>
            <Input id="minutes" type="number" min="5" max="240" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Estimates use MET (metabolic equivalent) values. Your real burn varies
          with intensity, fitness level and body composition.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border/70 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <div className="flex items-end gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Flame size={22} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Estimated burn</p>
            <p className="font-display text-4xl font-bold text-foreground tabular-nums">{calories}</p>
            <p className="text-xs text-muted-foreground">calories in this session</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-card/70 p-3">
            <Footprints size={16} className="text-accent" />
            <p className="mt-1 text-lg font-bold tabular-nums">{steps.toLocaleString()}</p>
            <p className="text-[11px] text-muted-foreground">equivalent steps</p>
          </div>
          <div className="rounded-xl bg-card/70 p-3">
            <Clock size={16} className="text-accent" />
            <p className="mt-1 text-lg font-bold tabular-nums">{minutes || 0}</p>
            <p className="text-[11px] text-muted-foreground">minutes moving</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getActivityCalculatorId(activityId: string): string {
  return ACTIVITIES.find((a) => a.id === activityId)?.calc ?? "Home Workout Calorie Calculator";
}
