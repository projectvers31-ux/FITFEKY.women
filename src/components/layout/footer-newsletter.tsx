"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const QUEUE_KEY = "fitfeky_exit_popup_queue";
const SUBSCRIBED_KEY = "fitfeky_exit_popup_subscribed";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Footer mini newsletter form. Queues emails in localStorage using the same
 * keys as the exit-intent popup, so every capture lands in one exportable
 * queue (see scripts/export-email-queue.ts).
 */
export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    try {
      const queue: string[] = JSON.parse(
        window.localStorage.getItem(QUEUE_KEY) ?? "[]",
      );
      if (Array.isArray(queue) && !queue.includes(value)) queue.push(value);
      window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
      window.localStorage.setItem(SUBSCRIBED_KEY, "1");
    } catch {
      // Storage unavailable — the form still gives positive feedback.
    }
    setEmail("");
    setDone(true);
  };

  if (done) {
    return (
      <p
        aria-live="polite"
        className="flex items-center gap-2 text-sm font-medium text-accent"
      >
        <CheckCircle2 size={16} />
        You&rsquo;re in — welcome!
      </p>
    );
  }

  return (
    <form onSubmit={submit} aria-label="Subscribe to the weekly email" className="mt-5">
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="footer-newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="you@email.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "footer-newsletter-error" : undefined}
          className="h-11 min-w-0 flex-1 rounded-full border border-background/20 bg-background/10 px-4 text-sm text-background placeholder:text-background/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Subscribe
        </button>
      </div>
      {error && (
        <p id="footer-newsletter-error" role="alert" className="mt-2 text-xs text-amber-300">
          {error}
        </p>
      )}
      <p className="mt-2 text-[11px] text-background/50">
        One email a week. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
