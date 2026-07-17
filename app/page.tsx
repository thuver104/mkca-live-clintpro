import Link from "next/link";
import { AcademyStatus } from "@/components/AcademyStatus";
import { CoachCard } from "@/components/CoachCard";
import { GalleryCard } from "@/components/GalleryCard";
import { QuoteCard } from "@/components/QuoteCard";
import { StatGrid } from "@/components/StatGrid";
import { coaches } from "@/lib/data/coaches";
import { achievementGallery } from "@/lib/data/achievements";

const FEATURES = [
  { icon: "fa-graduation-cap", title: "Expert Instruction", description: "Learn from grandmasters and certified instructors with decades of competitive experience." },
  { icon: "fa-users", title: "Community", description: "Join a vibrant community of chess enthusiasts and forge lifelong friendships." },
  { icon: "fa-laptop", title: "Modern Tools", description: "Access cutting-edge chess software and analysis tools to accelerate your learning." },
  { icon: "fa-medal", title: "Tournaments", description: "Participate in regular tournaments and competitions to test your skills." },
  { icon: "fa-clock", title: "Flexible Schedule", description: "Choose from various class times and formats that fit your busy lifestyle." },
  { icon: "fa-chart-line", title: "Progress Tracking", description: "Monitor your improvement with detailed analytics and personalized feedback." },
];

const FACTS = [
  { value: "600M+", label: "Chess players worldwide" },
  { value: "1500", label: "Years of chess history" },
  { value: "10^120", label: "Possible chess games" },
];

const OPENING_CEREMONY_IMAGES = [
  { src: "/images/gallery/opening-ceremony/IMG-20250608-WA0158.jpg", alt: "Open 1" },
  { src: "/images/gallery/opening-ceremony/IMG-20250608-WA0161.jpg", alt: "Open 2" },
  { src: "/images/gallery/opening-ceremony/IMG-20250608-WA0169.jpg", alt: "Open 3" },
];

