const PIECES = [
  { glyph: "♛", style: { top: "15%", left: "10%" } },
  { glyph: "♜", style: { top: "25%", right: "15%", animationDelay: "-2s" } },
  { glyph: "♝", style: { top: "60%", left: "8%", animationDelay: "-4s" } },
  { glyph: "♞", style: { top: "70%", right: "12%", animationDelay: "-1s" } },
  { glyph: "♟", style: { top: "40%", left: "85%", animationDelay: "-3s" } },
  { glyph: "♚", style: { top: "85%", left: "60%", animationDelay: "-5s" } },
  { glyph: "♙", style: { top: "35%", left: "20%", animationDelay: "-2.5s" } },
  { glyph: "♔", style: { top: "10%", right: "40%", animationDelay: "-4.5s" } },
];

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-chess-blue/10 mix-blend-screen filter blur-[100px] animate-blob" />
      <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-chess-accent/10 mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 mix-blend-screen filter blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {PIECES.map((piece, i) => (
        <div key={i} className="text-6xl text-slate-100/5 absolute animate-float" style={piece.style}>
          {piece.glyph}
        </div>
      ))}
    </div>
  );
}
