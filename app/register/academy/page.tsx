"use client";

import { useState } from "react";
import Link from "next/link";

export default function AcademyRegisterPage() {
  const [form, setForm] = useState({
    player_name: "", age: "", gender: "", school: "",
    parent_name: "", phone: "", email: "", experience: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/academy/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Submission failed. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4">
        <div className="glass-card border border-chess-700/50 rounded-[2rem] p-8 md:p-12 max-w-md text-center backdrop-blur-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-emerald-400 text-2xl"></i>
          </div>
          <h1 className="font-heading text-2xl font-bold text-chess-100 mb-3">Registration Submitted!</h1>
          <p className="text-chess-100/60 mb-2">
            Thank you for registering <span className="text-chess-accent">{form.player_name}</span> at MKCA.
          </p>
          <p className="text-chess-100/40 text-sm mb-6">We will contact you with further details about classes and schedule.</p>
          <Link href="/" className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2">
            <i className="fas fa-home"></i>Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg">
        <div className="glass-card border border-chess-700/50 rounded-[2rem] p-8 md:p-10 backdrop-blur-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-chess-accent/15 border border-chess-accent/20 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-chess-knight text-chess-accent text-xl"></i>
            </div>
            <h1 className="font-heading text-2xl font-bold text-chess-100">Academy Registration</h1>
            <p className="text-chess-100/50 text-sm mt-1">Join Magical Knight Chess Academy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                Player Name <span className="text-red-400">*</span>
              </label>
              <input type="text" value={form.player_name} onChange={(e) => set("player_name", e.target.value)}
                required placeholder="Full name of the player"
                className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Age</label>
                <input type="number" value={form.age} onChange={(e) => set("age", e.target.value)}
                  placeholder="e.g. 10" min="3" max="80"
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Gender</label>
                <select value={form.gender} onChange={(e) => set("gender", e.target.value)}
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm">
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">School</label>
              <input type="text" value={form.school} onChange={(e) => set("school", e.target.value)}
                placeholder="School name"
                className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                Parent/Guardian Name <span className="text-red-400">*</span>
              </label>
              <input type="text" value={form.parent_name} onChange={(e) => set("parent_name", e.target.value)}
                required placeholder="Parent or guardian full name"
                className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                  Phone <span className="text-red-400">*</span>
                </label>
                <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                  required placeholder="07X XXX XXXX"
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Chess Experience</label>
              <select value={form.experience} onChange={(e) => set("experience", e.target.value)}
                className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm">
                <option value="">Select...</option>
                <option value="Beginner - Never played before">Beginner - Never played before</option>
                <option value="Beginner - Knows the rules">Beginner - Knows the rules</option>
                <option value="Intermediate - Plays regularly">Intermediate - Plays regularly</option>
                <option value="Advanced - Tournament player">Advanced - Tournament player</option>
                <option value="Rated Player (FIDE/ARIA)">Rated Player (FIDE/ARIA)</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
            )}

            <button type="submit" disabled={submitting}
              className="w-full bg-chess-accent text-gray-950 font-bold py-3.5 rounded-xl hover:bg-chess-accentHover transition-colors disabled:opacity-50 text-sm">
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>

        <p className="text-center text-chess-100/30 text-xs mt-4">
          <Link href="/" className="hover:text-chess-accent transition-colors">
            <i className="fas fa-arrow-left mr-1"></i>Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
