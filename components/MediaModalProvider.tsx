"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type MediaType = "image" | "video";

type MediaModalContextValue = {
  open: (type: MediaType, src: string) => void;
};

const MediaModalContext = createContext<MediaModalContextValue | null>(null);

export function MediaModalProvider({ children }: { children: React.ReactNode }) {
  const [media, setMedia] = useState<{ type: MediaType; src: string } | null>(null);

  const open = useCallback((type: MediaType, src: string) => setMedia({ type, src }), []);
  const close = useCallback(() => setMedia(null), []);

  useEffect(() => {
    if (!media) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [media, close]);

  return (
    <MediaModalContext.Provider value={{ open }}>
      {children}
      {media && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
          onClick={close}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-chess-accent text-5xl transition-colors"
            onClick={close}
            aria-label="Close Modal"
          >
            &times;
          </button>
          <div className="max-w-6xl w-full mx-4 max-h-[90vh] flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            {media.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
                src={media.src}
                alt="Modal Media"
              />
            ) : (
              <video
                className="max-h-[85vh] w-full rounded-lg shadow-2xl"
                src={media.src}
                controls
                controlsList="nodownload"
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </MediaModalContext.Provider>
  );
}

export function useMediaModal() {
  const ctx = useContext(MediaModalContext);
  if (!ctx) throw new Error("useMediaModal must be used within MediaModalProvider");
  return ctx;
}
