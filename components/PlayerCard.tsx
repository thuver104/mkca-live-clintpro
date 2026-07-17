import Image from "next/image";
import type { Player } from "@/lib/data/players";

function RatingRow({ label, value }: { label: string; value: number | null }) {
  return (
    <p className="text-chess-100/80">
      {label}:{" "}
      {value === null ? (
        <span className="text-chess-100/60">N/A</span>
      ) : (
        <span className="text-chess-accent font-semibold">{value}</span>
      )}
    </p>
  );
}

export function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="glass-card border-none backdrop-blur-2xl border border-chess-700/50 rounded-[1.5rem] p-6 text-center transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
      <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-chess-accent/30">
        <Image src={player.photo} alt={player.name} width={80} height={80} className="w-full h-full object-cover" />
      </div>
      <h4 className="font-heading tracking-wide text-xl font-bold text-chess-100 mb-2">{player.name}</h4>
      <p className="text-chess-accent font-semibold mb-1">{player.title}</p>
      <p className="text-chess-100/80 text-sm mb-2">{player.subtitle}</p>
      <div className="bg-chess-800/40 border-none rounded-lg p-2 text-xs space-y-1">
        <RatingRow label="Standard" value={player.standard} />
        <RatingRow label="Rapid" value={player.rapid} />
        <RatingRow label="Blitz" value={player.blitz} />
        <p className="text-chess-100/80">FIDE ID: {player.fideId}</p>
      </div>
      <a
        href={player.arenaProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-chess-accent hover:text-chess-accentHover text-xs"
      >
        Arena Profile
      </a>
    </div>
  );
}
