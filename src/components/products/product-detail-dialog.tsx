"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Tag,
  Calculator,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { ProductImage } from "@/components/shared/product-image";
import { StarRating } from "@/components/shared/star-rating";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { QualityBadge } from "@/components/shared/quality-badge";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { ProductCard } from "./product-card";
import { CATEGORY_MAP, CALCULATOR_MAP } from "@/lib/categories";
import { relatedProducts } from "@/lib/product-utils";
import type { Product } from "@/lib/types";

interface ProductDetailDialogProps {
  product: Product | null;
  onClose: () => void;
  onQuickView: (product: Product) => void;
}

export function ProductDetailDialog({ product, onClose, onQuickView }: ProductDetailDialogProps) {
  const open = product !== null;

  // Lock body scroll while open (Dialog already handles this, but keep defensive)
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!product) return null;

  const category = CATEGORY_MAP[product.category];
  const calculator = product.suggestedCalculator
    ? CALCULATOR_MAP[product.suggestedCalculator]
    : null;
  const related = relatedProducts(product, 3);

  const goToCalculator = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("calculators")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const handleRelatedView = (p: Product) => {
    onQuickView(p);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-5xl gap-0 overflow-hidden p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">{product.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Product details, quality score, ratings and affiliate link for {product.title}.
        </DialogDescription>

        <ScrollArea className="max-h-[88vh]">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Image side */}
            <div className="relative bg-gradient-to-br from-secondary/70 to-muted/50 p-6 sm:p-8">
              <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
                <PriorityBadge priority={product.priority} />
              </div>
              <div className="mx-auto aspect-square w-full max-w-sm">
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="h-full w-full"
                />
              </div>
              <div className="mt-5 flex justify-center">
                <QualityBadge score={product.qualityScore} size="lg" />
              </div>
            </div>

            {/* Details side */}
            <div className="flex flex-col p-6 sm:p-8">
              {category && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {category.label}
                </p>
              )}
              <h2 className="mt-1.5 font-display text-2xl font-bold leading-tight tracking-tight text-foreground">
                {product.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <StarRating rating={product.rating} reviews={product.reviews} size={15} />
                {product.asin && (
                  <span className="text-xs text-muted-foreground">ASIN: {product.asin}</span>
                )}
              </div>

              {/* Price block */}
              <div className="mt-5 rounded-xl border border-border/70 bg-secondary/40 p-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {product.priceDisplay ? "Listed price" : "Live pricing"}
                    </p>
                    {product.priceDisplay ? (
                      <p className="font-display text-3xl font-bold text-foreground">
                        {product.priceDisplay}
                      </p>
                    ) : (
                      <p className="font-display text-xl font-bold text-foreground">
                        Check Amazon for live price
                      </p>
                    )}
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Final price set by Amazon at time of purchase.
                    </p>
                  </div>
                  <ShieldCheck size={20} className="text-accent" />
                </div>

                <div className="mt-4">
                  <AffiliateButton
                    href={product.affiliateUrl}
                    priceDisplay={product.priceDisplay}
                    size="lg"
                    fullWidth
                  />
                </div>
                <p className="mt-2 text-center text-[10px] text-muted-foreground">
                  We earn a commission from qualifying purchases — at no extra cost to you.
                </p>
              </div>

              {/* Why we love it */}
              <div className="mt-6">
                <h3 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                  <Sparkles size={15} className="text-primary" /> Why we picked this
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {editorialBlurb(product)}
                </p>
              </div>

              {/* Keywords */}
              <div className="mt-5 space-y-3">
                {product.mainKeyword && (
                  <KeywordRow label="Best for">
                    <Badge variant="secondary" className="font-medium">{product.mainKeyword}</Badge>
                  </KeywordRow>
                )}
                {product.secondaryKeywords.length > 0 && (
                  <KeywordRow label="Great for">
                    <div className="flex flex-wrap gap-1.5">
                      {product.secondaryKeywords.map((k) => (
                        <Badge key={k} variant="outline" className="font-normal text-muted-foreground">
                          {k}
                        </Badge>
                      ))}
                    </div>
                  </KeywordRow>
                )}
                {product.longTailKeywords.length > 0 && (
                  <KeywordRow label="People also search">
                    <div className="flex flex-wrap gap-1.5">
                      {product.longTailKeywords.map((k) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          <Tag size={10} /> {k}
                        </span>
                      ))}
                    </div>
                  </KeywordRow>
                )}
              </div>

              {/* Suggested calculator */}
              {calculator && (
                <button
                  onClick={goToCalculator}
                  className="mt-5 flex w-full items-center gap-3 rounded-xl border border-accent/25 bg-accent/10 p-3.5 text-left transition-colors hover:bg-accent/15"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/20 text-accent-foreground">
                    <Calculator size={18} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-accent-foreground/70">
                      Pair it with our
                    </span>
                    <span className="block text-sm font-bold text-foreground">{calculator.label}</span>
                  </span>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="border-t border-border/70 bg-secondary/20 p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                <TrendingUp size={18} className="text-primary" />
                More to love in {category?.label}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={handleRelatedView} />
                ))}
              </div>
            </div>
          )}
          <Separator />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function KeywordRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
      <span className="w-32 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:pt-1">
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

/** Empathetic editorial blurb synthesised from the product's metadata. */
function editorialBlurb(p: Product): string {
  const cat = CATEGORY_MAP[p.category];
  const catLabel = cat?.label.toLowerCase() ?? "this gear";
  const scoreTier =
    p.qualityScore >= 90
      ? "a standout Editor's Choice"
      : p.qualityScore >= 75
        ? "a genuinely solid, verified pick"
        : "a dependable option worth considering";

  const audience = p.longTailKeywords[0]?.replace(/^(best )/i, "") ?? p.mainKeyword;

  const ratingLine =
    p.rating != null && p.rating >= 4.6
      ? ` Shoppers love it — a ${p.rating}-star rating${p.reviews ? ` across ${p.reviews.toLocaleString()} reviews` : ""} backs it up.`
      : p.rating != null
        ? ` It carries a respectable ${p.rating}-star rating from real buyers.`
        : "";

  return (
    `Hand-picked for women over 40, this ${catLabel} entry is ${scoreTier} for ${audience}. ` +
    `We weighted its quality score (${p.qualityScore}/100), priority tier and real customer feedback to make sure it earns a place in your home studio.${ratingLine} ` +
    `It's the kind of joint-kind, low-impact equipment that helps you build strength and flexibility without beating up your body.`
  );
}
