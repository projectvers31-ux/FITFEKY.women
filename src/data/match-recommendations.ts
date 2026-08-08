/**
 * Curated Amazon recommendations for the "Find My Perfect Fit" results.
 *
 * Each entry keys a real catalog ASIN to editorial reasoning (best-for,
 * pros, cons, why we recommend, short summary) so the results page can show
 * a small, high-signal set of picks instead of the full catalog.
 *
 * Editing rule: keep these small and honest. The catalog's qualityScore is
 * the "Editor's Score" shown on the card — no inflating.
 */

type EditorPicked = "walking" | "strength" | "mobility" | "tracking";

export interface MatchRecommendation {
  asin: string;
  /** Who this pick is for, in one line. */
  bestFor: string;
  /** 3 short, positive reasons. */
  pros: string[];
  /** Honest trade-offs, kept short. */
  cons: string[];
  /** Why our editors chose it — 2–3 sentences, calm and specific. */
  whyWeRecommend: string;
  /** One-sentence summary shown under the title. */
  summary: string;
  /** Ease of first use: "Effortless" | "Easy" | "Moderate". */
  difficulty: string;
  /** Noise level: "Silent" | "Quiet" | "Moderate". */
  noise: string;
  /** Typical warranty as listed on Amazon. */
  warranty: string;
  /** Setup footprint in planning terms. */
  spaceRequired: string;
  /** Bonus flag — highlight this card/row as the editor's pick. */
  editorsChoice?: boolean;
}

export const MATCH_RECOMMENDATIONS: Record<string, MatchRecommendation[]> = {
  treadmill: [
    {
      asin: "B0DFM14ZYG",
      bestFor: "Steady, knee-friendly walking at home or under a desk",
      pros: [
        "2-in-1 foldable design slips under a desk or bed",
        "App and remote control make pace easy to manage",
        "300 lb capacity feels stable and secure",
      ],
      cons: ["Price shown live on Amazon — purchases happen there"],
      whyWeRecommend:
        "The foldable 2-in-1 design means the walking habit fits around your life instead of the other way around — under the desk for lunchtime steps or out in the living room while you watch a show.",
      summary:
        "A folding, app-controlled walking pad for gentle, low-impact daily steps at your own pace.",
      difficulty: "Effortless",
      noise: "Quiet",
      warranty: "1-year",
      spaceRequired: "Folds under a desk or bed",
      editorsChoice: true,
    },
    {
      asin: "B0GL7VYHV6",
      bestFor: "Graduating to a gentle incline without any impact",
      pros: [
        "10% incline adds gentle challenge",
        "Quiet 3.0 HP brushless motor",
        "Clear LED panel plus app control",
      ],
      cons: ["Price varies on Amazon — check the live price"],
      whyWeRecommend:
        "A slightly grown-up walking pad: the incline lets you raise your heart rate a bit without ever adding impact to your knees, while the brushless motor keeps it quiet enough for morning walks.",
      summary:
        "A quiet, smarter walking pad with incline for low-impact cardio that scales with you.",
      difficulty: "Easy",
      noise: "Quiet",
      warranty: "1-year",
      spaceRequired: "Stands against a wall, 6 ft x 2 ft",
    },
  ],
  resistance_bands: [
    {
      asin: "B0CGR95HBW",
      bestFor: "Gentle full-body strength without heavy weights",
      pros: [
        "Comfortable padded handles for easy gripping",
        "Set includes multiple resistance levels to grow with you",
        "Most-loved band set in our catalog (9,000+ reviews)",
      ],
      cons: ["Some resistances feel light for an advanced lifter"],
      whyWeRecommend:
        "Strength training after 45 doesn't need a rack of dumbbells — padded, low-impact bands build strength safely with near-zero joint load, and this is the set women trust most.",
      summary:
        "A cushioned, multi-resistance band kit — our most-loved option for safe, joint-friendly strength training.",
      difficulty: "Effortless",
      noise: "Silent",
      warranty: "Satisfaction guarantee",
      spaceRequired: "Fits in a drawer or bag",
      editorsChoice: true,
    },
    {
      asin: "B0971MX9JZ",
      bestFor: "Portable strength training that travels with you",
      pros: [
        "5 stackable bands start light and grow with you",
        "Compact and easy to pack anywhere",
        "Handles and door anchor included",
      ],
      cons: ["Stacking adds a little setup time"],
      whyWeRecommend:
        "You start lighter and add more when you are ready — the equipment is literally climbing with you, no intimidating heavy weights.",
      summary:
        "A light, stacking band set you can use anywhere, from living room to hotel room.",
      difficulty: "Easy",
      noise: "Silent",
      warranty: "Satisfaction guarantee",
      spaceRequired: "Fits in a carry bag",
    },
  ],
  yoga_mat: [
    {
      asin: "B0961YS9PH",
      bestFor: "Comfortable foundation for stretching and floor work",
      pros: [
        "Non-slip surface keeps poses stable",
        "Easy to clean and wipe down",
        "Strap included for carrying and storing",
      ],
      cons: ["Cushioning is thinner than extra-thick recovery mats"],
      whyWeRecommend:
        "A dependable, non-slip mat puts the ground under you on your terms — a solid base in the affordability range that makes floor flexibility feel easy rather than hard.",
      summary:
        "A stable, easy-to-clean yoga mat that gives joints a friendly floor for stretching anytime.",
      difficulty: "Effortless",
      noise: "Silent",
      warranty: "Satisfaction guarantee",
      spaceRequired: "Rolls up to the size of a bottle",
      editorsChoice: true,
    },
  ],
  smart_scale: [
    {
      asin: "B0D31CSDWP",
      bestFor: "Simple home body-composition tracking",
      pros: [
        "Large color display makes results easy to read",
        "Tracks BMI, muscle and heart rate trends",
        "Syncs with an app so progress stays private",
      ],
      cons: ["Quality score trails a few premium scales"],
      whyWeRecommend:
        "Weighing in should feel like feedback, not a judgement. A big, clear display that shows trends over time — muscle up, hydration steady — is the kind of honest nudge that keeps you motivated.",
      summary:
        "A large-display smart scale that turns weigh-ins into clear, encouraging trends.",
      difficulty: "Effortless",
      noise: "Silent",
      warranty: "1-year",
      spaceRequired: "Bathroom corner, 1 ft x 1 ft",
      editorsChoice: true,
    },
  ],
};

export const MATCH_PICK_THEME: Record<string, { eyebrow: string; intro: string }> = {
  treadmill: {
    eyebrow: "Your walking picks",
    intro: "Two quiet, compact walking pads that keep the habit kind to your knees.",
  },
  resistance_bands: {
    eyebrow: "Your strength picks",
    intro: "Two band kits that build strength safely — at any pace you choose.",
  },
  yoga_mat: {
    eyebrow: "Your mobility pick",
    intro: "One dependable mat that makes floor stretching feel easy.",
  },
  smart_scale: {
    eyebrow: "Your tracking pick",
    intro: "A focused scale that shows progress without the number-driven pressure.",
  },
};