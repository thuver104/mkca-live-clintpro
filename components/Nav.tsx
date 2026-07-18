"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const REGISTER_URL = "/register/academy";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/rated-players", label: "Rated Players" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < 60) {
            setHidden(false);
          } else if (y > lastScrollY.current + 5) {
            setHidden(true);
          } else if (y < lastScrollY.current - 5) {
            setHidden(false);
          }
          lastScrollY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/#contact") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{
          transform: hidden ? "translateY(-110%)" : "translateY(0)",
          opacity: hidden ? 0 : 1,
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          <nav className="glass-nav rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto shadow-2xl shadow-black/50 transition-all duration-300 transform hover:scale-[1.01]">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logo-mark.jpg"
                alt="MKCA Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-chess-accent/50 group-hover:border-chess-accent transition-colors"
              />
              <span className="font-heading font-bold text-xl tracking-wide hidden sm:block text-white">MKCA</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive(link.href)
                      ? "text-sm font-bold text-chess-accent relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-chess-accent after:rounded-full"
                      : "text-sm font-medium text-slate-300 hover:text-chess-accent transition-colors"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={REGISTER_URL}
                className="hidden sm:inline-flex items-center justify-center bg-chess-accent hover:bg-chess-accentHover text-chess-950 font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5"
              >
                Register Academy
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden text-slate-200 hover:text-white p-2"
                aria-label="Toggle menu"
              >
                <i className={open ? "fas fa-times text-2xl" : "fas fa-bars text-2xl"}></i>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-chess-950/95 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center justify-center ${
          open ? "mobile-menu-open" : "mobile-menu-closed"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-2xl font-heading font-semibold">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={
                isActive(link.href)
                  ? "text-chess-accent scale-110 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  : "text-slate-300 hover:text-chess-accent hover:scale-110 transition-all"
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={REGISTER_URL}
            onClick={() => setOpen(false)}
            className="mt-4 px-8 py-3 bg-chess-accent text-chess-950 rounded-full font-bold"
          >
            Register Now
          </Link>
        </div>
      </div>
    </>
  );
}
