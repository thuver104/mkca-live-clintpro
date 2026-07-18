const PIECES: { glyph: string; style: React.CSSProperties }[] = [
  { glyph: "\u265B", style: { top: "12%", left: "8%", fontSize: "5rem" } },
  { glyph: "\u265C", style: { top: "20%", right: "10%", animationDelay: "-2s", fontSize: "4rem" } },
  { glyph: "\u265D", style: { top: "55%", left: "5%", animationDelay: "-4s", fontSize: "3.5rem" } },
  { glyph: "\u265E", style: { top: "65%", right: "8%", animationDelay: "-1s", fontSize: "4.5rem" } },
  { glyph: "\u265F", style: { top: "35%", left: "82%", animationDelay: "-3s", fontSize: "3rem" } },
  { glyph: "\u265A", style: { top: "80%", left: "55%", animationDelay: "-5s", fontSize: "3.5rem" } },
  { glyph: "\u2659", style: { top: "30%", left: "18%", animationDelay: "-2.5s", fontSize: "2.5rem" } },
  { glyph: "\u2654", style: { top: "8%", right: "35%", animationDelay: "-4.5s", fontSize: "3rem" } },
  { glyph: "\u265E", style: { top: "45%", left: "45%", animationDelay: "-3.5s", fontSize: "2rem" } },
  { glyph: "\u265B", style: { top: "75%", right: "25%", animationDelay: "-1.5s", fontSize: "2.5rem" } },
];

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Primary glow blobs */}
      <div className="absolute -top-[15%] -left-[15%] w-[55vw] h-[55vw] rounded-full bg-chess-blue/8 mix-blend-screen filter blur-[120px] animate-blob" />
      <div className="absolute top-[15%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-chess-accent/8 mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute -bottom-[25%] left-[15%] w-[65vw] h-[65vw] rounded-full bg-purple-600/6 mix-blend-screen filter blur-[140px] animate-blob" style={{ animationDelay: "4s" }} />

      {/* Secondary accent blobs */}
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-chess-accent/5 mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: "6s" }} />
      <div className="absolute top-[10%] left-[50%] w-[25vw] h-[25vw] rounded-full bg-chess-blue/5 mix-blend-screen filter blur-[80px] animate-blob" style={{ animationDelay: "3s" }} />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Floating chess pieces */}
      {PIECES.map((piece, i) => (
        <div key={i} className="text-slate-100/[0.03] absolute animate-float select-none" style={piece.style}>
          {piece.glyph}
        </div>
      ))}
    </div>
  );
}
