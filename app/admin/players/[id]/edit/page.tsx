"use client";

import { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";

export default function EditPlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Record<string, string>>({
    name: "", photo: "", title: "", titleShort: "", subtitle: "",
    standard: "", rapid: "", blitz: "", fideId: "", arenaProfileUrl: "", order: "0",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/players/${id}`).then((r) => r.json()).then((d) => {
      setForm({
        name: d.name || "", photo: d.photo || "", title: d.title || "", titleShort: d.titleShort || "",
        subtitle: d.subtitle || "", standard: d.standard?.toString() || "", rapid: d.rapid?.toString() || "",
        blitz: d.blitz?.toString() || "", fideId: d.fideId || "", arenaProfileUrl: d.arenaProfileUrl || "",
        order: d.order?.toString() || "0",
      });
      setLoading(false);
    });
  }, [id]);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

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
    const body = {
      ...form,
      standard: form.standard ? Number(form.standard) : null,
      rapid: form.rapid ? Number(form.rapid) : null,
      blitz: form.blitz ? Number(form.blitz) : null,
      order: Number(form.order) || 0,
    };
    await fetch(`/api/players/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    router.push("/admin/players");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this player?")) return;
    await fetch(`/api/players/${id}`, { method: "DELETE" });
    router.push("/admin/players");
  };

  if (loading) return <div className="text-chess-100/50 text-center py-12">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-chess-100 mb-8">Edit Player</h1>
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
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Title Short</label>
            <input type="text" value={form.titleShort} onChange={(e) => set("titleShort", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Standard</label>
            <input type="number" value={form.standard} onChange={(e) => set("standard", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Rapid</label>
            <input type="number" value={form.rapid} onChange={(e) => set("rapid", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Blitz</label>
            <input type="number" value={form.blitz} onChange={(e) => set("blitz", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">FIDE ID</label>
            <input type="text" value={form.fideId} onChange={(e) => set("fideId", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Order</label>
            <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Arena Profile URL</label>
          <input type="url" value={form.arenaProfileUrl} onChange={(e) => set("arenaProfileUrl", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors disabled:opacity-50 text-sm">
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-500/20 border border-red-500/30 text-red-400 font-semibold px-6 py-3 rounded-xl hover:bg-red-500/30 transition-colors text-sm">
            <i className="fas fa-trash mr-1"></i>Delete
          </button>
          <button type="button" onClick={() => router.back()} className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm">Cancel</button>
        </div>
      </form>
    </div>
  );
}
