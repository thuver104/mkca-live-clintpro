import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MediaModalProvider } from "@/components/MediaModalProvider";
import { FeaturedTournamentTabs } from "@/components/blog/FeaturedTournamentTabs";
import { EventSpotlightMedia } from "@/components/blog/EventSpotlightMedia";
import { getDb } from "@/lib/mongodb";

async function getBlogs() {
  try {
    const db = await getDb();
    return await db.collection("blogs").find({ published: true }).sort({ createdAt: -1 }).toArray();
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Blog & Announcements | MKCA",
  description: "MKCA blog — tournament announcements, event coverage, and stories from the academy.",
};

const CONTENT_CARDS = [
  { href: "#", icon: "fa-chess-knight", iconColor: "text-chess-blue", title: "Strategy & Tactics", description: "Advanced chess concepts, opening repertoires, and middle-game planning.", shadow: "hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] hover:border-chess-blue/50", lift: false },
  { href: "/tournaments", icon: "fa-trophy", iconColor: "text-chess-accent", title: "Tournaments", description: "Tournament reports, upcoming schedules, and preparation guides.", shadow: "hover:shadow-[0_15px_40px_rgba(245,158,11,0.15)] hover:border-chess-accent/50", lift: true },
  { href: "#", icon: "fa-graduation-cap", iconColor: "text-purple-400", title: "Learning Path", description: "Structured educational content for beginners to grandmasters.", shadow: "hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/50", lift: false },
  { href: "#", icon: "fa-users", iconColor: "text-green-400", title: "Academy News", description: "Updates, player achievements, and daily stories from MKCA.", shadow: "hover:shadow-[0_15px_40px_rgba(34,197,94,0.15)] hover:border-green-500/50", lift: true },
];

export default async function BlogPage() {
  const blogsData = await getBlogs();
  return (
    <>
      {/* Hero Section */}
      <header className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 text-center z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-chess-blue mb-8 animate-fade-in-up">
          <i className="fas fa-bolt"></i>
          <span className="text-sm font-semibold tracking-wide uppercase">The Latest from MKCA</span>
        </div>

        <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-6 max-w-5xl animate-fade-in-up">
          Mastering the <br className="hidden sm:block" />
          <span className="text-gradient-gold">Game of Kings.</span>
        </h1>

        <p className="font-sans text-lg sm:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in-up">
          Dive into our tournament announcements, tactical insights, and epic stories shaping the North&apos;s chess
          legacy.
        </p>

        <a
          href="#featured"
          className="w-14 h-20 rounded-full border-2 border-slate-700 flex justify-center p-2 hover:border-chess-accent transition-colors duration-300 group animate-fade-in-up"
        >
          <div className="w-1.5 h-4 bg-slate-500 group-hover:bg-chess-accent rounded-full animate-float"></div>
        </a>
      </header>

      {/* Featured Tournament (Magical Knight Classic 2026) */}
      <main id="featured" className="max-w-7xl mx-auto px-4 z-10 relative mb-32 scroll-mt-24">
        <div className="glass-card rounded-[2.5rem] md:rounded-[3rem] p-1 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-chess-accent/10 to-chess-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="bg-chess-900/60 rounded-[2.4rem] md:rounded-[2.9rem] p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left: Poster / TL;DR Side */}
            <div className="lg:w-5/12 flex flex-col justify-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse-slow">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Upcoming Event
                </div>
                <Image
                  src="/images/mkc26-logo.png"
                  alt="Magical Knight Classic 2026 Logo"
                  width={150}
                  height={150}
                  className="w-[120px] lg:w-[150px] mb-6 object-contain"
                />
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
                  Magical Knight <br />
                  <span className="text-gradient-gold">Classic 2026</span>
                </h2>
                <p className="text-slate-400 text-lg sm:text-xl font-light">
                  Exclusive Provincial Super-Tournament for Northern Province Players.
                </p>
              </div>

              <div className="flex flex-col gap-5 mb-10">
                <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-chess-accent/20 flex items-center justify-center text-chess-accent text-xl shrink-0">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Date & Time</p>
                    <p className="text-white font-semibold">08 APR 2026, 8:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-chess-blue/20 flex items-center justify-center text-chess-blue text-xl shrink-0">
                    <i className="fas fa-map-pin"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Location</p>
                    <p className="text-white font-semibold">Kilinochchi Maha Vidyalayam</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-xl shrink-0">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-0.5">Categories</p>
                    <p className="text-white font-medium text-sm">
                      Under 6, 8, 10, 12, 14 & Above 14 (Boys/Girls) + Parents
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="/pdf/magical-knight-classic-chess-tournament-2026.pdf"
                target="_blank"
                className="group flex items-center justify-center gap-3 bg-chess-accent hover:bg-chess-accentHover text-chess-950 font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:-translate-y-1 w-full text-lg"
              >
                <i className="fas fa-file-download text-xl group-hover:animate-bounce"></i>
                Download Full PDF
              </a>
            </div>

            {/* Right: Details Tabs */}
            <div className="lg:w-7/12 flex flex-col">
              <FeaturedTournamentTabs />
            </div>
          </div>
        </div>
      </main>

      {/* Categories / Bento Box Layout */}
      <section className="max-w-7xl mx-auto px-4 mb-32 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Explore More <span className="text-gradient-blue">Content</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dive deep into chess strategies, academy news, and historical tournaments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-500 ${card.shadow} ${card.lift ? "lg:translate-y-4" : ""}`}
            >
              <div className={`w-14 h-14 bg-chess-950 rounded-2xl flex items-center justify-center text-2xl ${card.iconColor} mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${card.icon}`}></i>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Past Event Spotlight: MCC 2025 */}
      <MediaModalProvider>
        <section className="max-w-7xl mx-auto px-4 mb-32 z-10 relative">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">
              Event <span className="text-slate-500">Spotlight</span>
            </h2>
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold tracking-wider text-slate-300">
              COMPLETED EVENT
            </div>
          </div>

          <div className="glass-card rounded-[2.5rem] overflow-hidden group border-slate-700/50">
            <div className="grid lg:grid-cols-2">
              <div className="relative overflow-hidden min-h-[400px] lg:min-h-full">
                <Image
                  src="/blog/mcc25/mcc25.webp"
                  alt="Mullai Chess Championship"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chess-950 via-chess-950/40 to-transparent lg:bg-gradient-to-r"></div>
              </div>

              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-chess-900/40">
                <p className="text-sm font-semibold tracking-widest text-chess-accent uppercase mb-3">
                  Historical Milestone
                </p>
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  முல்லை CHESS <br />
                  சாம்பியன்ஷிப் 2025
                </h3>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  முல்லைத்தீவு மாவட்டத்தின் சதுரங்க வரலாற்றில் புதிய பொற்காலத்தை உருவாக்கிய ஒரு பெரும் நிகழ்வாக,{" "}
                  <strong className="text-white">Magical Knight Chess Academy (MKCA)</strong> பெருமையுடன் நடத்திய
                  முல்லை CHESS சாம்பியன்ஷிப் 2025 மிகுந்த சிறப்புடனும் வெற்றிகரமாகவும் நிறைவடைந்துள்ளது. இது மாவட்ட
                  சதுரங்க வளர்ச்சிக்கு ஒரு மைல்கல்!
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-chess-950/60 rounded-2xl p-5 border border-slate-700/50">
                    <div className="text-3xl font-heading font-black text-white mb-1">350+</div>
                    <div className="text-sm text-slate-400">திறமையான வீரர்கள் களம் கண்டனர்</div>
                  </div>
                  <div className="bg-chess-950/60 rounded-2xl p-5 border border-slate-700/50">
                    <div className="text-3xl font-heading font-black text-white mb-1">4+</div>
                    <div className="text-sm text-slate-400">ஊடகங்களில் நேரடி கவரேஜ்</div>
                  </div>
                </div>

                <EventSpotlightMedia />
              </div>
            </div>
          </div>
        </section>
      </MediaModalProvider>

      {/* Quote Section */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-32 z-10 relative">
        <i className="fas fa-quote-left text-5xl text-chess-accent/20 mb-6"></i>
        <h2 className="font-heading text-3xl md:text-5xl font-black text-white leading-tight mb-6">
          &ldquo;Every chess master was once a beginner.&rdquo;
        </h2>
        <p className="text-xl text-slate-400 font-serif italic">— Irving Chernev</p>
      </section>
    </>
  );
}
