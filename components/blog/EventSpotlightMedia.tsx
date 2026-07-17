"use client";

import { useState } from "react";
import { useMediaModal } from "@/components/MediaModalProvider";

const GALLERY_IMAGES = [
  "/blog/mcc25/image1.jpg",
  "/blog/mcc25/image2.jpg",
  "/blog/mcc25/image3.jpg",
  "/blog/mcc25/image4.jpg",
  "/blog/mcc25/image5.jpg",
  "/blog/mcc25/image6.jpg",
];

export function EventSpotlightMedia() {
  const { open } = useMediaModal();
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h4 className="font-heading text-xl font-bold text-white flex items-center gap-2">
        <i className="fas fa-video text-chess-accent"></i> Media Coverage
      </h4>
      <div className="grid grid-cols-3 gap-3">
        <div
          onClick={() => open("video", "/blog/mcc25/mediaclip/MullaiMedia.mp4")}
          className="block aspect-video bg-chess-950 rounded-xl overflow-hidden relative group/vid cursor-pointer border border-slate-700"
        >
          <div className="absolute inset-0 bg-chess-blue/20 flex items-center justify-center opacity-0 group-hover/vid:opacity-100 transition-opacity z-10">
            <i className="fas fa-play text-white text-2xl drop-shadow-md"></i>
          </div>
          <video src="/blog/mcc25/mediaclip/MullaiMedia.mp4" className="w-full h-full object-cover opacity-70" />
        </div>
        <div
          onClick={() => open("video", "/blog/mcc25/mediaclip/DanNews.mp4")}
          className="block aspect-video bg-chess-950 rounded-xl overflow-hidden relative group/vid cursor-pointer border border-slate-700"
        >
          <div className="absolute inset-0 bg-chess-blue/20 flex items-center justify-center opacity-0 group-hover/vid:opacity-100 transition-opacity z-10">
            <i className="fas fa-play text-white text-2xl drop-shadow-md"></i>
          </div>
          <video src="/blog/mcc25/mediaclip/DanNews.mp4" className="w-full h-full object-cover opacity-70" />
        </div>
        <button
          onClick={() => setGalleryOpen((v) => !v)}
          className="w-full aspect-video bg-chess-950 rounded-xl overflow-hidden relative group/vid cursor-pointer border border-slate-700 text-center flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-chess-950 hover:scale-[1.02] transition-transform"
        >
          <i className="fas fa-images text-2xl text-slate-400 mb-1 group-hover/vid:text-white transition-colors"></i>
          <span className="text-xs text-slate-400 font-medium group-hover/vid:text-white transition-colors">
            More Photos
          </span>
        </button>
      </div>

      {galleryOpen && (
        <div className="mt-6 bg-chess-950/50 p-4 rounded-2xl border border-slate-700/50 animate-fade-in-up">
          <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
            <i className="fas fa-camera text-chess-accent"></i> Event Gallery
          </h5>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {GALLERY_IMAGES.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                onClick={() => open("image", src)}
                src={src}
                className="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity cursor-pointer"
                alt="Gallery"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
