"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Gift } from "lucide-react";
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
      title: "You're in! 🌸",
      description: "Check your inbox for a welcome guide to low-impact fitness after 40.",
    });
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground sm:p-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Gift size={13} /> Free welcome guide
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Get our weekly drop of gentle, effective fitness picks.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/90">
              One thoughtful email a week: new editor's-choice gear, quick
              low-impact workouts, and honest recovery tips. No spam, ever.
            </p>
          </div>

          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            {done ? (
              <div className="flex items-center gap-3 rounded-2xl bg-white/15 p-5 backdrop-blur">
                <CheckCircle2 size={28} />
                <div>
                  <p className="font-semibold">You're subscribed!</p>
                  <p className="text-sm text-primary-foreground/85">
                    Your welcome guide is on its way.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="h-12 rounded-xl border-0 bg-white pl-10 text-foreground"
                    aria-label="Email address"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="h-12 shrink-0 font-semibold shadow-md"
                >
                  Get the guide
                </Button>
              </form>
            )}
            <p className="mt-3 text-center text-[11px] text-primary-foreground/75 sm:text-left">
              By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
