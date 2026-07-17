"use client";

import Image from "next/image";
import { useImageModal } from "./ImageModalProvider";

export function GalleryCard({
  title,
  subtitle,
  dateLabel,
  images,
  className = "",
}: {
  title: string;
  subtitle?: string;
  dateLabel: string;
  images: { src: string; alt: string }[];
  className?: string;
}) {
  const { open } = useImageModal();

  return (
    <div
      className={`rounded-[1.5rem] shadow-lg glass-card border-none backdrop-blur-2xl border border-chess-700/50 p-4 ${className}`}
    >
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide rounded-xl mb-3">
        {images.map((image) => (
          <button
            key={image.src}
            onClick={() => open(image.src, image.alt)}
            className="w-32 h-24 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={150}
              className="w-full h-full object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
      <h3 className="text-center font-semibold text-chess-accent max-w-sm mx-auto">
        <div className="text-xl font-bold mb-1">
          {title}
          {subtitle && (
            <>
              <br />
              {subtitle}
            </>
          )}
        </div>
        <div className="flex items-center justify-center text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-chess-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dateLabel}
        </div>
      </h3>
    </div>
  );
}
