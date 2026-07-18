"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Coach { _id: string; name: string; title: string; rating: string; email: string; phone: string; }

export default function AdminCoachesPage() {
  const [items, setItems] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => { fetch("/api/coaches").then((r) => r.json()).then((d) => { setItems(Array.isArray(d) ? d : []); setLoading(false); }); };
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coach?")) return;
    await fetch(`/api/coaches/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl font-bold text-chess-100">Coaches</h1>
        <Link href="/admin/coaches/new" className="bg-chess-accent text-gray-950 font-bold px-5 py-2.5 rounded-xl hover:bg-chess-accentHover transition-colors text-sm">
          <i className="fas fa-plus mr-2"></i>New Coach
        </Link>
      </div>
      {loading ? <div className="text-chess-100/50 text-center py-12">Loading...</div> : items.length === 0 ? (
        <div className="text-chess-100/50 text-center py-12">No coaches yet</div>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c._id} className="glass-card border border-chess-700/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-chess-100">{c.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-chess-100/50">
                  <span className="text-chess-accent">{c.title}</span>
                  {c.rating && <span>Rating: {c.rating}</span>}
                  <span>{c.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/coaches/${c._id}/edit`} className="text-sm text-chess-blue hover:text-chess-blue/80 px-3 py-1.5 rounded-lg hover:bg-chess-blue/10 transition-colors"><i className="fas fa-pen mr-1"></i>Edit</Link>
                <button onClick={() => handleDelete(c._id)} className="text-sm text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><i className="fas fa-trash mr-1"></i>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
