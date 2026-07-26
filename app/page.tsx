import Image from "next/image";
import Link from "next/link";
import { AcademyStatus } from "@/components/AcademyStatus";
import { CoachCard } from "@/components/CoachCard";
import { QuoteCard } from "@/components/QuoteCard";
import { StatGrid } from "@/components/StatGrid";
import { getDb } from "@/lib/mongodb";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  image?: string;
}

async function getCoaches() {
  try {
    const db = await getDb();
    return await db.collection("coaches").find().sort({ order: 1 }).toArray();
  } catch {
    return [];
  }
}

async function getPlayers() {
  try {
    const db = await getDb();
    return await db.collection("players").find().sort({ order: 1 }).toArray();
  } catch {
    return [];
  }
}

async function getTournaments() {
  try {
    const db = await getDb();
    return await db.collection("tournaments").find().sort({ date: -1 }).toArray();
  } catch {
    return [];
  }
}

async function getLatestBlogs() {
  try {
    const db = await getDb();
    const blogs = await db.collection("blogs").find({ published: true }).sort({ createdAt: -1 }).limit(3).toArray();
    return blogs as unknown as Blog[];
  } catch {
    return [];
  }
}

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

export default async function Home() {
  const [coachesData, playersData, tournamentsData, latestBlogs] = await Promise.all([
    getCoaches(),
    getPlayers(),
    getTournaments(),
    getLatestBlogs(),
  ]);
  const typed = tournamentsData as unknown as { featured?: boolean; status?: string; title?: string; date?: string; registrationFormId?: string; registrationLink?: string; pdfUrl?: string; logo?: string; _id?: string; registrationOpen?: boolean }[];
  const featuredTournament = typed.find((t) => t.featured && t.status !== "completed") || typed.find((t) => t.status === "upcoming");
  const statsCount = { students: playersData.length, coaches: coachesData.length, tournaments: tournamentsData.length };
  const heroRegister = featuredTournament?.registrationOpen
    ? featuredTournament.registrationLink
      ? { href: featuredTournament.registrationLink, external: /^https?:\/\//.test(featuredTournament.registrationLink) }
      : featuredTournament.registrationFormId
        ? { href: `/register?form=${featuredTournament.registrationFormId}`, external: false }
        : null
    : null;
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center pt-24 md:pt-32 pb-8 px-4 overflow-hidden">
        {/* Chess pattern overlay */}
        <div className="absolute inset-0 chess-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          {/* Left Column — Text & CTAs */}
          <div className="lg:col-span-7 hero-left">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 glass-card rounded-full px-5 py-2.5 mb-8 border border-chess-700/50">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-chess-100/90 text-sm font-medium">MKCA &mdash; Magical Knight Chess Academy</span>
            </div>

            {/* Heading */}
            <div className="hero-heading">
              <h1 className="font-heading tracking-tight font-extrabold text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] leading-[1.05]">
                <span className="text-gradient-gold-shimmer">Sharpen</span>
                <span className="text-chess-100"> your mind.</span>
                <br />
                <span className="text-chess-100">Master the </span>
                <span className="text-gradient-gold relative">
                  game.
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 C50 2, 150 2, 198 8" stroke="url(#gold-underline)" strokeWidth="3" strokeLinecap="round" className="line-expand" />
                    <defs>
                      <linearGradient id="gold-underline" x1="0" y1="0" x2="200" y2="0">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="hero-sub mt-6 text-lg md:text-xl text-chess-100/70 max-w-xl leading-relaxed">
              Build strategy, confidence, and competitive excellence — with training and tournaments guided by MKCA.
            </p>

            {/* CTAs */}
            <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-3">
              {heroRegister ? (
                heroRegister.external ? (
                  <a
                    href={heroRegister.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow relative bg-gradient-to-r from-chess-accent to-amber-500 text-gray-950 font-bold px-8 py-4 rounded-2xl hover:from-chess-accentHover hover:to-yellow-400 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <i className="fas fa-chess-knight text-xl"></i>
                    Register Now
                    <i className="fas fa-arrow-right text-sm"></i>
                  </a>
                ) : (
                  <Link
                    href={heroRegister.href}
                    className="btn-glow relative bg-gradient-to-r from-chess-accent to-amber-500 text-gray-950 font-bold px-8 py-4 rounded-2xl hover:from-chess-accentHover hover:to-yellow-400 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <i className="fas fa-chess-knight text-xl"></i>
                    Register Now
                    <i className="fas fa-arrow-right text-sm"></i>
                  </Link>
                )
              ) : (
                <Link
                  href="/tournaments"
                  className="btn-glow relative bg-gradient-to-r from-chess-accent to-amber-500 text-gray-950 font-bold px-8 py-4 rounded-2xl hover:from-chess-accentHover hover:to-yellow-400 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <i className="fas fa-chess-knight text-xl"></i>
                  View Tournaments
                  <i className="fas fa-arrow-right text-sm"></i>
                </Link>
              )}
              <Link
                href="/tournaments"
                className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-7 py-4 rounded-2xl hover:bg-white/[0.08] hover:border-chess-accent/30 transition-all duration-300 inline-flex items-center justify-center gap-2.5 backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <i className="fas fa-trophy text-chess-accent"></i>
                View Tournaments
              </Link>
              <Link
                href="/blog"
                className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-7 py-4 rounded-2xl hover:bg-white/[0.08] hover:border-chess-accent/30 transition-all duration-300 inline-flex items-center justify-center gap-2.5 backdrop-blur-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <i className="fas fa-newspaper text-chess-blue"></i>
                Read Blog
              </Link>
            </div>

            {/* Stats Strip */}
            <div className="hero-stats mt-10 flex items-center gap-0">
              <div className="flex flex-col items-center px-5 md:px-7 first:pl-0">
                <span className="font-heading text-2xl md:text-3xl font-bold text-chess-accent">900+</span>
                <span className="text-xs md:text-sm text-chess-100/50 mt-0.5">Students</span>
              </div>
              <div className="w-px h-10 bg-chess-700/50"></div>
              <div className="flex flex-col items-center px-5 md:px-7">
                <span className="font-heading text-2xl md:text-3xl font-bold text-chess-accent">{statsCount.coaches}+</span>
                <span className="text-xs md:text-sm text-chess-100/50 mt-0.5">Coaches</span>
              </div>
              <div className="w-px h-10 bg-chess-700/50"></div>
              <div className="flex flex-col items-center px-5 md:px-7">
                <span className="font-heading text-2xl md:text-3xl font-bold text-chess-accent">{statsCount.tournaments}+</span>
                <span className="text-xs md:text-sm text-chess-100/50 mt-0.5">Tournaments</span>
              </div>
              <div className="w-px h-10 bg-chess-700/50 hidden sm:block"></div>
              <div className="hidden sm:flex flex-col items-center px-5 md:px-7">
                <span className="font-heading text-2xl md:text-3xl font-bold text-chess-accent">2</span>
                <span className="text-xs md:text-sm text-chess-100/50 mt-0.5">Years</span>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="hero-features mt-8 flex flex-wrap gap-3">
              <div className="glass-card border border-chess-700/30 rounded-full px-5 py-2.5 flex items-center gap-2.5 backdrop-blur-xl hover:border-chess-accent/40 transition-colors duration-300">
                <i className="fas fa-graduation-cap text-chess-accent text-sm"></i>
                <span className="text-sm font-medium text-chess-100/80">Expert Coaching</span>
              </div>
              <div className="glass-card border border-chess-700/30 rounded-full px-5 py-2.5 flex items-center gap-2.5 backdrop-blur-xl hover:border-chess-accent/40 transition-colors duration-300">
                <i className="fas fa-trophy text-chess-accent text-sm"></i>
                <span className="text-sm font-medium text-chess-100/80">Tournaments</span>
              </div>
              <div className="glass-card border border-chess-700/30 rounded-full px-5 py-2.5 flex items-center gap-2.5 backdrop-blur-xl hover:border-chess-accent/40 transition-colors duration-300">
                <i className="fas fa-users text-chess-accent text-sm"></i>
                <span className="text-sm font-medium text-chess-100/80">Community</span>
              </div>
            </div>
          </div>

          {/* Right Column — Floating Info Card */}
          <div className="lg:col-span-5 hero-right">
            <div className="relative">
              {/* Decorative glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-chess-accent/10 via-transparent to-chess-blue/10 rounded-[3rem] blur-2xl pointer-events-none" />

              <div className="glass-card backdrop-blur-2xl border border-chess-700/40 border-glow-card rounded-[2rem] p-7 md:p-8 relative">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-chess-accent/15 border border-chess-accent/20 flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-chess-accent"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-chess-100 text-sm">Kilinochchi</div>
                      <div className="text-xs text-chess-100/50">Northern Province</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 glass-card border border-emerald-500/20 rounded-full px-3 py-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-emerald-400">Open Hours</span>
                  </div>
                </div>

                {/* Status */}
                <h2 className="font-heading tracking-wide text-2xl md:text-3xl mb-3">
                  <span className="text-gradient-gold"><AcademyStatus /></span>
                </h2>

                <p className="text-chess-100/60 text-sm mb-6 flex items-center gap-2">
                  <i className="fas fa-location-dot text-chess-700"></i>
                  Near Fashion Bee, Thirunagar, Kilinochchi
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <a
                    href="https://maps.app.goo.gl/x7ZbwF4F1dKrmtM37"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card border border-chess-700/50 text-chess-100 text-sm font-semibold px-4 py-3 rounded-xl hover:bg-white/[0.08] hover:border-chess-blue/30 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-map text-chess-blue"></i>
                    Google Maps
                  </a>
                  <a
                    href="#coach"
                    className="glass-card border border-chess-700/50 text-chess-100 text-sm font-semibold px-4 py-3 rounded-xl hover:bg-white/[0.08] hover:border-chess-blue/30 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-users text-chess-blue"></i>
                    Our Coaches
                  </a>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-chess-700/50 to-transparent mb-6" />

                {/* Next Tournament Highlight */}
                <div className="bg-chess-800/30 rounded-2xl p-5 border border-white/[0.06] relative overflow-hidden">
                  {/* Subtle gradient accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-chess-accent/10 to-transparent rounded-bl-full pointer-events-none" />

                  <div className="flex items-center justify-between mb-3 relative">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-chess-accent/15 flex items-center justify-center overflow-hidden">
                        {featuredTournament?.logo ? (
                          <Image src={featuredTournament.logo} alt="Tournament Logo" width={32} height={32} className="w-full h-full object-contain" />
                        ) : (
                          <i className="fas fa-trophy text-chess-accent text-sm"></i>
                        )}
                      </div>
                      <span className="font-semibold text-chess-100 text-sm">Next Highlight</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-chess-accent/70 glass-card border border-chess-accent/10 px-2.5 py-1 rounded-full">
                      2026
                    </span>
                  </div>

                  <div className="font-heading tracking-wide text-xl font-bold text-chess-accent relative">
                    {featuredTournament?.title || "No upcoming tournament"}
                  </div>
                  <div className="text-xs text-chess-100/50 mt-1.5 relative">
                    <i className="far fa-calendar mr-1"></i>
                    {featuredTournament?.date || "TBA"}
                    {featuredTournament?.registrationOpen ? " • Registration open" : ""}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 mt-4 relative">
                    {featuredTournament?.pdfUrl && (
                      <a href={featuredTournament.pdfUrl} target="_blank" rel="noopener noreferrer"
                        className="bg-chess-accent/90 text-gray-950 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-chess-accentHover transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                        <i className="fas fa-file-pdf"></i>
                        PDF
                      </a>
                    )}
                    <Link
                      href="/tournaments"
                      className="glass-card border border-chess-700/50 text-chess-100 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-white/[0.08] transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <i className="fas fa-arrow-right text-chess-accent"></i>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll mt-8 md:mt-12 flex justify-center">
          <a
            href="#about"
            className="scroll-indicator group inline-flex flex-col items-center gap-2 text-chess-100/30 hover:text-chess-accent transition-colors duration-300"
            aria-label="Scroll to About"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll</span>
            <div className="w-10 h-10 rounded-full glass-card border border-chess-700/30 flex items-center justify-center group-hover:border-chess-accent/40 transition-colors duration-300">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
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
            {(coachesData as unknown as { name: string; photo: string; title: string; rating?: string; email: string; phone: string; external?: boolean }[]).map((coach) => (
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

      {/* Latest From MKCA Section */}
      {latestBlogs.length > 0 && (
        <section className="relative z-10 py-20 px-4" id="latest">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
              <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold text-gradient-gold">
                Latest From MKCA
              </h2>
              <Link
                href="/blog"
                className="glass-card border border-chess-700/50 text-chess-100 font-semibold px-6 py-3 rounded-xl hover:bg-white/[0.08] hover:border-chess-accent/30 transition-all duration-300 inline-flex items-center gap-2"
              >
                View All Posts <i className="fas fa-arrow-right text-sm"></i>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug}`}
                  className="glass-card rounded-3xl overflow-hidden border border-chess-700/50 group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]"
                >
                  {blog.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {blog.category && (
                      <span className="text-xs font-semibold tracking-widest uppercase text-chess-accent">
                        {blog.category}
                      </span>
                    )}
                    <h3 className="font-heading text-xl font-bold text-chess-100 mt-2 mb-2">{blog.title}</h3>
                    {blog.excerpt && <p className="text-chess-100/60 text-sm leading-relaxed">{blog.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
