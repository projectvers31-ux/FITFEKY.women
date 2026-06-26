"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { toast } = useToast();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setDone(true);
    toast({
      title: "Welcome to FitFeky",
      description: "Your free guide to low-impact fitness after 40 is on its way.",
    });
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 section-editorial">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
        {/* Organic blob accents */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 blob bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 blob-2 bg-accent/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="kicker mb-4 text-primary-foreground/80">The weekly edit</p>
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Thoughtful fitness picks, in your inbox weekly.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              One email a week: new editor's-choice gear, quick low-impact
              workouts, and honest recovery tips. No spam, ever.
            </p>
          </div>

          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            {done ? (
              <div className="flex items-center gap-3 rounded-2xl bg-white/15 p-5 backdrop-blur">
                <CheckCircle2 size={28} />
                <div>
                  <p className="font-semibold">You're subscribed</p>
                  <p className="text-sm text-primary-foreground/80">
                    Your welcome guide is on its way.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-12 flex-1 rounded-full border-0 bg-white/95 px-5 text-foreground shadow-sm"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 shrink-0 gap-2 rounded-full bg-foreground px-6 font-medium text-background shadow-md hover:bg-foreground/90"
                >
                  Subscribe
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
            <p className="mt-3 text-center text-[11px] text-primary-foreground/70 sm:text-left">
              Free welcome guide · Unsubscribe anytime · No spam
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
