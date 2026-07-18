"use client";

import { useEffect, useState } from "react";

interface Submission { _id: string; formId: string; formTitle: string; tournamentTitle: string; data: Record<string, string>; submittedAt: string; }
interface Form { _id: string; title: string; }

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/forms").then((r) => r.json()).then((d) => { if (Array.isArray(d)) setForms(d); });
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedForm === "all" ? "/api/submissions" : `/api/submissions?formId=${selectedForm}`;
    fetch(url).then((r) => r.json()).then((d) => { setSubmissions(Array.isArray(d) ? d : []); setLoading(false); });
  }, [selectedForm]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/submissions/${id}`, { method: "DELETE" });
    setSubmissions((p) => p.filter((s) => s._id !== id));
  };

  const handleExport = () => {
    const url = selectedForm === "all" ? "/api/submissions/export" : `/api/submissions/export?formId=${selectedForm}`;
    window.open(url, "_blank");
  };

  const allKeys = new Set<string>();
  submissions.forEach((s) => { if (s.data) Object.keys(s.data).forEach((k) => allKeys.add(k)); });
  const columns = Array.from(allKeys);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-chess-100">Submissions</h1>
          <p className="text-chess-100/50 text-sm mt-1">{submissions.length} total submission{submissions.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={selectedForm} onChange={(e) => setSelectedForm(e.target.value)}
            className="bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-2.5 text-chess-100 text-sm focus:outline-none focus:border-chess-accent/50">
            <option value="all">All Forms</option>
            {forms.map((f) => <option key={f._id} value={f._id}>{f.title}</option>)}
          </select>
          <button onClick={handleExport} disabled={submissions.length === 0}
            className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition-colors text-sm disabled:opacity-50">
            <i className="fas fa-file-excel mr-2"></i>Export Excel
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-chess-100/50 text-center py-12">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="text-chess-100/50 text-center py-12">No submissions found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-chess-700/50">
                <th className="text-left py-3 px-3 text-chess-accent font-semibold text-xs">Date</th>
                {selectedForm === "all" && <th className="text-left py-3 px-3 text-chess-accent font-semibold text-xs">Form</th>}
                {columns.map((col) => (
                  <th key={col} className="text-left py-3 px-3 text-chess-accent font-semibold text-xs">{col}</th>
                ))}
                <th className="text-right py-3 px-3 text-chess-accent font-semibold text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s._id} className="border-b border-chess-700/20 hover:bg-white/[0.02]">
                  <td className="py-3 px-3 text-chess-100/60 whitespace-nowrap">{new Date(s.submittedAt).toLocaleDateString()}</td>
                  {selectedForm === "all" && <td className="py-3 px-3 text-chess-100/80">{s.formTitle}</td>}
                  {columns.map((col) => (
                    <td key={col} className="py-3 px-3 text-chess-100/80">{s.data?.[col] || "-"}</td>
                  ))}
                  <td className="py-3 px-3 text-right">
                    <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
