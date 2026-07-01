import { NextResponse } from "next/server";
import { readKeywords, writeKeywords, type Keyword } from "@/services/file-storage";
import { parseCsvText, parseExcelBuffer, convertToKeywords } from "@/services/csv-service";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();

    if (!data || !type) {
      return NextResponse.json({ error: "Data and type are required" }, { status: 400 });
    }

    let rows;
    if (type === "csv") {
      rows = parseCsvText(data);
    } else if (type === "excel") {
      const binaryStr = atob(data);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      rows = parseExcelBuffer(bytes.buffer);
    } else {
      return NextResponse.json({ error: "Invalid import type" }, { status: 400 });
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: "No valid keywords found in file" }, { status: 400 });
    }

    const current = await readKeywords();
    const existing = new Set(current.map((k) => k.keyword.toLowerCase().trim()));

    const newEntries: Keyword[] = [];
    for (const row of rows) {
      const kw = row.keyword.trim();
      if (!kw || existing.has(kw.toLowerCase())) continue;

      newEntries.push({
        id: generateId(),
        keyword: kw,
        category: row.category,
        intent: row.intent,
        priority: row.priority,
        volume: row.volume,
        searchVolume: row.searchVolume,
        difficulty: row.difficulty,
        articleGenerated: false,
        pinterestGenerated: false,
        blogFile: "",
        published: false,
        lastGenerated: null,
        status: "unused",
        createdAt: new Date().toISOString(),
      });

      existing.add(kw.toLowerCase());
    }

    const updated = [...current, ...newEntries];
    await writeKeywords(updated);

    return NextResponse.json({
      imported: newEntries.length,
      skipped: rows.length - newEntries.length,
      total: updated.length,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ error: "Failed to import keywords" }, { status: 500 });
  }
}
