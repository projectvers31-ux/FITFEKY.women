"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, Search, X, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ProductCard } from "./product-card";
import { products, queryProducts } from "@/lib/product-utils";
import { CATEGORIES } from "@/lib/categories";
import type { Product, SortKey, Priority, CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

interface ProductCatalogProps {
  /** shared search term (controlled by the parent, also bound to the header). */
  searchTerm: string;
  /** shared category filter (controlled by the parent). */
  selectedCategory: string;
  /** opens the shared product detail dialog (owned by the parent). */
  onQuickView: (product: Product) => void;
  /** notifies parent when the in-catalog search box changes. */
  onSearchChange: (term: string) => void;
  /** notifies parent when the in-catalog category changes. */
  onCategoryChange: (category: string) => void;
}

type PriorityFilter = "all" | Priority;

export function ProductCatalog({
  searchTerm,
  selectedCategory,
  onQuickView,
  onSearchChange,
  onCategoryChange,
}: ProductCatalogProps) {
  const [priority, setPriority] = useState<PriorityFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [includeNaPrice, setIncludeNaPrice] = useState(true);
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Reset pagination to the first page whenever the search or category prop
  // changes. We use the React-recommended "adjust state during render"
  // pattern instead of setState-in-an-effect.
  const [prevSearch, setPrevSearch] = useState(searchTerm);
  const [prevCategory, setPrevCategory] = useState(selectedCategory);
  if (searchTerm !== prevSearch || selectedCategory !== prevCategory) {
    setPrevSearch(searchTerm);
    setPrevCategory(selectedCategory);
    setVisible(PAGE_SIZE);
  }

  const results = useMemo(
    () =>
      queryProducts({
        category: selectedCategory as CategoryId | "all",
        priority,
        sort,
        search: searchTerm,
        includeNaPrice,
      }),
    [searchTerm, selectedCategory, priority, sort, includeNaPrice],
  );

  const shown = results.slice(0, visible);
  const hasMore = visible < results.length;

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  // Wrap internal setters so changing a filter also resets pagination.
  const changePriority = (p: PriorityFilter) => {
    setPriority(p);
    setVisible(PAGE_SIZE);
  };
  const changeSort = (s: SortKey) => {
    setSort(s);
    setVisible(PAGE_SIZE);
  };
  const changeIncludeNa = (v: boolean) => {
    setIncludeNaPrice(v);
    setVisible(PAGE_SIZE);
  };

  const clearAll = () => {
    onSearchChange("");
    onCategoryChange("all");
    setPriority("all");
    setSort("featured");
    setIncludeNaPrice(true);
    setVisible(PAGE_SIZE);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "all" ||
    priority !== "all" ||
    sort !== "featured" ||
    !includeNaPrice;

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 section-editorial">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="kicker mb-4">The catalog</p>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Every pick, quality-scored.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Filter, sort and compare {products.length} curated products. Tap any
            card for a deep dive — or go straight to Amazon for live pricing.
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="rounded-2xl border border-border/50 bg-card/40 p-4 sm:p-5">
        {/* Category pills */}
        <div className="scroll-soft -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <CategoryPill
            active={selectedCategory === "all"}
            onClick={() => onCategoryChange("all")}
            label="All"
            count={products.length}
          />
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c.id}
              active={selectedCategory === c.id}
              onClick={() => onCategoryChange(c.id)}
              label={c.label}
              count={categoryCounts[c.id] ?? 0}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-3 border-t border-border/60 pt-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search + priority */}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative max-w-xs flex-1">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by name or keyword…"
                className="h-9 rounded-full pl-9 pr-3 text-sm"
                aria-label="Search products"
              />
            </div>

            <ToggleGroup
              type="single"
              value={priority}
              onValueChange={(v) => changePriority((v as PriorityFilter) || "all")}
              className="justify-start"
              aria-label="Filter by priority"
            >
              <ToggleGroupItem value="all" className="h-8 rounded-full px-3 text-xs">All</ToggleGroupItem>
              <ToggleGroupItem value="A" className="h-8 rounded-full px-3 text-xs">Top Picks</ToggleGroupItem>
              <ToggleGroupItem value="B" className="h-8 rounded-full px-3 text-xs">Recommended</ToggleGroupItem>
              <ToggleGroupItem value="C" className="h-8 rounded-full px-3 text-xs">Good Option</ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Sort + N/A toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="na-switch" className="text-xs text-muted-foreground">Show N/A prices</Label>
              <Switch id="na-switch" checked={includeNaPrice} onCheckedChange={changeIncludeNa} />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-muted-foreground" />
              <Select value={sort} onValueChange={(v) => changeSort(v as SortKey)}>
                <SelectTrigger className="h-9 w-[170px] rounded-full text-sm" aria-label="Sort products">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="quality">Quality score</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                  <SelectItem value="reviews">Most reviewed</SelectItem>
                  <SelectItem value="price-low">Price: low to high</SelectItem>
                  <SelectItem value="price-high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results meta */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{shown.length}</span> of{" "}
          <span className="font-semibold text-foreground">{results.length}</span>{" "}
          {results.length === 1 ? "match" : "matches"}
        </p>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={clearAll}>
            <X size={14} /> Clear filters
          </Button>
        )}
      </div>

      {/* Grid — generous padding, max 3 cols for editorial breathing room */}
      {shown.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 py-20 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary/60 text-muted-foreground">
            <PackageOpen size={26} />
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">No products match</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Try a different category, clear the search, or turn on “Show N/A prices”.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>
            Reset filters
          </Button>
        </div>
      )}

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button size="lg" variant="outline" className="gap-2" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more products
            <Badge variant="secondary" className="ml-1">{results.length - visible} left</Badge>
          </Button>
        </div>
      )}

    </section>
  );
}

function CategoryPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/60 bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label}
      <span className={cn("text-[10px] tabular-nums", active ? "opacity-70" : "text-muted-foreground/60")}>
        {count}
      </span>
    </button>
  );
}
