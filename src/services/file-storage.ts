"use server";

import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return [] as unknown as T;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Failed to write file ${filename}:`, error);
    // Silently fail on Vercel (read-only file system)
  }
}

export async function readSettings(): Promise<Settings> {
  const defaults: Settings = {
    geminiApiKey: "",
    websiteUrl: "",
    amazonAffiliateId: "",
  };
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, "settings.json"), "utf-8");
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export async function writeSettings(settings: Settings): Promise<void> {
  await writeJsonFile("settings.json", settings);
}

export async function readKeywords(): Promise<Keyword[]> {
  return readJsonFile<Keyword[]>("keywords.json");
}

export async function writeKeywords(keywords: Keyword[]): Promise<void> {
  await writeJsonFile("keywords.json", keywords);
}

export interface Keyword {
  id: string;
  keyword: string;
  category?: string;
  intent?: string;
  priority?: number;
  volume?: number;
  searchVolume?: number;
  difficulty?: string | number;
  articleGenerated?: boolean;
  pinterestGenerated?: boolean;
  blogFile?: string;
  published?: boolean;
  lastGenerated?: string | null;
  status?: string;
  createdAt: string;
}

export interface Settings {
  geminiApiKey: string;
  websiteUrl: string;
  amazonAffiliateId: string;
}
