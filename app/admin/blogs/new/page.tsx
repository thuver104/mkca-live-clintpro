"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", category: "Strategy", content: "", excerpt: "", image: "", author: "", published: false });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/blogs");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-chess-100 mb-8">New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Title</label>
          <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Category</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm">
            {["Strategy", "Tournament", "Learning", "News"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Excerpt</label>
          <input type="text" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Content</label>
          <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={8} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Image URL</label>
          <input type="text" value={form.image} onChange={(e) => set("image", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Author</label>
          <input type="text" value={form.author} onChange={(e) => set("author", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-5 h-5 rounded accent-chess-accent" />
          <span className="text-sm text-chess-100/70">Published</span>
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors disabled:opacity-50 text-sm">
            {saving ? "Saving..." : "Create Blog"}
          </button>
          <button type="button" onClick={() => router.back()} className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
