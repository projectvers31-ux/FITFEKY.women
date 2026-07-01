"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES } from "@/lib/categories";
import { useTheme } from "@/components/theme-provider";
import { useIsClient } from "@/hooks/use-is-client";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSearch: (term: string) => void;
  onCategorySelect: (category: string) => void;
  initialSearch?: string;
}

export function Header({ onSearch, onCategorySelect, initialSearch = "" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState(initialSearch);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcut: press / to focus search, Escape to blur
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
    setOpen(false);
    const el = document.getElementById("catalog");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goCategory = (id: string) => {
    onCategorySelect(id);
    setOpen(false);
    const el = document.getElementById("catalog");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
          : "border-b border-transparent bg-background/60 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 items-center gap-3 px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-transform hover:scale-[1.02]">
          <Logo size={36} />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              FitFeky
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          <Link
            href="/#catalog"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            Shop
          </Link>
          <Link
            href="/#categories"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            Categories
          </Link>
          <Link
            href="/#calculators"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            Tools
          </Link>
          <Link
            href="/#editorial"
            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            Journal
          </Link>
        </nav>

        {/* Desktop search */}
        <form onSubmit={submitSearch} role="search" className="ml-auto hidden flex-1 max-w-xs md:block">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              ref={searchRef}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder='Search yoga mats, walking pads…  ⌘/'
              title='Press "/" to focus'
              className="h-9 rounded-full border-border bg-secondary/50 pl-9 pr-3 text-sm"
              aria-label="Search products"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1.5 md:ml-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden" aria-label="Open menu">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[88vw] max-w-sm flex-col gap-0 p-0">
              <SheetHeader className="border-b px-5 py-4">
                <SheetTitle className="flex items-center gap-2.5 text-left">
                  <Logo size={32} />
                  FitFeky
                </SheetTitle>
              </SheetHeader>

              <div className="scroll-soft flex-1 overflow-y-auto px-5 py-4">
                <form onSubmit={submitSearch} role="search" className="relative mb-5">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search products…"
                    className="h-10 rounded-full pl-9"
                    aria-label="Search products"
                  />
                </form>

                <nav className="flex flex-col gap-1">
                  <Link href="/#catalog" className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary" onClick={() => setOpen(false)}>All Products</Link>
                  <Link href="/#calculators" className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary" onClick={() => setOpen(false)}>Calculators</Link>
                  <Link href="/#editorial" className="flex items-center justify-between rounded-lg px-2 py-2.5 text-left text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary" onClick={() => setOpen(false)}>Wellness Journal</Link>
                </nav>

                <p className="mb-2 mt-5 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
                <div className="flex flex-col gap-0.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => goCategory(c.id)}
                      className="rounded-lg px-2 py-2 text-left text-sm text-foreground/80 transition-colors hover:bg-secondary"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


