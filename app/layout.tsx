import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";
import { PublicShell } from "@/components/PublicShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MKCA - Magical Knight Chess Academy",
  description:
    "Magical Knight Chess Academy (MKCA) — chess coaching, tournaments, and rated players in Kilinochchi, Northern Province.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className="bg-chess-950 text-chess-100 font-sans antialiased overflow-x-hidden selection:bg-chess-accent selection:text-chess-950"
        suppressHydrationWarning
      >
        <AmbientBackground />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
