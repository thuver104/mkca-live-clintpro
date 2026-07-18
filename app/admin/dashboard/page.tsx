"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ blogs: 0, tournaments: 0, players: 0, coaches: 0, submissions: 0, forms: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/blogs").then((r) => r.json()),
      fetch("/api/tournaments").then((r) => r.json()),
      fetch("/api/players").then((r) => r.json()),
      fetch("/api/coaches").then((r) => r.json()),
      fetch("/api/submissions").then((r) => r.json()),
      fetch("/api/forms").then((r) => r.json()),
    ]).then(([blogs, tournaments, players, coaches, submissions, forms]) => {
      setCounts({
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        tournaments: Array.isArray(tournaments) ? tournaments.length : 0,
        players: Array.isArray(players) ? players.length : 0,
        coaches: Array.isArray(coaches) ? coaches.length : 0,
        submissions: Array.isArray(submissions) ? submissions.length : 0,
        forms: Array.isArray(forms) ? forms.length : 0,
      });
      setLoading(false);
    });
  }, []);

  const stats = [
    { label: "Blogs", value: counts.blogs, icon: "fa-newspaper", color: "text-chess-blue", bg: "bg-chess-blue/10", href: "/admin/blogs" },
    { label: "Tournaments", value: counts.tournaments, icon: "fa-trophy", color: "text-chess-accent", bg: "bg-chess-accent/10", href: "/admin/tournaments" },
    { label: "Players", value: counts.players, icon: "fa-chess-pawn", color: "text-emerald-400", bg: "bg-emerald-400/10", href: "/admin/players" },
    { label: "Coaches", value: counts.coaches, icon: "fa-chalkboard-teacher", color: "text-purple-400", bg: "bg-purple-400/10", href: "/admin/coaches" },
    { label: "Forms", value: counts.forms, icon: "fa-file-lines", color: "text-cyan-400", bg: "bg-cyan-400/10", href: "/admin/forms" },
    { label: "Submissions", value: counts.submissions, icon: "fa-table-list", color: "text-rose-400", bg: "bg-rose-400/10", href: "/admin/submissions" },
  ];

  const quickActions = [
    { label: "New Blog", icon: "fa-pen-to-square", href: "/admin/blogs/new", color: "text-chess-blue", border: "border-chess-blue/20 hover:border-chess-blue/40" },
    { label: "New Tournament", icon: "fa-trophy", href: "/admin/tournaments/new", color: "text-chess-accent", border: "border-chess-accent/20 hover:border-chess-accent/40" },
    { label: "New Player", icon: "fa-user-plus", href: "/admin/players/new", color: "text-emerald-400", border: "border-emerald-400/20 hover:border-emerald-400/40" },
    { label: "New Coach", icon: "fa-user-tie", href: "/admin/coaches/new", color: "text-purple-400", border: "border-purple-400/20 hover:border-purple-400/40" },
    { label: "New Form", icon: "fa-file-circle-plus", href: "/admin/forms/new", color: "text-rose-400", border: "border-rose-400/20 hover:border-rose-400/40" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-chess-100">Dashboard</h1>
        <p className="text-chess-100/40 text-sm mt-1">Manage your academy content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="glass-card border border-chess-700/40 rounded-2xl p-4 sm:p-5 hover:border-chess-accent/30 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <i className={`fas ${s.icon} ${s.color} text-sm`}></i>
              </div>
              <i className="fas fa-arrow-right text-chess-100/0 group-hover:text-chess-100/20 text-xs transition-colors"></i>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-chess-100 group-hover:text-chess-accent transition-colors">
              {loading ? (
                <div className="w-12 h-7 bg-chess-700/30 rounded animate-pulse"></div>
              ) : (
                s.value
              )}
            </div>
            <div className="text-xs text-chess-100/40 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-heading text-lg font-bold text-chess-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className={`glass-card border ${a.border} rounded-2xl p-4 text-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group`}
            >
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${a.icon} ${a.color} text-base`}></i>
              </div>
              <span className="text-xs sm:text-sm font-medium text-chess-100/80">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
