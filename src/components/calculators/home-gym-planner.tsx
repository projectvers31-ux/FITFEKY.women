"use client";

import { useState, useMemo } from "react";
import {
  Home,
  DollarSign,
  Target,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { ProductImage } from "@/components/shared/product-image";
import { resolveIcon } from "@/lib/icon-registry";
import {
  recommendGearForPlan,
  GOAL_LABELS,
  ROOM_LABELS,
  type FitnessGoal,
  type RoomSize,
} from "@/lib/planner";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const GOALS = Object.keys(GOAL_LABELS) as FitnessGoal[];
const ROOMS = Object.keys(ROOM_LABELS) as RoomSize[];

interface HomeGymPlannerProps {
  onQuickView: (product: Product) => void;
}

export function HomeGymPlanner({ onQuickView }: HomeGymPlannerProps) {
  const [budget, setBudget] = useState(500);
  const [roomSize, setRoomSize] = useState<RoomSize>("bedroom");
  const [goals, setGoals] = useState<FitnessGoal[]>(["weight_loss", "strength"]);

  const plan = useMemo(
    () => recommendGearForPlan({ budget, roomSize, goals }),
    [budget, roomSize, goals],
  );

  const toggleGoal = (g: FitnessGoal) => {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
  };

  const budgetPct = Math.min(100, (plan.totalCost / budget) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Inputs — left column */}
      <div className="lg:col-span-5">
        {/* Budget */}
        <div className="mb-7">
          <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <DollarSign size={15} className="text-primary" />
            Your budget
          </Label>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold tracking-tight text-foreground">
              ${budget.toLocaleString("en-US")}
            </span>
            <span className="text-sm text-muted-foreground">total</span>
          </div>
          <Slider
            value={[budget]}
            onValueChange={(v) => setBudget(v[0])}
            min={50}
            max={3000}
            step={50}
            className="mt-4"
            aria-label="Budget in dollars"
          />
          <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
            <span>$50</span>
            <span>$3,000+</span>
          </div>
        </div>

        {/* Room size */}
        <div className="mb-7">
          <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Home size={15} className="text-primary" />
            Room size
          </Label>
          <div className="mt-3 grid grid-cols-1 gap-2" role="radiogroup" aria-label="Room size">
            {ROOMS.map((r) => {
              const meta = ROOM_LABELS[r];
              const active = roomSize === r;
              return (
                <button
                  key={r}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setRoomSize(r)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
                    active
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border/60 bg-card/40 hover:border-foreground/25",
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{meta.label}</p>
                    <p className="text-xs text-muted-foreground">{meta.blurb}</p>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {meta.sqft}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Goals */}
        <div>
          <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Target size={15} className="text-primary" />
            Fitness goals
            <span className="text-xs font-normal text-muted-foreground">
              ({goals.length} selected)
            </span>
          </Label>
          <div className="mt-3 grid grid-cols-1 gap-2" role="group" aria-label="Fitness goals">
            {GOALS.map((g) => {
              const meta = GOAL_LABELS[g];
              const Icon = resolveIcon(meta.icon);
              const active = goals.includes(g);
              return (
                <button
                  key={g}
                  type="button"
                  role="checkbox"
                  aria-checked={active}
                  onClick={() => toggleGoal(g)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
                    active
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border/60 bg-card/40 hover:border-foreground/25",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors",
                      active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                    )}
                  >
                    <Icon size={17} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{meta.label}</p>
                    <p className="text-xs text-muted-foreground">{meta.blurb}</p>
                  </div>
                  {active && <CheckCircle2 size={18} className="text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommended kit — right column */}
      <div className="lg:col-span-7">
        {plan.slots.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 p-10 text-center">
            <Target size={32} className="text-muted-foreground/50" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Pick a goal to see your kit
            </h3>
            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
              Select at least one fitness goal and we'll build a personalized
              equipment recommendation from our quality-scored catalog.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Budget summary */}
            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="kicker">Your plan total</p>
                  <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">
                    ${plan.totalCost.toLocaleString("en-US")}
                    {plan.hasNaPrice && (
                      <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                        + N/A items
                      </span>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  {plan.withinBudget ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">
                      <CheckCircle2 size={13} /> Within budget
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700">
                      <AlertCircle size={13} /> ${plan.totalCost - budget} over
                    </span>
                  )}
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Budget: ${budget.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
              <Progress value={budgetPct} className="mt-3 h-2" />
              {plan.withinBudget && plan.remainingBudget > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  ${plan.remainingBudget.toLocaleString("en-US")} remaining — consider
                  adding a foam roller or resistance band.
                </p>
              )}
            </div>

            {/* Kit items */}
            <div className="space-y-2.5">
              {plan.slots.map((slot, i) => (
                <div
                  key={`${slot.product?.id ?? i}`}
                  className="card-modern flex items-center gap-4 p-4"
                >
                  {/* Number + role */}
                  <div className="flex w-28 shrink-0 flex-col gap-1">
                    <span className="font-display text-2xl font-semibold text-primary/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                      {slot.role}
                    </span>
                  </div>

                  {/* Product */}
                  {slot.product && (
                    <div className="flex flex-1 items-center gap-3 overflow-hidden">
                      <ProductImage
                        src={slot.product.image}
                        alt={slot.product.title}
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-lg border border-border/50 bg-secondary/40 object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-semibold text-foreground">
                          {slot.product.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                          {slot.reason}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          {slot.product.priceDisplay ? (
                            <span className="text-sm font-semibold text-foreground">
                              {slot.product.priceDisplay}
                            </span>
                          ) : (
                            <Badge variant="outline" className="text-[10px]">
                              Price on Amazon
                            </Badge>
                          )}
                          <span className="text-[11px] text-muted-foreground">
                            Q{slot.product.qualityScore} · {slot.product.priority === "A" ? "Top Pick" : slot.product.priority === "B" ? "Recommended" : "Good"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {slot.product && (
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <AffiliateButton
                        href={slot.product.affiliateUrl}
                        priceDisplay={slot.product.priceDisplay}
                        size="sm"
                      />
                      <button
                        onClick={() => onQuickView(slot.product!)}
                        className="text-[11px] font-medium text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                      >
                        Details
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-secondary/40 p-3 text-xs text-muted-foreground">
              <Sparkles size={14} className="mt-0.5 shrink-0 text-primary" />
              <span>
                This plan is built from our quality-scored catalog of 172
                products, ranked by priority and fit for women 40+. Prices
                reflect Amazon at the time of your visit and may change.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
