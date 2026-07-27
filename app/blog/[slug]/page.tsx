import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

async function getBlog(slug: string) {
  try {
    const db = await getDb();
    const blog = await db.collection("blogs").findOne({ slug, published: true });
    return blog as unknown as Blog | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog | MKCA" };
  return {
    title: `${blog.title} | MKCA Blog`,
    description: blog.excerpt || blog.title,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <article className="relative z-10 pt-40 pb-32 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-chess-accent transition-colors mb-8 text-sm font-semibold"
        >
          <i className="fas fa-arrow-left"></i> Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-6 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          {blog.category && <span className="text-chess-accent">{blog.category}</span>}
          {blog.author && <span>{blog.author}</span>}
          {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString()}</span>}
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-8">
          {blog.title}
        </h1>

        {blog.image && (
          <div className="relative w-full h-64 sm:h-96 rounded-[2rem] overflow-hidden mb-10">
            <Image src={blog.image} alt={blog.title} fill className="object-cover" />
          </div>
        )}

        <div
          className="text-slate-300 text-lg leading-relaxed space-y-5 [&_p]:mb-5 [&_strong]:text-white [&_h3]:text-2xl [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-3 [&_a]:text-chess-accent [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_img]:rounded-2xl [&_img]:my-6 [&_img]:w-full [&_img]:object-cover [&_video]:rounded-2xl [&_video]:my-6 [&_video]:w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
