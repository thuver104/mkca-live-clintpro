"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Player { _id: string; name: string; title: string; standard: number | null; rapid: number | null; blitz: number | null; fideId: string; }

export default function AdminPlayersPage() {
  const [items, setItems] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => { fetch("/api/players").then((r) => r.json()).then((d) => { setItems(Array.isArray(d) ? d : []); setLoading(false); }); };
  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this player?")) return;
    await fetch(`/api/players/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl font-bold text-chess-100">Players</h1>
        <Link href="/admin/players/new" className="bg-chess-accent text-gray-950 font-bold px-5 py-2.5 rounded-xl hover:bg-chess-accentHover transition-colors text-sm">
          <i className="fas fa-plus mr-2"></i>New Player
        </Link>
      </div>
      {loading ? <div className="text-chess-100/50 text-center py-12">Loading...</div> : items.length === 0 ? (
        <div className="text-chess-100/50 text-center py-12">No players yet</div>
      ) : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p._id} className="glass-card border border-chess-700/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-chess-100">{p.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-chess-100/50">
                  <span className="text-chess-accent">{p.title}</span>
                  {p.standard && <span>Std: {p.standard}</span>}
                  {p.rapid && <span>Rapid: {p.rapid}</span>}
                  {p.blitz && <span>Blitz: {p.blitz}</span>}
                  <span>FIDE: {p.fideId}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/players/${p._id}/edit`} className="text-sm text-chess-blue hover:text-chess-blue/80 px-3 py-1.5 rounded-lg hover:bg-chess-blue/10 transition-colors"><i className="fas fa-pen mr-1"></i>Edit</Link>
                <button onClick={() => handleDelete(p._id)} className="text-sm text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><i className="fas fa-trash mr-1"></i>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
