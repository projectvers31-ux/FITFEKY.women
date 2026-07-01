import { NextResponse } from "next/server";
import { readKeywords } from "@/services/file-storage";
import { keywordsToCsv } from "@/services/csv-service";

export async function GET() {
  const keywords = await readKeywords();
  const csv = keywordsToCsv(keywords);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=keywords.csv",
    },
  });
}
