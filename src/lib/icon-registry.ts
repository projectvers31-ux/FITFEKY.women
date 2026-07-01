import {
  Dumbbell,
  Flower2,
  RectangleHorizontal,
  Scale,
  Footprints,
  Zap,
  Cylinder,
  Waves,
  Spline,
  Grip,
  TrendingUp,
  FlipVertical,
  Watch,
  Sparkles,
  Home,
  Activity,
  StretchHorizontal,
  HeartPulse,
  HandHeart,
  Droplet,
  type LucideIcon,
} from "lucide-react";

/**
 * Central registry mapping string icon names (used in category/calculator
 * metadata) to actual Lucide components. Keeps metadata serializable.
 */
const REGISTRY: Record<string, LucideIcon> = {
  Dumbbell,
  Flower2,
  RectangleHorizontal,
  Scale,
  Footprints,
  Zap,
  Cylinder,
  Waves,
  Spline,
  Grip,
  TrendingUp,
  FlipVertical,
  Watch,
  Sparkles,
  Home,
  Activity,
  StretchHorizontal,
  HeartPulse,
  HandHeart,
  Droplet,
};

export function resolveIcon(name: string): LucideIcon {
  return REGISTRY[name] ?? Sparkles;
}
