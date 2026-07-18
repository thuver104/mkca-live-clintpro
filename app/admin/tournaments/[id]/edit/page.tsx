"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function EditTournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string | boolean>>({
    title: "", description: "", date: "", time: "", venue: "", entryFee: "",
    status: "upcoming", featured: false, registrationOpen: true,
    registrationFormId: "",
    ageCategories: "", prizes: "", pdfUrl: "", whatsappLink: "", registrationLink: "", venueMapLink: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tournaments/${id}`).then((r) => r.json()).then((d) => {
      setForm({
        title: d.title || "", description: d.description || "", date: d.date || "", time: d.time || "",
        venue: d.venue || "", entryFee: d.entryFee || "", status: d.status || "upcoming",
        featured: d.featured || false, registrationOpen: d.registrationOpen ?? true,
        registrationFormId: d.registrationFormId || "",
        ageCategories: Array.isArray(d.ageCategories) ? d.ageCategories.join(", ") : (d.ageCategories || ""),
        prizes: d.prizes || "", pdfUrl: d.pdfUrl || "", whatsappLink: d.whatsappLink || "",
        registrationLink: d.registrationLink || "", venueMapLink: d.venueMapLink || "",
      });
      setLoading(false);
    });
  }, [id]);

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...form, ageCategories: String(form.ageCategories).split(",").map((s) => s.trim()).filter(Boolean) };
    await fetch(`/api/tournaments/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    router.push("/admin/tournaments");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this tournament?")) return;
    await fetch(`/api/tournaments/${id}`, { method: "DELETE" });
    router.push("/admin/tournaments");
  };

  if (loading) return <div className="text-chess-100/50 text-center py-12">Loading...</div>;

  const input = (label: string, key: string, type = "text", required = false) => (
    <div>
      <label className="block text-sm font-medium text-chess-100/70 mb-1.5">{label}</label>
      <input type={type} value={String(form[key] ?? "")} onChange={(e) => set(key, e.target.value)} required={required}
        className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-chess-100 mb-8">Edit Tournament</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {input("Title", "title", "text", true)}
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Description</label>
          <textarea value={String(form.description)} onChange={(e) => set("description", e.target.value)} rows={4} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm resize-y" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {input("Date", "date", "date", true)}
          {input("Time", "time", "text", true)}
        </div>
        {input("Venue", "venue", "text", true)}
        {input("Entry Fee", "entryFee")}
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Status</label>
          <select value={String(form.status)} onChange={(e) => set("status", e.target.value)} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm">
            {["upcoming", "ongoing", "completed"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {input("Age Categories (comma-separated)", "ageCategories")}
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Prizes</label>
          <textarea value={String(form.prizes)} onChange={(e) => set("prizes", e.target.value)} rows={3} className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm resize-y" />
        </div>
        {input("PDF URL", "pdfUrl")}
        {input("WhatsApp Link", "whatsappLink")}
        {input("Registration Form ID (from Forms section)", "registrationFormId")}
        {input("Venue Map Link", "venueMapLink")}
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-5 h-5 rounded accent-chess-accent" />
            <span className="text-sm text-chess-100/70">Featured</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={!!form.registrationOpen} onChange={(e) => set("registrationOpen", e.target.checked)} className="w-5 h-5 rounded accent-chess-accent" />
            <span className="text-sm text-chess-100/70">Registration Open</span>
          </label>
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
