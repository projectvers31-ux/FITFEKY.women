"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fbTrack } from "@/lib/meta-pixel";

const STORAGE_KEYS = {
  dismissedAt: "fitfeky_exit_popup_dismissed_at",
  subscribed: "fitfeky_exit_popup_subscribed",
  queue: "fitfeky_exit_popup_queue",
} as const;

/** Hide for 7 days once dismissed. */
const SUPPRESS_MS = 7 * 24 * 60 * 60 * 1000;
/** Mobile fallback trigger (touch devices). */
const MOBILE_DELAY_MS = 30_000;
/** Zone near the top edge of the viewport treated as "moving toward close/back". */
const EXIT_THRESHOLD_PX = 8;

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode / blocked cookies) — popup still works per-session.
  }
}

/**
 * Exit-intent email capture popup.
 *
 * Triggers:
 *  - Desktop: cursor moves toward the top edge (close / back button zone).
 *  - Touch:   after 30s, or when the user scrolls back up past the 50% mark
 *             after having scrolled deeper.
 *
 * Emails are appended to a localStorage queue (`fitfeky_exit_popup_queue`)
 * ready to be flushed to ConvertKit / Mailchimp. The popup never shows again
 * after a successful subscribe, and hides for 7 days after dismissal.
 */
export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const shownRef = useRef(false);
  const passedHalfwayRef = useRef(false);

  const show = useCallback(() => {
    if (shownRef.current) return;
    if (readStorage(STORAGE_KEYS.subscribed)) return;
    const dismissedAt = Number(readStorage(STORAGE_KEYS.dismissedAt));
    if (dismissedAt && Date.now() - dismissedAt < SUPPRESS_MS) return;
    shownRef.current = true;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    writeStorage(STORAGE_KEYS.dismissedAt, String(Date.now()));
  }, []);

  // Trigger listeners — exit intent on desktop, timer + scroll-up on touch.
  useEffect(() => {
    const touchDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    if (touchDevice) {
      const timer = window.setTimeout(show, MOBILE_DELAY_MS);
      const onScroll = () => {
        const doc = document.documentElement;
        const halfway = (doc.scrollHeight - window.innerHeight) * 0.5;
        if (window.scrollY > halfway) {
          passedHalfwayRef.current = true;
        } else if (passedHalfwayRef.current) {
          show();
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener("scroll", onScroll);
      };
    }

    let lastY = 0;
    let scheduled = false;
    const onMouseMove = (e: MouseEvent) => {
      const y = e.clientY;
      if (y > EXIT_THRESHOLD_PX) lastY = y;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (y <= EXIT_THRESHOLD_PX && y < lastY) show();
      });
    };
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= EXIT_THRESHOLD_PX) show();
    };
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [show]);

  // Focus management, scroll lock, Escape + Tab trap while open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const target = status === "done" ? closeBtnRef.current : inputRef.current;
    const raf = requestAnimationFrame(() => (target ?? dialog)?.focus());
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, status, close]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    try {
      const queue: string[] = JSON.parse(
        readStorage(STORAGE_KEYS.queue) ?? "[]",
      );
      if (Array.isArray(queue) && !queue.includes(value)) queue.push(value);
      writeStorage(STORAGE_KEYS.queue, JSON.stringify(queue));
    } catch {
      writeStorage(STORAGE_KEYS.queue, JSON.stringify([value]));
    }
    writeStorage(STORAGE_KEYS.subscribed, "1");
    setStatus("done");
    fbTrack("Lead", {
      content_name: "Free Joint-Friendly Home Gym Checklist",
      content_category: "Lead Magnet",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/45 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ff-exit-title"
        aria-describedby="ff-exit-desc"
        className="animate-slide-fade sm:animate-scale-in relative mx-auto flex max-h-[92dvh] w-full max-w-md flex-col overflow-y-auto rounded-t-[1.75rem] bg-card p-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] shadow-2xl shadow-foreground/15 ring-1 ring-border scroll-soft sm:rounded-[1.75rem] sm:p-8"
      >
        {/* Warm accent bar */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-[var(--gold)] to-accent"
        />

        <button
          ref={closeBtnRef}
          type="button"
          onClick={close}
          aria-label="Close popup"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" />
        </button>

        {status === "done" ? (
          <div
            aria-live="polite"
            className="flex flex-col items-center gap-3 py-8 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
              <CheckCircle2 className="size-7" />
            </span>
            <p className="font-display text-2xl font-semibold tracking-tight">
              Check your inbox!
            </p>
            <p className="text-sm text-muted-foreground">
              Your checklist is on its way.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-2">
            <p className="kicker">Free download</p>
            <h3
              id="ff-exit-title"
              className="font-display text-[1.6rem] font-semibold leading-[1.15] tracking-tight sm:text-[1.75rem]"
            >
              Wait! Get Your{" "}
              <span className="text-primary">
                Free Joint-Friendly Home Gym Checklist
              </span>
            </h3>
            <p
              id="ff-exit-desc"
              className="text-sm leading-relaxed text-muted-foreground"
            >
              The 7 essential pieces of equipment every woman over 45 needs to
              build strength safely at home — without joint pain.
            </p>

            <form
              onSubmit={submit}
              noValidate
              aria-label="Get the free checklist"
              className="mt-1 flex flex-col gap-3"
            >
              <label htmlFor="ff-exit-email" className="sr-only">
                Email address
              </label>
              <Input
                ref={inputRef}
                id="ff-exit-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email address"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "ff-exit-error" : undefined}
                className="h-12 rounded-full border-border bg-background px-5 text-base"
              />
              {error && (
                <p
                  id="ff-exit-error"
                  role="alert"
                  className="text-xs font-medium text-destructive"
                >
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={status === "sending"}
                className="h-12 w-full gap-2 rounded-full text-[0.95rem] font-medium shadow-md disabled:opacity-70"
              >
                {status === "sending" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
                {status === "sending" ? "Sending…" : "Send My Free Checklist"}
              </Button>
            </form>

            <p className="text-center text-[11px] text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
