"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog { _id: string; title: string; category: string; published: boolean; createdAt: string; }

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = () => {
    fetch("/api/blogs").then((r) => r.json()).then((d) => { setBlogs(Array.isArray(d) ? d : []); setLoading(false); });
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl font-bold text-chess-100">Blogs</h1>
        <Link href="/admin/blogs/new" className="bg-chess-accent text-gray-950 font-bold px-5 py-2.5 rounded-xl hover:bg-chess-accentHover transition-colors text-sm">
          <i className="fas fa-plus mr-2"></i>New Blog
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 mb-6 text-sm"
      />

      {loading ? (
        <div className="text-chess-100/50 text-center py-12">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-chess-100/50 text-center py-12">No blogs found</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((blog) => (
            <div key={blog._id} className="glass-card border border-chess-700/50 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-chess-100 truncate">{blog.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-chess-100/50">
                  <span className="bg-chess-800/60 px-2 py-0.5 rounded">{blog.category}</span>
                  <span className={blog.published ? "text-emerald-400" : "text-yellow-400"}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/blogs/${blog._id}/edit`} className="text-sm text-chess-blue hover:text-chess-blue/80 px-3 py-1.5 rounded-lg hover:bg-chess-blue/10 transition-colors">
                  <i className="fas fa-pen mr-1"></i>Edit
                </Link>
                <button onClick={() => handleDelete(blog._id)} className="text-sm text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                  <i className="fas fa-trash mr-1"></i>Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
