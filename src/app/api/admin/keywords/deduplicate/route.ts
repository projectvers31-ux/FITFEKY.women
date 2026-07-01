import { NextResponse } from "next/server";
import { readKeywords, writeKeywords } from "@/services/file-storage";

export async function POST() {
  const keywords = await readKeywords();
  const seen = new Map<string, number>();

  const deduped = keywords.filter((k, index) => {
    const key = k.keyword.toLowerCase().trim();
    if (seen.has(key)) {
      const existing = seen.get(key)!;
      const existingKw = keywords[existing];
      const currentKw = keywords[index];
      const existingScore = (existingKw.volume ?? 0) - Number(existingKw.difficulty ?? 0);
      const currentScore = (currentKw.volume ?? 0) - Number(currentKw.difficulty ?? 0);

      if (currentScore > existingScore) {
        seen.set(key, index);
        return false;
      }
      return false;
    }
    seen.set(key, index);
    return true;
  });

  const removed = keywords.length - deduped.length;

  if (removed > 0) {
    await writeKeywords(deduped);
  }

  return NextResponse.json({ removed, total: deduped.length });
}
