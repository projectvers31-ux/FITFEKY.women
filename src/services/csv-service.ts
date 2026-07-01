import * as XLSX from "xlsx";
import type { Keyword } from "./file-storage";

export interface ParsedRow {
  keyword: string;
  category?: string;
  intent?: string;
  priority?: number;
  volume?: number;
  searchVolume?: number;
  difficulty?: string | number;
}

export function parseCsvText(text: string): ParsedRow[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const header = lines[0].toLowerCase().split(",").map((h) => h.trim());
  const results: ParsedRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row: Record<string, string> = {};
    header.forEach((h, idx) => {
      row[h] = values[idx] || "";
    });

    const rawDifficulty = row["difficulty"] || row["keyword difficulty"] || row["keyworddifficulty"] || "";
    const parsedDifficulty = isNaN(Number(rawDifficulty)) ? rawDifficulty || undefined : Number(rawDifficulty);

    results.push({
      keyword: row["keyword"] || row["keywords"] || values[0] || "",
      category: row["category"] || row["categories"] || "",
      intent: row["intent"] || row["search intent"] || row["searchintent"] || undefined,
      priority: parseInt(row["priority"] || "", 10) || undefined,
      volume: parseInt(row["volume"] || row["search volume"] || row["searchvolume"] || "", 10) || undefined,
      searchVolume: parseInt(row["searchvolume"] || row["search volume"] || row["volume"] || "", 10) || undefined,
      difficulty: parsedDifficulty,
    });
  }

  return results.filter((r) => r.keyword);
}

export function parseExcelBuffer(buffer: ArrayBuffer): ParsedRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];

  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

  return data.map((row) => {
    const rawDifficulty = row["difficulty"] || row["Difficulty"] || row["keyword difficulty"] || row["Keyword Difficulty"] || "";
    const parsedDifficulty = isNaN(Number(rawDifficulty)) ? rawDifficulty || undefined : Number(rawDifficulty);
    const rawVolume = parseInt(row["volume"] || row["Volume"] || row["search volume"] || row["Search Volume"] || "", 10) || undefined;

    return {
      keyword: row["keyword"] || row["Keyword"] || row["keywords"] || row["Keywords"] || Object.values(row)[0] || "",
      category: row["category"] || row["Category"] || row["categories"] || row["Categories"] || "",
      intent: row["intent"] || row["Intent"] || row["search intent"] || row["Search Intent"] || undefined,
      priority: parseInt(row["priority"] || row["Priority"] || "", 10) || undefined,
      volume: rawVolume,
      searchVolume: rawVolume,
      difficulty: parsedDifficulty,
    };
  }).filter((r) => r.keyword);
}

export function keywordsToCsv(keywords: Keyword[]): string {
  const header = "keyword,category,intent,priority,volume,difficulty,status,articleGenerated,pinterestGenerated";
  const rows = keywords.map((k) =>
    [
      `"${k.keyword.replace(/"/g, '""')}"`,
      k.category ? `"${k.category.replace(/"/g, '""')}"` : "",
      k.intent ?? "",
      k.priority ?? "",
      k.searchVolume ?? k.volume ?? "",
      k.difficulty ?? "",
      k.status ?? "unused",
      k.articleGenerated ? "Yes" : "No",
      k.pinterestGenerated ? "Yes" : "No",
    ].join(",")
  );
  return [header, ...rows].join("\n");
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function convertToKeywords(rows: ParsedRow[]): Omit<Keyword, "id" | "createdAt">[] {
  return rows.map((r) => ({
    keyword: r.keyword,
    category: r.category,
    intent: r.intent,
    priority: r.priority,
    volume: r.volume,
    searchVolume: r.searchVolume,
    difficulty: r.difficulty,
    status: "unused",
  }));
}
