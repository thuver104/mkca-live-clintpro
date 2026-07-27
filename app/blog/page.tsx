import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: string;
  image?: string;
  author?: string;
  createdAt?: string;
}

async function getBlogs() {
  try {
    const db = await getDb();
    const blogs = await db.collection("blogs").find({ published: true }).sort({ createdAt: -1 }).toArray();
    return blogs as unknown as Blog[];
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
          href="#content"
          className="w-14 h-20 rounded-full border-2 border-slate-700 flex justify-center p-2 hover:border-chess-accent transition-colors duration-300 group animate-fade-in-up"
        >
          <div className="w-1.5 h-4 bg-slate-500 group-hover:bg-chess-accent rounded-full animate-float"></div>
        </a>
      </header>

      {/* Categories / Bento Box Layout */}
      <section id="content" className="max-w-7xl mx-auto px-4 mb-32 z-10 relative scroll-mt-24">
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

      {/* Latest Posts (past tournaments & announcements, fully data-driven) */}
      {blogsData.length > 0 && (
        <section id="blogs" className="max-w-7xl mx-auto px-4 mb-32 z-10 relative scroll-mt-24">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Latest <span className="text-gradient-gold">Posts</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              News, tournament recaps, and stories from the academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogsData.map((blog) => (
              <article key={blog._id} className="glass-card rounded-3xl overflow-hidden border-slate-700/50 flex flex-col">
                {blog.image && (
                  <div className="relative w-full h-56">
                    <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4 text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    {blog.category && <span className="text-chess-accent">{blog.category}</span>}
                    {blog.author && <span>{blog.author}</span>}
                    {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString()}</span>}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4">{blog.title}</h3>
                  {blog.excerpt && <p className="text-slate-400 mb-6 flex-1">{blog.excerpt}</p>}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex w-max items-center gap-2 text-chess-accent font-semibold hover:text-chess-accentHover transition-colors"
                  >
                    Read Full Blog <i className="fas fa-arrow-right text-sm"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

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
