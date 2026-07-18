"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SIDEBAR_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "fa-gauge-high" },
  { href: "/admin/blogs", label: "Blogs", icon: "fa-newspaper" },
  { href: "/admin/tournaments", label: "Tournaments", icon: "fa-trophy" },
  { href: "/admin/players", label: "Players", icon: "fa-chess-pawn" },
  { href: "/admin/coaches", label: "Coaches", icon: "fa-chalkboard-teacher" },
  { href: "/admin/forms", label: "Forms", icon: "fa-file-lines" },
  { href: "/admin/submissions", label: "Submissions", icon: "fa-table-list" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";
  const isRootPage = pathname === "/admin";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }
    if (isRootPage) {
      router.replace("/admin/login");
      return;
    }
    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) router.push("/admin/login");
        else setChecking(false);
      })
      .catch(() => router.push("/admin/login"));
  }, [pathname, router, isLoginPage, isRootPage]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (isLoginPage || isRootPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-chess-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-chess-accent/15 border border-chess-accent/20 flex items-center justify-center animate-pulse">
            <i className="fas fa-chess-knight text-chess-accent"></i>
          </div>
          <div className="text-chess-100/50 text-sm font-medium">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chess-950 flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-chess-900 border-r border-chess-700/50 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-chess-700/30">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group" onClick={() => setSidebarOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-chess-accent/15 border border-chess-accent/20 flex items-center justify-center group-hover:bg-chess-accent/25 transition-colors">
              <i className="fas fa-chess-knight text-chess-accent"></i>
            </div>
            <div>
              <div className="font-heading font-bold text-chess-100 text-sm leading-tight">MKCA</div>
              <div className="text-[10px] text-chess-100/40 uppercase tracking-widest">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {SIDEBAR_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/admin/dashboard" && pathname.startsWith(link.href) && !pathname.includes("/new") && !pathname.includes("/edit"));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-chess-accent/15 text-chess-accent"
                    : "text-chess-100/50 hover:text-chess-100 hover:bg-white/5"
                }`}
              >
                <i className={`fas ${link.icon} w-5 text-center text-base ${active ? "text-chess-accent" : ""}`}></i>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-chess-700/30">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-chess-100/50 hover:text-chess-100 hover:bg-white/5 transition-colors mb-1"
          >
            <i className="fas fa-external-link-alt w-5 text-center"></i>
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 w-full transition-colors"
          >
            <i className="fas fa-right-from-bracket w-5 text-center"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-chess-950/90 backdrop-blur-xl border-b border-chess-700/30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-chess-100/60 hover:text-chess-100 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <i className="fas fa-bars text-lg"></i>
              </button>
              <h2 className="text-sm font-medium text-chess-100/40 hidden sm:block">
                {SIDEBAR_LINKS.find((l) => pathname === l.href || (l.href !== "/admin/dashboard" && pathname.startsWith(l.href)))?.label || "Admin"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-chess-100/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Connected
              </div>
              <Link href="/" target="_blank" className="text-xs text-chess-100/40 hover:text-chess-accent transition-colors flex items-center gap-1.5">
                <i className="fas fa-external-link-alt"></i>
                <span className="hidden sm:inline">View Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
