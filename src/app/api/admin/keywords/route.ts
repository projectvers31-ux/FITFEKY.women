import { NextResponse } from "next/server";
import { readKeywords, writeKeywords, type Keyword } from "@/services/file-storage";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function GET() {
  const keywords = await readKeywords();
  return NextResponse.json({ keywords });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { keyword, category, intent, priority, volume, searchVolume, difficulty, status } = body;

    if (!keyword || typeof keyword !== "string") {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    const keywords = await readKeywords();
    const newKeyword: Keyword = {
      id: generateId(),
      keyword: keyword.trim(),
      category: category || undefined,
      intent: intent || undefined,
      priority: priority ? Number(priority) : undefined,
      volume: volume ? Number(volume) : undefined,
      searchVolume: searchVolume ? Number(searchVolume) : undefined,
      difficulty: difficulty || undefined,
      articleGenerated: false,
      pinterestGenerated: false,
      blogFile: "",
      published: false,
      lastGenerated: null,
      status: status || "unused",
      createdAt: new Date().toISOString(),
    };

    keywords.push(newKeyword);
    await writeKeywords(keywords);

    return NextResponse.json({ keyword: newKeyword });
  } catch {
    return NextResponse.json({ error: "Failed to add keyword" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      id, keyword, category, intent, priority, volume, searchVolume,
      difficulty, articleGenerated, pinterestGenerated, blogFile,
      published, lastGenerated, status
    } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const keywords = await readKeywords();
    const index = keywords.findIndex((k) => k.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Keyword not found" }, { status: 404 });
    }

    keywords[index] = {
      ...keywords[index],
      keyword: keyword ?? keywords[index].keyword,
      category: category !== undefined ? (category || undefined) : keywords[index].category,
      intent: intent !== undefined ? (intent || undefined) : keywords[index].intent,
      priority: priority !== undefined ? (priority ? Number(priority) : undefined) : keywords[index].priority,
      volume: volume !== undefined ? (volume ? Number(volume) : undefined) : keywords[index].volume,
      searchVolume: searchVolume !== undefined ? (searchVolume ? Number(searchVolume) : undefined) : keywords[index].searchVolume,
      difficulty: difficulty !== undefined ? (difficulty || undefined) : keywords[index].difficulty,
      articleGenerated: articleGenerated !== undefined ? articleGenerated : keywords[index].articleGenerated,
      pinterestGenerated: pinterestGenerated !== undefined ? pinterestGenerated : keywords[index].pinterestGenerated,
      blogFile: blogFile !== undefined ? blogFile : keywords[index].blogFile,
      published: published !== undefined ? published : keywords[index].published,
      lastGenerated: lastGenerated !== undefined ? lastGenerated : keywords[index].lastGenerated,
      status: status ?? keywords[index].status,
    };

    await writeKeywords(keywords);
    return NextResponse.json({ keyword: keywords[index] });
  } catch {
    return NextResponse.json({ error: "Failed to update keyword" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const keywords = await readKeywords();
    const filtered = keywords.filter((k) => k.id !== id);

    if (filtered.length === keywords.length) {
      return NextResponse.json({ error: "Keyword not found" }, { status: 404 });
    }

    await writeKeywords(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete keyword" }, { status: 500 });
  }
}