const RAPID_TOURNAMENT_IMAGES = [
  { src: "/images/gallery/rapid-tournament-2025/IMG-20250608-WA0039.jpg", alt: "Match 1" },
  { src: "/images/gallery/rapid-tournament-2025/IMG-20250608-WA0050.jpg", alt: "Match 2" },
  { src: "/images/gallery/rapid-tournament-2025/IMG-20250608-WA0109.jpg", alt: "Match 3" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 glass-card border-none border border-chess-700/50 rounded-full px-4 py-2 mb-6 backdrop-blur-xl">
              <span className="text-chess-accent font-semibold">MKCA</span>
              <span className="text-slate-400">•</span>
              <span className="text-chess-100/80 text-sm">Magical Knight Chess Academy</span>
            </div>

            <h1 className="font-heading tracking-wide font-bold text-4xl md:text-6xl lg:text-7xl leading-tight drop-shadow-2xl">
              <span className="text-gradient-gold">Sharpen</span> your mind.
              <br />
              Master the game.
            </h1>

            <p className="mt-5 text-base md:text-lg text-chess-100/80 max-w-2xl leading-relaxed">
              Build strategy, confidence, and competitive excellence — with training and tournaments guided by MKCA.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfYgU1wGA43ZoiLstBRc-phXF7H_BOO88Ex5Xw0d9I5SaeVfg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-chess-accent text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors duration-300 inline-flex items-center justify-center gap-2"
              >
                <i className="fas fa-chess-knight"></i>
                Register Now
              </a>
              <Link
                href="/tournaments"
                className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors duration-300 inline-flex items-center justify-center gap-2 backdrop-blur-xl"
              >
                <i className="fas fa-trophy"></i>
                View Tournaments
              </Link>
              <Link
                href="/blog"
                className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors duration-300 inline-flex items-center justify-center gap-2 backdrop-blur-xl"
              >
                <i className="fas fa-newspaper"></i>
                Read Blog
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-card border border-chess-700/50 rounded-[1.5rem] p-4 backdrop-blur-xl">
                <div className="text-chess-accent font-semibold">Coaching</div>
                <div className="text-sm text-chess-100/80">All levels, structured learning</div>
              </div>
              <div className="glass-card border border-chess-700/50 rounded-[1.5rem] p-4 backdrop-blur-xl">
                <div className="text-chess-accent font-semibold">Tournaments</div>
                <div className="text-sm text-chess-100/80">Play, improve, compete</div>
              </div>
              <div className="glass-card border border-chess-700/50 rounded-[1.5rem] p-4 backdrop-blur-xl">
                <div className="text-chess-accent font-semibold">Community</div>
                <div className="text-sm text-chess-100/80">Northern chess growth</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-6 md:p-8">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="inline-flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-chess-accent"></i>
                  <span className="font-semibold text-chess-100">Kilinochchi</span>
                </div>
                <span className="text-xs glass-card border border-chess-700/50 text-chess-100 px-3 py-1 rounded-full font-semibold">
                  Open Hours
                </span>
              </div>

              <h2 className="font-heading tracking-wide text-2xl md:text-3xl mb-3 text-chess-accent">
                <AcademyStatus />
              </h2>

              <p className="text-chess-100/80 mb-6">Near Fashion Bee, Thirunagar, Kilinochchi</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <a
                  href="https://maps.app.goo.gl/x7ZbwF4F1dKrmtM37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-5 py-3 rounded-xl hover:bg-white/5 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-map"></i>
                  Google Maps
                </a>
                <a
                  href="#coach"
                  className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-5 py-3 rounded-xl hover:bg-white/5 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-users"></i>
                  Our Coaches
                </a>
              </div>

              <div className="bg-chess-800/40 rounded-[1.5rem] p-5 border border-white/10">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <span className="font-semibold text-chess-100">Next Highlight</span>
                  </div>
                  <span className="text-xs glass-card border border-chess-700/50 text-chess-100 px-3 py-1 rounded-full font-semibold">
                    2026
                  </span>
                </div>
                <div className="font-heading tracking-wide text-xl font-bold text-chess-accent">
                  Magical Knight Classic
                </div>
                <div className="text-sm text-chess-100/80 mt-1">08 APR 2026 • Registration open</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <a
                    href="/pdf/magical-knight-classic-chess-tournament-2026.pdf"
                    target="_blank"
                    className="bg-chess-accent text-gray-900 font-semibold px-5 py-3 rounded-xl hover:bg-chess-accentHover transition-colors duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-file-pdf"></i>
                    PDF
                  </a>
                  <Link
                    href="/tournaments#current-tournament"
                    className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-5 py-3 rounded-xl hover:bg-white/5 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-arrow-right"></i>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#about"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-card border border-chess-700/50 text-chess-accent hover:text-chess-accentHover transition-colors duration-300"
            aria-label="Scroll to About"
          >
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 md:p-12 transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
            <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-8 text-gradient-gold">
              About Our Academy
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg md:text-xl leading-relaxed mb-6 text-chess-100/90">
                  Welcome to the <strong className="text-chess-accent">Magical Knight Chess Academy</strong>, where
                  the timeless game of chess becomes a journey of intellectual growth and strategic excellence.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-6 text-chess-100/90">
                  Located in <strong className="text-chess-accent">Kilinochchi</strong>,{" "}
                  <strong className="text-chess-accent">Puthukudiyiruppu</strong>, and{" "}
                  <strong className="text-chess-accent">Vavuniya</strong>, our academy blends classical chess wisdom
                  with modern teaching techniques. We provide an inspiring and supportive environment where players of
                  all levels can thrive and unlock their full potential.
                </p>
                <div className="flex items-center space-x-4 text-chess-accent">
                  <i className="fas fa-trophy text-2xl"></i>
                  <span className="text-lg font-semibold">Excellence in Chess Education</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-8xl md:text-9xl mb-4">♟</div>
                <p className="text-slate-400 italic">&ldquo;Chess is the gymnasium of the mind&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section id="coach" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold mb-12 text-gradient-gold">
            Meet Our Coaches
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {coaches.map((coach) => (
              <CoachCard key={coach.name} coach={coach} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold">
            What Awaits You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="glass-card backdrop-blur-xl border border-chess-700/50 rounded-[1.5rem] p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
              >
                <div className="text-5xl mb-4 text-chess-accent">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="font-heading tracking-wide text-2xl font-bold mb-4 text-chess-100">{feature.title}</h3>
                <p className="text-chess-100/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="relative z-10 py-20 px-4" id="events">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold mb-8 text-center text-gradient-gold">
            Event Highlights
          </h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2">
            <GalleryCard
              title="Opening Ceremony"
              dateLabel="June 2025"
              images={OPENING_CEREMONY_IMAGES}
              className="min-w-[200px] mx-2 snap-center"
            />
            <GalleryCard
              title="Rapid Chess Tournament"
              dateLabel="June 2025"
              images={RAPID_TOURNAMENT_IMAGES}
              className="min-w-[200px] mx-2 snap-center"
            />
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      <section className="relative z-10 py-20 px-4" id="achievements">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold mb-8 text-center text-gradient-gold">
            Achievements
          </h2>
          <div className="flex justify-center">
            <GalleryCard
              title={achievementGallery.title}
              subtitle={achievementGallery.subtitle}
              dateLabel={achievementGallery.dateLabel}
              images={achievementGallery.images}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Chess Facts Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold">
            Did You Know?
          </h2>
          <StatGrid stats={FACTS} />
        </div>
      </section>

      <QuoteCard quote="Chess is mental torture." cite="Garry Kasparov" />
    </>
  );
}
