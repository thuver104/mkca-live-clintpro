"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ImageModalProvider } from "./ImageModalProvider";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <ImageModalProvider>
      <Nav />
      {children}
      <Footer />
    </ImageModalProvider>
  );
}
