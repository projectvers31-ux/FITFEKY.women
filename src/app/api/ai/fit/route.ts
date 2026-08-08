import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

/**
 * POST /api/ai/fit
 *
 * Generates a personalized wellness "coach" plan (friendly, short, practical)
 * from the Find My Perfect Fit assessment answers using Google Gemini.
 *
 * Body:
 *   {
 *     match: "treadmill" | ...,        // category the assessment matched
 *     answers: { age?, height?, weight?, mainGoal?, fitnessLevel?,
 *                location?, budget?, conditions?: string[], workout? }
 *   }
 *
 * Returns:
 *   { ok: true, summary, workoutStyle, equipment, habits, safety, motivation, disclaimer }
 *   or a 4xx/5xx error message.
 *
 * No GEMINI_API_KEY configured → returns 503 (client falls back to static plan).
 */

const API_KEY = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim();
const MODEL = (process.env.GEMINI_MODEL || "gemini-2.0-flash").trim();

const SYSTEM_PROMPT = `You are FitFeky's warm, encouraging wellness coach for women aged 45-65.
You help women build gentle, joint-friendly, sustainable movement habits at home.

Rules for every reply:
- Speak like a trusted, friendly coach - never clinical or preachy.
- Keep every sentence short, warm and practical (simple reading level).
- Focus on movement, mobility, strength, rest and healthy daily habits.
- Always take into account the user's age and any joint concerns they share.
- You are NOT a doctor: never diagnose, prescribe, or give medical treatment.
- When the user mentions pain, a condition, or anything medical, recommend
  consulting a qualified healthcare professional before starting new exercise.
- Recommend realistic, gentle start steps - nothing intense.

Return STRICT JSON (no markdown, no code fences) with exactly these keys:
{
  "summary": "2-3 sentence personal summary of their lifestyle and goal",
  "workoutStyle": "2-3 sentences on a suggested workout style + starting frequency",
  "equipment": ["2-4 short recommended equipment item names"],
  "routines": "2-3 sentences describing one gentle weekly routine built around their chosen goal and space",
  "habits": ["3-4 short healthy-habit suggestions, each one sentence"],
  "safety": ["2-3 short joint-friendly safety advice items"],
  "motivation": "one warm, encouraging sentence"
}`;

interface Height {
  ft?: number;
  inch?: number;
}

interface AssessmentAnswers {
  age?: number;
  height?: Height;
  weight?: number;
  mainGoal?: string;
  fitnessLevel?: string;
  location?: string;
  budget?: string;
  conditions?: string[];
  workout?: string;
}

/** Build the user-turn text from the answers. */
function buildUserPrompt(matchLabel: string, a: Partial<AssessmentAnswers>): string {
  const lines = ["Here is a woman's completed FitFeky assessment — write her personalized plan:"];
  if (a.age != null) lines.push(`- Age: ${a.age}`);
  if (a.height?.ft != null && a.height.inch != null) lines.push(`- Height: ${a.height.ft} ft ${a.height.inch} in`);
  if (a.weight != null) lines.push(`- Approx weight: ${a.weight} lb`);
  if (a.mainGoal) lines.push(`- Main goal: ${a.mainGoal}`);
  if (a.location) lines.push(`- Exercise space: ${a.location}`);
  if (a.budget) lines.push(`- Budget range: ${a.budget}`);
  if (a.fitnessLevel) lines.push(`- Fitness level: ${a.fitnessLevel}`);
  if (a.workout) lines.push(`- Preferred workout: ${a.workout}`);
  if (a.conditions?.length) lines.push(`- Health considerations: ${a.conditions.join(", ")}`);
  lines.push(`- FitFeky match: ${matchLabel}`);
  return lines.join("\n");
}

/** Fallback human label for the matched category. */
const MATCH_LABELS: Record<string, string> = {
  treadmill: "A Walking Pad",
  resistance_bands: "Resistance Bands",
  yoga_mat: "A Yoga Mat & Mobility Set",
  smart_scale: "A Smart Scale",
};

export async function POST(req: Request) {
  if (!API_KEY) {
    return NextResponse.json(
      { ok: false, error: "Please set GEMINI_API_KEY to enable the AI coach." },
      { status: 503 },
    );
  }

  let body: { answers?: Partial<AssessmentAnswers>; match?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const answers = body?.answers ?? {};
  if (Object.keys(answers).length === 0) {
    return NextResponse.json({ ok: false, error: "Answers are required." }, { status: 400 });
  }

  const match =
    (typeof body?.match === "string" && MATCH_LABELS[body.match]) ||
    matchFromAnswers(answers) ||
    MATCH_LABELS.yoga_mat;
  const matchLabel = match;

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 1024,
        responseMimeType: "application/json",
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const prompt = buildUserPrompt(matchLabel, answers);
    const result = await model.generateContent({
      systemInstruction: SYSTEM_PROMPT,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response?.text?.() ?? "";
    if (!text) {
      return NextResponse.json({ ok: false, error: "Empty response from Gemini." }, { status: 502 });
    }

    const parsed = extractJson(text);
    if (!parsed) {
      return NextResponse.json({ ok: false, error: "Gemini returned non-JSON. Try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, ...parsed });
  } catch (err) {
    console.error("[api/ai/fit] Gemini error:", err);
    return NextResponse.json(
      { ok: false, error: "The AI coach had a temporary problem. Please try again." },
      { status: 502 },
    );
  }
}

/** Tolerant JSON parse (handles stray fences). */
function extractJson(text: string): Record<string, unknown> | null {
  let cleaned = text.trim();
  const fence = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fence) cleaned = fence[1].trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const obj = cleaned.match(/\{[\s\S]*\}/);
    if (!obj) return null;
    try {
      return JSON.parse(obj[0]);
    } catch {
      return null;
    }
  }
}

/** Fallback label for the recommended category from the answers alone. */
function matchFromAnswers(a: Partial<AssessmentAnswers>): string | null {
  const goal = (a.mainGoal ?? "").toLowerCase();
  if (/weight|lose/i.test(goal)) return MATCH_LABELS.treadmill;
  if (/yoga|mobil|costo/i.test(goal)) return MATCH_LABELS.yoga_mat;
  if (/pain|joint/i.test(goal)) return MATCH_LABELS.treadmill;
  if (/lifestyle/i.test(goal)) return MATCH_LABELS.resistance_bands;
  return null;
}