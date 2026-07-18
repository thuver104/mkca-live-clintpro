"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface Field { id: string; label: string; type: string; required: boolean; options: string[]; placeholder: string; }

export default function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [tournamentTitle, setTournamentTitle] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/forms/${id}`).then((r) => r.json()).then((d) => {
      setTitle(d.title || "");
      setTournamentTitle(d.tournamentTitle || "");
      setFields((d.fields || []).map((f: Field) => ({ ...f, options: f.options || [] })));
      setLoading(false);
    });
  }, [id]);

  const addField = () => {
    setFields((p) => [...p, { id: crypto.randomUUID(), label: "", type: "text", required: false, options: [], placeholder: "" }]);
  };

  const updateField = (idx: number, key: keyof Field, val: string | boolean | string[]) => {
    setFields((p) => p.map((f, i) => i === idx ? { ...f, [key]: val } : f));
  };

  const removeField = (idx: number) => {
    setFields((p) => p.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { title, tournamentTitle, tournamentId: "", fields };
    await fetch(`/api/forms/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    router.push("/admin/forms");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this form?")) return;
    await fetch(`/api/forms/${id}`, { method: "DELETE" });
    router.push("/admin/forms");
  };

  if (loading) return <div className="text-chess-100/50 text-center py-12">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-chess-100 mb-8">Edit Form</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Form Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
            className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Tournament Title</label>
          <input type="text" value={tournamentTitle} onChange={(e) => setTournamentTitle(e.target.value)} required
            className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
        </div>
        <div className="border-t border-chess-700/30 pt-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-chess-100">Form Fields</h2>
            <button type="button" onClick={addField} className="text-sm text-chess-accent hover:text-chess-accentHover transition-colors"><i className="fas fa-plus mr-1"></i>Add Field</button>
          </div>
          <div className="space-y-4">
            {fields.map((field, idx) => (
              <div key={field.id} className="bg-chess-800/30 border border-chess-700/30 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-chess-100/40 font-mono">Field {idx + 1}</span>
                  <button type="button" onClick={() => removeField(idx)} className="text-red-400 hover:text-red-300 text-xs"><i className="fas fa-trash"></i></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" value={field.label} onChange={(e) => updateField(idx, "label", e.target.value)} placeholder="Label" required
                    className="bg-chess-800/60 border border-chess-700/50 rounded-lg px-3 py-2 text-chess-100 text-sm placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50" />
                  <select value={field.type} onChange={(e) => updateField(idx, "type", e.target.value)}
                    className="bg-chess-800/60 border border-chess-700/50 rounded-lg px-3 py-2 text-chess-100 text-sm focus:outline-none focus:border-chess-accent/50">
                    {["text", "email", "phone", "number", "select", "textarea", "date"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <input type="text" value={field.placeholder} onChange={(e) => updateField(idx, "placeholder", e.target.value)} placeholder="Placeholder"
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-lg px-3 py-2 text-chess-100 text-sm placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50" />
                {field.type === "select" && (
                  <input type="text" value={(field.options || []).join(", ")} onChange={(e) => updateField(idx, "options", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} placeholder="Options (comma-separated)"
                    className="w-full bg-chess-800/60 border border-chess-700/50 rounded-lg px-3 py-2 text-chess-100 text-sm placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50" />
                )}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={field.required} onChange={(e) => updateField(idx, "required", e.target.checked)} className="w-4 h-4 rounded accent-chess-accent" />
                  <span className="text-xs text-chess-100/60">Required</span>
                </label>
              </div>
            ))}
          </div>
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
