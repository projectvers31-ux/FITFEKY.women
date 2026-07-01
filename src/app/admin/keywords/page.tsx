"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, Upload, Download, Trash2, Pencil, Plus, X, ChevronDown, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Keyword } from "@/services/file-storage";

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newKeyword, setNewKeyword] = useState({ keyword: "", category: "", intent: "", priority: "", volume: "", searchVolume: "", difficulty: "", status: "unused" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadKeywords = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/keywords");
      const data = await res.json();
      setKeywords(data.keywords ?? []);
    } catch {
      toast.error("Failed to load keywords");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadKeywords();
  }, [loadKeywords]);

  const filtered = keywords.filter((k) =>
    k.keyword.toLowerCase().includes(search.toLowerCase()) ||
    (k.category ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (k.intent ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (k.status ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleImportCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const res = await fetch("/api/admin/keywords/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "csv", data: text }),
    });

    if (res.ok) {
      toast.success("Keywords imported successfully");
      loadKeywords();
    } else {
      const err = await res.json();
      toast.error(err.error ?? "Import failed");
    }
    e.target.value = "";
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    const res = await fetch("/api/admin/keywords/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "excel", data: base64 }),
    });

    if (res.ok) {
      toast.success("Keywords imported successfully");
      loadKeywords();
    } else {
      const err = await res.json();
      toast.error(err.error ?? "Import failed");
    }
    e.target.value = "";
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/admin/keywords", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setKeywords((prev) => prev.filter((k) => k.id !== id));
      toast.success("Keyword deleted");
    } else {
      toast.error("Failed to delete keyword");
    }
  };

  const handleEdit = async () => {
    if (!editingKeyword) return;
    const res = await fetch("/api/admin/keywords", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingKeyword),
    });
    if (res.ok) {
      setKeywords((prev) => prev.map((k) => (k.id === editingKeyword.id ? editingKeyword : k)));
      setEditingKeyword(null);
      toast.success("Keyword updated");
    } else {
      toast.error("Failed to update keyword");
    }
  };

  const handleAdd = async () => {
    if (!newKeyword.keyword.trim()) {
      toast.error("Keyword is required");
      return;
    }
    const res = await fetch("/api/admin/keywords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyword: newKeyword.keyword.trim(),
        category: newKeyword.category.trim() || undefined,
        intent: newKeyword.intent.trim() || undefined,
        priority: newKeyword.priority ? parseInt(newKeyword.priority) : undefined,
        volume: newKeyword.volume ? parseInt(newKeyword.volume) : undefined,
        searchVolume: newKeyword.searchVolume ? parseInt(newKeyword.searchVolume) : undefined,
        difficulty: newKeyword.difficulty || undefined,
        status: newKeyword.status || "unused",
      }),
    });
    if (res.ok) {
      setShowAddDialog(false);
      setNewKeyword({ keyword: "", category: "", intent: "", priority: "", volume: "", searchVolume: "", difficulty: "", status: "unused" });
      loadKeywords();
      toast.success("Keyword added");
    } else {
      toast.error("Failed to add keyword");
    }
  };

  const handleRemoveDuplicates = async () => {
    const res = await fetch("/api/admin/keywords/deduplicate", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      loadKeywords();
      toast.success(`Removed ${data.removed} duplicate(s)`);
    } else {
      toast.error("Failed to deduplicate");
    }
  };

  const handleExportCsv = () => {
    fetch("/api/admin/keywords/export")
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "keywords.csv";
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="shimmer h-8 w-48 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Keyword Manager</h1>
          <p className="mt-1 text-sm text-muted-foreground">Import, manage, and organize your SEO keywords</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-1 size-4" /> Add Keyword
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Import Keywords</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-1 size-4" /> Import CSV
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-1 size-4" /> Import Excel (.xlsx)
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.name.endsWith(".csv")) handleImportCsv(e);
              else handleImportExcel(e);
            }}
          />
          <Button variant="outline" onClick={handleRemoveDuplicates}>
            <X className="mr-1 size-4" /> Remove Duplicates
          </Button>
          <Button variant="outline" onClick={handleExportCsv}>
            <Download className="mr-1 size-4" /> Export CSV
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">
              All Keywords <Badge variant="secondary">{filtered.length}</Badge>
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Intent</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-10 text-center text-sm text-muted-foreground">
                    {search ? "No keywords match your search" : "No keywords yet. Import or add one above."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell className="max-w-50 truncate font-medium" title={k.keyword}>{k.keyword}</TableCell>
                    <TableCell>{k.category ?? "—"}</TableCell>
                    <TableCell>
                      {k.intent ? (
                        <Badge variant="outline" className="text-xs capitalize">{k.intent}</Badge>
                      ) : "—"}
                    </TableCell>
                    <TableCell>{k.priority ?? "—"}</TableCell>
                    <TableCell>{(k.searchVolume ?? k.volume)?.toLocaleString() ?? "—"}</TableCell>
                    <TableCell>
                      {k.difficulty != null ? (
                        <Badge
                          variant={
                            typeof k.difficulty === "number"
                              ? k.difficulty < 30 ? "default" : k.difficulty < 60 ? "secondary" : "destructive"
                              : k.difficulty === "Low" ? "default" : k.difficulty === "Medium" ? "secondary" : "destructive"
                          }
                          className="text-xs"
                        >
                          {k.difficulty}
                        </Badge>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={k.status === "used" ? "default" : k.status === "generating" ? "secondary" : "outline"}
                        className="text-xs capitalize"
                      >
                        {k.articleGenerated || k.pinterestGenerated ? (
                          <CheckCircle2 className="mr-1 size-3 text-green-500" />
                        ) : null}
                        {k.status ?? "unused"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(k.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingKeyword(k)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(k.id)}>
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editingKeyword} onOpenChange={(open) => { if (!open) setEditingKeyword(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Keyword</DialogTitle>
          </DialogHeader>
          {editingKeyword && (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Keyword</label>
                <Input
                  value={editingKeyword.keyword}
                  onChange={(e) => setEditingKeyword({ ...editingKeyword, keyword: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Category</label>
                  <Input
                    value={editingKeyword.category ?? ""}
                    onChange={(e) => setEditingKeyword({ ...editingKeyword, category: e.target.value || undefined })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Intent</label>
                  <Input
                    value={editingKeyword.intent ?? ""}
                    onChange={(e) => setEditingKeyword({ ...editingKeyword, intent: e.target.value || undefined })}
                    placeholder="Commercial, Informational..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Priority</label>
                  <Input
                    type="number"
                    value={editingKeyword.priority ?? ""}
                    onChange={(e) =>
                      setEditingKeyword({ ...editingKeyword, priority: e.target.value ? parseInt(e.target.value) : undefined })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Search Volume</label>
                  <Input
                    type="number"
                    value={editingKeyword.searchVolume ?? editingKeyword.volume ?? ""}
                    onChange={(e) =>
                      setEditingKeyword({ ...editingKeyword, searchVolume: e.target.value ? parseInt(e.target.value) : undefined })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Difficulty</label>
                  <Input
                    value={editingKeyword.difficulty?.toString() ?? ""}
                    onChange={(e) =>
                      setEditingKeyword({ ...editingKeyword, difficulty: e.target.value || undefined })
                    }
                    placeholder="High, Medium, Low or 0-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <Input
                    value={editingKeyword.status ?? "unused"}
                    onChange={(e) => setEditingKeyword({ ...editingKeyword, status: e.target.value || "unused" })}
                    placeholder="unused, used, generating"
                  />
                </div>
                <div className="flex items-end gap-4 pb-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!editingKeyword.articleGenerated}
                      onChange={(e) => setEditingKeyword({ ...editingKeyword, articleGenerated: e.target.checked })}
                      className="size-4 rounded border-input"
                    />
                    Article Generated
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!editingKeyword.pinterestGenerated}
                      onChange={(e) => setEditingKeyword({ ...editingKeyword, pinterestGenerated: e.target.checked })}
                      className="size-4 rounded border-input"
                    />
                    Pinterest Generated
                  </label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingKeyword(null)}>Cancel</Button>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Keyword</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Keyword *</label>
              <Input
                value={newKeyword.keyword}
                onChange={(e) => setNewKeyword({ ...newKeyword, keyword: e.target.value })}
                placeholder="e.g. best walking pad for seniors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Category</label>
                <Input
                  value={newKeyword.category}
                  onChange={(e) => setNewKeyword({ ...newKeyword, category: e.target.value })}
                  placeholder="e.g. walking pads"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Intent</label>
                <Input
                  value={newKeyword.intent}
                  onChange={(e) => setNewKeyword({ ...newKeyword, intent: e.target.value })}
                  placeholder="Commercial, Informational..."
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Priority</label>
                <Input
                  type="number"
                  value={newKeyword.priority}
                  onChange={(e) => setNewKeyword({ ...newKeyword, priority: e.target.value })}
                  placeholder="e.g. 10"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Search Volume</label>
                <Input
                  type="number"
                  value={newKeyword.searchVolume || newKeyword.volume}
                  onChange={(e) => setNewKeyword({ ...newKeyword, searchVolume: e.target.value })}
                  placeholder="e.g. 74000"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Difficulty</label>
                <Input
                  value={newKeyword.difficulty}
                  onChange={(e) => setNewKeyword({ ...newKeyword, difficulty: e.target.value })}
                  placeholder="High, Medium, Low"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <Input
                value={newKeyword.status}
                onChange={(e) => setNewKeyword({ ...newKeyword, status: e.target.value })}
                placeholder="unused"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
