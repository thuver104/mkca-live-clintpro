"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function NewCoachPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: "", photo: "", title: "", rating: "", email: "", phone: "", external: false, order: "0" });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) set("photo", data.url);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, order: Number(form.order) || 0 };
    await fetch("/api/coaches", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    router.push("/admin/coaches");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-chess-100 mb-8">New Coach</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Photo</label>
          <div className="flex items-center gap-3">
            <input type="file" ref={fileRef} onChange={handleUpload} accept="image/*" className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              className="glass-card border border-chess-700/50 text-chess-100 text-sm px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
              <i className="fas fa-upload mr-2"></i>{uploading ? "Uploading..." : "Upload Image"}
            </button>
            {form.photo && <img src={form.photo} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-chess-700/50" />}
          </div>
          <input type="text" value={form.photo} onChange={(e) => set("photo", e.target.value)} placeholder="Or enter image URL"
            className="w-full mt-2 bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Name</label>
            <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Title</label>
            <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Rating</label>
            <input type="text" value={form.rating} onChange={(e) => set("rating", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Order</label>
            <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Phone</label>
          <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.external} onChange={(e) => set("external", e.target.checked)} className="w-5 h-5 rounded accent-chess-accent" />
          <span className="text-sm text-chess-100/70">External Coach</span>
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors disabled:opacity-50 text-sm">
            {saving ? "Saving..." : "Create Coach"}
          </button>
          <button type="button" onClick={() => router.back()} className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm">Cancel</button>
        </div>
      </form>
    </div>
  );
}
