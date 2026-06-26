"use client";

import { useState } from "react";
import { Calculator as CalcIcon, ArrowRight, Link2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BmiCalculator } from "./bmi-calculator";
import { CalorieBurnCalculator } from "./calorie-burn-calculator";
import { RecoveryCalculator } from "./recovery-calculator";
import { HomeGymPlanner } from "./home-gym-planner";
import { BodyFatCalculator } from "./body-fat-calculator";
import { ProductCard } from "@/components/products/product-card";
import { productsForCalculator, products } from "@/lib/product-utils";
import { CALCULATORS } from "@/lib/categories";
import { resolveIcon } from "@/lib/icon-registry";
import type { Product } from "@/lib/types";

interface CalculatorsSectionProps {
  onQuickView: (p: Product) => void;
  onCategorySelect: (category: string) => void;
}

export function CalculatorsSection({ onQuickView, onCategorySelect }: CalculatorsSectionProps) {
  const [tab, setTab] = useState("planner");
  const [activeCalcId, setActiveCalcId] = useState("Home Workout Calorie Calculator");

  const suggestions = productsForCalculator(activeCalcId, 4);

  const goToCatalog = (cat: string) => {
    onCategorySelect(cat);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onTabChange = (value: string) => {
    setTab(value);
    if (value === "bmi") setActiveCalcId("BMI Calculator");
    else if (value === "recovery") setActiveCalcId("Muscle Recovery Time Calculator");
    else if (value === "planner") setActiveCalcId("Home Workout Calorie Calculator");
    else if (value === "bodyfat") setActiveCalcId("BMI Calculator");
    // "burn" leaves activeCalcId driven by the activity select (default walking)
  };

  return (
    <section id="calculators" className="bg-ambient section-editorial">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <p className="kicker mb-4">Free wellness tools</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Know your numbers, then{" "}
            <span className="text-gradient-warm">pick your gear.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Plan your home gym, estimate your body fat, calculate your BMI and
            calorie burn — then we'll suggest the gear that fits.
          </p>
        </div>

        <Tabs value={tab} onValueChange={onTabChange} className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-full border border-border/50 bg-card/40 p-1">
            <TabsTrigger value="planner" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Home Gym Planner
            </TabsTrigger>
            <TabsTrigger value="bodyfat" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Body Fat Calculator
            </TabsTrigger>
            <TabsTrigger value="bmi" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Healthy Weight (BMI)
            </TabsTrigger>
            <TabsTrigger value="burn" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Calorie Burn
            </TabsTrigger>
            <TabsTrigger value="recovery" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Recovery Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="mt-5">
            <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-7">
              <HomeGymPlanner onQuickView={onQuickView} />
            </div>
          </TabsContent>

          <TabsContent value="bodyfat" className="mt-5">
            <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-7">
              <BodyFatCalculator />
            </div>
            <SuggestionIntro />
          </TabsContent>

          <TabsContent value="bmi" className="mt-5">
            <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-7">
              <BmiCalculator />
            </div>
            <SuggestionIntro />
          </TabsContent>

          <TabsContent value="burn" className="mt-5">
            <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-7">
              <CalorieBurnCalculator onActivityChange={setActiveCalcId} />
            </div>
            <SuggestionIntro />
          </TabsContent>

          <TabsContent value="recovery" className="mt-5">
            <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-7">
              <RecoveryCalculator />
            </div>
            <SuggestionIntro />
          </TabsContent>
        </Tabs>

        {/* Live product suggestions */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <Link2 size={18} className="text-primary" />
              Gear that pairs with this
            </h3>
          </div>
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {suggestions.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
              No specific gear mapped to this calculator yet — explore the full{" "}
              <button className="font-semibold text-primary hover:underline" onClick={() => goToCatalog("all")}>
                catalog
              </button>
              .
            </div>
          )}
        </div>

        {/* All calculators grid */}
        <div className="mt-14">
          <h3 className="mb-4 font-display text-lg font-bold text-foreground">
            Every calculator in our toolkit
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CALCULATORS.map((c) => {
              const Icon = resolveIcon(c.icon);
              const count = products.filter((p) => p.suggestedCalculator === c.id).length;
              return (
                <div
                  key={c.id}
                  className="card-lift rounded-xl border border-border/70 bg-card p-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={17} />
                  </span>
                  <h4 className="mt-3 text-sm font-bold text-foreground">{c.label}</h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {count} {count === 1 ? "product" : "products"}
                    </span>
                    {c.categories[0] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2 text-[11px]"
                        onClick={() => goToCatalog(c.categories[0])}
                      >
                        Shop <ArrowRight size={12} />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SuggestionIntro() {
  return (
    <p className="mt-3 px-1 text-xs text-muted-foreground">
      Based on your selection, here's gear our editors recommend ↓
    </p>
  );
}
