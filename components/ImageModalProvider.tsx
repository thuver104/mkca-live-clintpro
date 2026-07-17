"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ImageModalContextValue = {
  open: (src: string, alt?: string) => void;
};

const ImageModalContext = createContext<ImageModalContextValue | null>(null);

export function ImageModalProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState("Enlarged Image");

  const open = useCallback((newSrc: string, newAlt = "Enlarged Image") => {
    setSrc(newSrc);
    setAlt(newAlt);
  }, []);

  const close = useCallback(() => setSrc(null), []);

  useEffect(() => {
    if (!src) return;
    document.body.classList.add("overflow-hidden");
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [src, close]);

  return (
    <ImageModalContext.Provider value={{ open }}>
      {children}
      {src && (
        <div
          className="fixed inset-0 bg-chess-950/90 backdrop-blur-md flex items-center justify-center z-[1000]"
          onClick={close}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl glass-card border border-slate-700/50"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute -top-4 -right-4 text-white text-3xl font-bold bg-chess-accent text-chess-950 rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300"
              onClick={close}
              aria-label="Close Modal"
            >
              x
            </button>
          </div>
        </div>
      )}
    </ImageModalContext.Provider>
  );
}

export function useImageModal() {
  const ctx = useContext(ImageModalContext);
  if (!ctx) throw new Error("useImageModal must be used within ImageModalProvider");
  return ctx;
}
