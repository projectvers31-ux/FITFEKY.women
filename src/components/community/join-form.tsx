"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function JoinForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate network delay for realistic UX
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    toast({
      title: "Welcome to the Circle",
      description: "Your first joint-friendly weekly plan is on its way.",
    });
    setEmail("");
  };

  return (
    <div>
      {done ? (
        <div className="flex items-center gap-3 rounded-2xl bg-primary/10 p-5">
          <CheckCircle2 size={28} className="shrink-0 text-primary" />
          <div>
            <p className="font-semibold">You&rsquo;re in the Circle</p>
            <p className="text-sm text-foreground/70">
              Your Friday plan will land in your inbox.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} aria-label="Join the FitFeky Circle" className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="community-email" className="sr-only">Email address</label>
          <Input
            id="community-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="h-12 flex-1 rounded-full border-border/60 bg-card px-5 text-foreground shadow-sm focus-visible:ring-primary"
          />
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-12 shrink-0 gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}
            {loading ? "Joining…" : "Join the Circle"}
          </Button>
        </form>
      )}
      <p className="mt-3 text-center text-xs text-muted-foreground sm:text-left">
        Free to join · Unsubscribe anytime · No spam
      </p>
    </div>
  );
}