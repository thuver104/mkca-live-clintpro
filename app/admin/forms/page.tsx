"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Form { _id: string; title: string; tournamentTitle: string; active: boolean; fields: { id: string }[]; createdAt: string; }

export default function AdminFormsPage() {
  const [items, setItems] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => { fetch("/api/forms").then((r) => r.json()).then((d) => { setItems(Array.isArray(d) ? d : []); setLoading(false); }); };
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this form?")) return;
    await fetch(`/api/forms/${id}`, { method: "DELETE" });
    fetchData();
  };

  const toggleActive = async (id: string, active: boolean) => {
    await fetch(`/api/forms/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !active }) });
    fetchData();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl font-bold text-chess-100">Registration Forms</h1>
        <Link href="/admin/forms/new" className="bg-chess-accent text-gray-950 font-bold px-5 py-2.5 rounded-xl hover:bg-chess-accentHover transition-colors text-sm">
          <i className="fas fa-plus mr-2"></i>New Form
        </Link>
      </div>
      {loading ? <div className="text-chess-100/50 text-center py-12">Loading...</div> : items.length === 0 ? (
        <div className="text-chess-100/50 text-center py-12">No forms yet</div>
      ) : (
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f._id} className="glass-card border border-chess-700/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-chess-100">{f.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-chess-100/50">
                  <span>{f.tournamentTitle}</span>
                  <span>{f.fields?.length || 0} fields</span>
                  <span className={f.active ? "text-emerald-400" : "text-yellow-400"}>{f.active ? "Active" : "Inactive"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleActive(f._id, f.active)} className="text-sm text-chess-accent hover:text-chess-accentHover px-3 py-1.5 rounded-lg hover:bg-chess-accent/10 transition-colors">
                  <i className={`fas ${f.active ? "fa-toggle-on" : "fa-toggle-off"} mr-1`}></i>{f.active ? "Active" : "Inactive"}
                </button>
                <Link href={`/admin/forms/${f._id}/edit`} className="text-sm text-chess-blue hover:text-chess-blue/80 px-3 py-1.5 rounded-lg hover:bg-chess-blue/10 transition-colors"><i className="fas fa-pen mr-1"></i>Edit</Link>
                <button onClick={() => handleDelete(f._id)} className="text-sm text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><i className="fas fa-trash mr-1"></i>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
