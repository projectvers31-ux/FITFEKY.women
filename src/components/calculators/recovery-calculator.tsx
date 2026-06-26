"use client";

import { useState, useMemo } from "react";
import { Moon, BatteryCharging } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const INTENSITY = [
  { id: "light", label: "Light — gentle mobility", mult: 0.7 },
  { id: "moderate", label: "Moderate — daily workout", mult: 1.0 },
  { id: "hard", label: "Hard — heavy strength/Cardio", mult: 1.4 },
  { id: "veryhard", label: "Very hard — new max effort", mult: 1.8 },
];

export function RecoveryCalculator() {
  const [age, setAge] = useState("48");
  const [intensity, setIntensity] = useState("moderate");
  const [hoursSleep, setHoursSleep] = useState("7");

  const { hours, note } = useMemo(() => {
    const a = Number(age) || 40;
    const i = INTENSITY.find((x) => x.id === intensity)?.mult ?? 1;
    const sleep = Number(hoursSleep) || 7;
    // base recovery scales with age; less sleep → more recovery needed
    const sleepFactor = Math.max(0.75, Math.min(1.35, 8 / sleep));
    const base = 24 + (a - 40) * 0.6;
    const h = Math.round(base * i * sleepFactor);
    const note =
      h < 30
        ? "Light session — you can train again the same day with a different muscle group."
        : h < 48
          ? "A solid night's rest and you're good to go again tomorrow."
          : "Give this muscle group 2 full days. Use a massage gun or foam roller to speed things up.";
    return { hours: h, note };
  }, [age, intensity, hoursSleep]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" min="35" max="90" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="intensity">Session intensity</Label>
          <Select value={intensity} onValueChange={setIntensity}>
            <SelectTrigger id="intensity" className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {INTENSITY.map((i) => (
                <SelectItem key={i.id} value={i.id}>{i.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sleep">Average sleep last night (hours)</Label>
          <Input id="sleep" type="number" min="3" max="12" value={hoursSleep} onChange={(e) => setHoursSleep(e.target.value)} />
        </div>
        <p className="text-xs text-muted-foreground">
          Recovery slows a little with age — that's normal and healthy. Listening
          to your body keeps you consistent for decades.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border/70 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <div className="flex items-end gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Moon size={22} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recommended rest</p>
            <p className="font-display text-4xl font-bold text-foreground tabular-nums">{hours}h</p>
            <p className="text-xs text-muted-foreground">before training the same muscle again</p>
          </div>
        </div>
        <div className="rounded-xl bg-card/70 p-3 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5 font-medium text-foreground">
            <BatteryCharging size={14} className="text-accent" /> {note}
          </p>
        </div>
      </div>
    </div>
  );
}
