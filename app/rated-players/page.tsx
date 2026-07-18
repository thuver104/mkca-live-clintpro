import type { Metadata } from "next";
import { PlayerCard } from "@/components/PlayerCard";
import { QuoteCard } from "@/components/QuoteCard";
import { StatGrid } from "@/components/StatGrid";
import {
  arenaRatingCategories,
  fideRatingCategories,
  playerStats,
  risingStars,
  titleCategories,
} from "@/lib/data/players";
import { getDb } from "@/lib/mongodb";

async function getPlayers() {
  try {
    const db = await getDb();
    return await db.collection("players").find().sort({ order: 1 }).toArray();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Rated Players | MKCA",
  description: "Meet MKCA's officially rated chess players — Arena and FIDE titles, ratings, and profiles.",
};

export default async function RatedPlayersPage() {
  const playersData = (await getPlayers()) as unknown as { name: string; photo: string; title: string; titleShort: string; subtitle: string; standard: number | null; rapid: number | null; blitz: number | null; fideId: string; arenaProfileUrl: string }[];
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 text-center flex flex-col items-center">
        <h1 className="font-heading tracking-wide font-bold text-5xl sm:text-7xl lg:text-8xl mb-6 drop-shadow-2xl">
          <span className="text-gradient-gold">Rated</span>
          <br />
          <span className="text-chess-100">Players</span>
        </h1>
        <p className="font-sans text-xl md:text-3xl lg:text-4xl tracking-wide mb-4 max-w-4xl text-chess-100/90 font-light">
          Our Elite Chess Champions
        </p>
        <p className="font-sans text-lg md:text-xl mb-12 max-w-3xl text-slate-400 font-light leading-relaxed">
          Meet our accomplished players who have earned official ratings through competitive play.
        </p>

        <div className="w-full max-w-5xl mb-4">
          <h2 className="font-heading tracking-wide text-2xl md:text-3xl mb-4 text-chess-accent text-center">
            MKCA Elite Players
          </h2>
          <p className="mb-8 text-lg text-chess-accent/90 flex flex-col items-center gap-2">
            <span className="text-center text-base md:text-lg font-semibold">
              Officially Rated Chess Players from Northern Province
            </span>
          </p>
        </div>
      </section>

      {/* Rated Players Section */}
      <section id="rated-players" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-gold">
            Our Rated Players
          </h2>

          {/* Rating Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {titleCategories.map((category) => (
              <div
                key={category.title}
                className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
              >
                <div className="text-6xl mb-4">{category.icon}</div>
                <h3 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-4">{category.title}</h3>
                <p className="text-chess-100/80 mb-4">{category.label}</p>
                <div className="text-3xl font-bold text-chess-accent">{category.count}</div>
                <p className="text-chess-100/60">{category.sub}</p>
              </div>
            ))}
          </div>

          {/* Featured Players */}
          <div className="mb-16">
            <h3 className="font-heading tracking-wide text-3xl font-bold text-center mb-8 text-chess-accent">
              Featured Players
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playersData.map((player) => (
                <PlayerCard key={player.name} player={player} />
              ))}
            </div>
          </div>

          {/* Rating System Information */}
          <div className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 md:p-12">
            <h3 className="font-heading tracking-wide text-2xl font-bold text-center mb-8 text-chess-accent">
              Chess Rating System
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-chess-100 mb-4">FIDE Rating Categories</h4>
                <div className="space-y-3">
                  {fideRatingCategories.map((item) => (
                    <div key={item.name} className="flex justify-between bg-chess-800/40 rounded-lg p-3">
                      <span className="text-chess-100">{item.name}</span>
                      <span className="text-chess-accent font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-chess-100 mb-4">Arena Rating Categories</h4>
                <div className="space-y-3">
                  {arenaRatingCategories.map((item) => (
                    <div key={item.name} className="flex justify-between bg-chess-800/40 rounded-lg p-3">
                      <span className="text-chess-100">{item.name}</span>
                      <span className="text-chess-accent font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Player Summary Table */}
            <div className="bg-chess-800/40 rounded-[1.5rem] p-6">
              <h4 className="font-semibold text-chess-100 mb-4 text-center">MKCA Player Summary</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-chess-accent/30">
                      <th className="text-left py-3 px-2 text-chess-accent font-semibold">Player</th>
                      <th className="text-center py-3 px-2 text-chess-accent font-semibold">Arena Title</th>
                      <th className="text-center py-3 px-2 text-chess-accent font-semibold">Standard</th>
                      <th className="text-center py-3 px-2 text-chess-accent font-semibold">Rapid</th>
                      <th className="text-center py-3 px-2 text-chess-accent font-semibold">Blitz</th>
                      <th className="text-center py-3 px-2 text-chess-accent font-semibold">FIDE ID</th>
                    </tr>
                  </thead>
                  <tbody className="text-chess-100/80">
                    {playersData.map((player, i) => (
                      <tr key={player.name} className={i < playersData.length - 1 ? "border-b border-white/10" : ""}>
                        <td className="py-3 px-2 font-semibold">{player.name}</td>
                        <td className="py-3 px-2 text-center text-xs">{player.titleShort}</td>
                        <td className="py-3 px-2 text-center">
                          {player.standard === null ? (
                            <span className="text-chess-100/60">N/A</span>
                          ) : (
                            <span className="text-chess-accent font-semibold">{player.standard}</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {player.rapid === null ? (
                            <span className="text-chess-100/60">N/A</span>
                          ) : (
                            <span className="text-chess-accent font-semibold">{player.rapid}</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {player.blitz === null ? (
                            <span className="text-chess-100/60">N/A</span>
                          ) : (
                            <span className="text-chess-accent font-semibold">{player.blitz}</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">{player.fideId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-chess-100/60 text-xs mt-4 text-center">
                All players joined MKCA in June 2025 and represent Sri Lanka (SRI) • Ratings are from Chess Arena
                platform • FIDE ratings are provisional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rising Stars Section */}
      <section id="rising-stars" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold">
            Rising Stars
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {risingStars.map((item) => (
              <div
                key={item.title}
                className="glass-card backdrop-blur-xl border border-chess-700/50 rounded-[1.5rem] p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
              >
                <div className="w-16 h-16 bg-chess-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <i className={`fas ${item.icon} text-2xl text-chess-accent`}></i>
                </div>
                <h3 className="font-heading tracking-wide text-xl font-bold mb-2 text-chess-100">{item.title}</h3>
                <p className="text-chess-100/80 leading-relaxed mb-4">{item.description}</p>
                <div className="text-2xl font-bold text-chess-accent">{item.count}</div>
                <p className="text-chess-100/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Statistics Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold">
            Player Statistics
          </h2>
          <StatGrid stats={playerStats.map((s) => ({ value: s.value, label: s.label }))} />
        </div>
      </section>

      <QuoteCard quote="Every chess master was once a beginner." cite="Irving Chernev" />
    </>
  );
}
