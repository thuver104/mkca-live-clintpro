import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { QuoteCard } from "@/components/QuoteCard";
import { getDb } from "@/lib/mongodb";

async function getTournaments() {
  try {
    const db = await getDb();
    return await db.collection("tournaments").find().sort({ date: -1 }).toArray();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Tournaments & Championships | MKCA",
  description: "MKCA tournaments and championships — upcoming events, past results, and schedule.",
};

interface TournamentDoc {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  entryFee: string;
  status: string;
  featured: boolean;
  registrationOpen: boolean;
  registrationFormId?: string;
  ageCategories: string[];
  prizes: string;
  logo?: string;
  pdfUrl: string;
  whatsappLink: string;
  registrationLink: string;
  venueMapLink: string;
}

function registerLinkFor(t: { registrationLink?: string; registrationFormId?: string }) {
  if (t.registrationLink) {
    return { href: t.registrationLink, external: /^https?:\/\//.test(t.registrationLink) };
  }
  if (t.registrationFormId) {
    return { href: `/register?form=${t.registrationFormId}`, external: false };
  }
  return null;
}

export default async function TournamentsPage() {
  const tournamentsData = await getTournaments();
  const typed = tournamentsData as unknown as TournamentDoc[];
  const featured = typed.find((t) => t.featured && t.status !== "completed");
  const upcoming = typed.filter((t) => t.status === "upcoming" && !t.featured);
  const completed = typed.filter((t) => t.status === "completed");
  const featuredRegister = featured?.registrationOpen ? registerLinkFor(featured) : null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-12 lg:pt-52 lg:pb-20 px-4 text-center flex flex-col items-center">
        <h1 className="font-heading tracking-wide font-bold text-5xl sm:text-7xl lg:text-8xl mb-6 drop-shadow-2xl">
          <span className="text-gradient-gold">Tournaments</span>
          <br />
          <span className="text-chess-100">& Championships</span>
        </h1>
        <p className="font-sans text-xl md:text-3xl lg:text-4xl tracking-wide mb-4 max-w-4xl text-chess-100/90 font-light">
          Compete at the Highest Level
        </p>
        <p className="font-sans text-lg md:text-xl mb-8 max-w-3xl text-slate-400 font-light leading-relaxed">
          Join our prestigious tournaments and showcase your chess mastery on the competitive stage.
        </p>
      </section>

      {/* Featured / Upcoming Tournament */}
      {featured && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold text-center mb-10 text-gradient-gold">
              Featured Tournament
            </h2>

            <div className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 md:p-12 transition-transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
              <div className="text-center mb-8">
                {featured.logo ? (
                  <Image
                    src={featured.logo}
                    alt={`${featured.title} Logo`}
                    width={120}
                    height={120}
                    className="w-24 h-24 mx-auto mb-4 object-contain"
                  />
                ) : (
                  <div className="text-5xl mb-4">🏆</div>
                )}
                <h3 className="font-heading tracking-wide text-3xl md:text-4xl font-bold text-chess-accent mb-2">
                  {featured.title}
                </h3>
                {featured.description && (
                  <p className="text-chess-100/80 text-lg max-w-2xl mx-auto">{featured.description}</p>
                )}
                <div className={`inline-block px-4 py-2 rounded-full mt-4 font-semibold text-white ${
                  featured.registrationOpen ? "bg-green-600" : "bg-red-600"
                }`}>
                  {featured.registrationOpen ? "REGISTRATION OPEN" : "REGISTRATION CLOSED"}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <InfoCard icon="fa-calendar-alt" label="Date" value={featured.date} />
                <InfoCard icon="fa-clock" label="Time" value={featured.time} />
                <InfoCard icon="fa-map-marker-alt" label="Venue" value={featured.venue} />
                <InfoCard icon="fa-money-bill-wave" label="Entry Fee" value={featured.entryFee || "Free"} />
              </div>

              {featured.status === "upcoming" && (
                <div className="mb-8">
                  <h4 className="font-heading text-xl font-bold text-chess-accent mb-3 text-center flex items-center justify-center gap-2">
                    <i className="fas fa-hourglass-half animate-pulse"></i> Match Starts In
                  </h4>
                  <Countdown
                    target={`${featured.date} ${featured.time || "08:30:00"}`}
                    activeMessage={`${featured.date} · ${featured.time} · ${featured.venue}`}
                    startedMessage="🎉 The tournament has started! Good luck to all players!"
                  />
                </div>
              )}

              {featured.ageCategories && featured.ageCategories.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-heading text-xl font-bold text-chess-accent mb-4 text-center">Age Categories</h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {featured.ageCategories.map((cat) => (
                      <span key={cat} className="bg-chess-800/60 border border-chess-700/30 rounded-full px-4 py-2 text-sm font-medium text-chess-100">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {featured.prizes && (
                <div className="mb-8">
                  <h4 className="font-heading text-xl font-bold text-chess-accent mb-3 text-center">Awards & Prizes</h4>
                  <p className="text-chess-100/70 text-center max-w-2xl mx-auto whitespace-pre-line">{featured.prizes}</p>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3">
                {featuredRegister && (
                  featuredRegister.external ? (
                    <a
                      href={featuredRegister.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2"
                    >
                      <i className="fas fa-file-signature"></i>Register Now
                    </a>
                  ) : (
                    <Link
                      href={featuredRegister.href}
                      className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2"
                    >
                      <i className="fas fa-file-signature"></i>Register Now
                    </Link>
                  )
                )}
                {featured.whatsappLink && (
                  <a href={featured.whatsappLink} target="_blank" rel="noopener noreferrer"
                    className="bg-green-600/20 border border-green-600/30 text-green-400 font-bold px-6 py-3 rounded-xl hover:bg-green-600/30 transition-colors text-sm inline-flex items-center gap-2">
                    <i className="fab fa-whatsapp"></i>WhatsApp Group
                  </a>
                )}
                {featured.venueMapLink && (
                  <a href={featured.venueMapLink} target="_blank" rel="noopener noreferrer"
                    className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm inline-flex items-center gap-2">
                    <i className="fas fa-map-marked-alt text-chess-accent"></i>View Venue
                  </a>
                )}
                {featured.pdfUrl && (
                  <a href={featured.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors text-sm inline-flex items-center gap-2">
                    <i className="fas fa-file-pdf text-chess-accent"></i>Download PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Upcoming Tournaments */}
      {upcoming.length > 0 && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold mb-10 text-center text-gradient-gold">
              Upcoming Tournaments
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcoming.map((t) => (
                <UpcomingCard key={t._id} tournament={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Tournaments — Compact */}
      {completed.length > 0 && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold mb-8 text-center text-gradient-gold">
              Past Tournaments
            </h2>
            <div className="space-y-3">
              {completed.map((t) => (
                <CompletedCard key={t._id} tournament={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteCard quote="In chess, as in life, opportunity strikes but once." cite="Irving Chernev" />
    </>
  );
}

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-chess-800/40 rounded-2xl p-5 text-center">
      <i className={`fas ${icon} text-xl text-chess-accent mb-2`}></i>
      <h4 className="font-semibold text-chess-100 text-sm mb-1">{label}</h4>
      <p className="text-chess-100/70 text-sm">{value || "—"}</p>
    </div>
  );
}

function UpcomingCard({ tournament: t }: { tournament: TournamentDoc }) {
  const register = t.registrationOpen ? registerLinkFor(t) : null;
  return (
    <div className="glass-card backdrop-blur-xl border border-chess-700/50 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-chess-accent/30">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {t.logo && (
            <Image src={t.logo} alt={`${t.title} Logo`} width={40} height={40} className="w-10 h-10 object-contain shrink-0" />
          )}
          <h3 className="font-heading text-xl font-bold text-chess-accent leading-tight">{t.title}</h3>
        </div>
        <span className="shrink-0 ml-3 text-[10px] font-bold uppercase tracking-wider bg-chess-blue/20 text-chess-blue border border-chess-blue/20 px-2.5 py-1 rounded-full">
          {t.status}
        </span>
      </div>
      {t.description && <p className="text-chess-100/60 text-sm mb-3 line-clamp-2">{t.description}</p>}
      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div className="flex items-center gap-2 text-chess-100/70">
          <i className="fas fa-calendar-alt text-chess-accent/70 text-xs w-4 text-center"></i>{t.date}
        </div>
        <div className="flex items-center gap-2 text-chess-100/70">
          <i className="fas fa-clock text-chess-accent/70 text-xs w-4 text-center"></i>{t.time}
        </div>
        <div className="flex items-center gap-2 text-chess-100/70">
          <i className="fas fa-map-marker-alt text-chess-accent/70 text-xs w-4 text-center"></i>{t.venue}
        </div>
        {t.entryFee && (
          <div className="flex items-center gap-2 text-chess-100/70">
            <i className="fas fa-money-bill-wave text-chess-accent/70 text-xs w-4 text-center"></i>{t.entryFee}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {register && (
          register.external ? (
            <a href={register.href} target="_blank" rel="noopener noreferrer"
              className="bg-chess-accent text-gray-950 font-bold px-4 py-2 rounded-lg text-xs hover:bg-chess-accentHover transition-colors">
              <i className="fas fa-pen mr-1"></i>Register
            </a>
          ) : (
            <Link href={register.href}
              className="bg-chess-accent text-gray-950 font-bold px-4 py-2 rounded-lg text-xs hover:bg-chess-accentHover transition-colors">
              <i className="fas fa-pen mr-1"></i>Register
            </Link>
          )
        )}
        {t.pdfUrl && (
          <a href={t.pdfUrl} target="_blank" rel="noopener noreferrer"
            className="glass-card border border-chess-700/50 text-chess-100 px-4 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors">
            <i className="fas fa-file-pdf mr-1 text-chess-accent"></i>PDF
          </a>
        )}
        {t.venueMapLink && (
          <a href={t.venueMapLink} target="_blank" rel="noopener noreferrer"
            className="glass-card border border-chess-700/50 text-chess-100 px-4 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors">
            <i className="fas fa-map mr-1 text-chess-accent"></i>Map
          </a>
        )}
      </div>
    </div>
  );
}

function CompletedCard({ tournament: t }: { tournament: TournamentDoc }) {
  return (
    <div className="glass-card backdrop-blur-xl border border-chess-700/30 rounded-xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-chess-700/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="font-heading text-base font-bold text-chess-100 truncate">{t.title}</h3>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-chess-100/10 text-chess-100/50 px-2 py-0.5 rounded-full">
            Completed
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1 text-xs text-chess-100/40">
          <span><i className="fas fa-calendar-alt mr-1"></i>{t.date}</span>
          <span><i className="fas fa-map-marker-alt mr-1"></i>{t.venue}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {t.pdfUrl && (
          <a href={t.pdfUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs text-chess-100/50 hover:text-chess-accent px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <i className="fas fa-file-pdf mr-1"></i>PDF
          </a>
        )}
      </div>
    </div>
  );
}
