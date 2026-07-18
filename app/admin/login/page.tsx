"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4">
      <div className="glass-card border border-chess-700/50 rounded-[2rem] p-8 md:p-10 w-full max-w-md backdrop-blur-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-chess-accent/15 border border-chess-accent/20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-chess-knight text-chess-accent text-2xl"></i>
          </div>
          <h1 className="font-heading text-2xl font-bold text-chess-100">MKCA Admin</h1>
          <p className="text-chess-100/50 text-sm mt-1">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 focus:ring-1 focus:ring-chess-accent/30 transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-chess-accent text-gray-950 font-bold py-3 rounded-xl hover:bg-chess-accentHover transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
