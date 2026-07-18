"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Field { id: string; label: string; type: string; required: boolean; options?: string[]; placeholder?: string; }
interface FormData { _id: string; title: string; tournamentId: string; tournamentTitle: string; fields: Field[]; active: boolean; }

export default function TournamentRegisterPage() {
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState<FormData | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/forms/tournament?tournamentId=${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((d) => {
        if (d) { setForm(d); setLoading(false); }
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  const set = (fieldId: string, val: string) => setValues((p) => ({ ...p, [fieldId]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSubmitting(true);
    setError("");

    for (const field of form.fields) {
      if (field.required && !values[field.id]) {
        setError(`Please fill in "${field.label}"`);
        setSubmitting(false);
        return;
      }
    }

    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: form._id,
        formTitle: form.title,
        tournamentTitle: form.tournamentTitle,
        data: values,
      }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Submission failed. Please try again.");
    }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center">
      <div className="text-chess-accent animate-pulse font-heading text-xl">Loading registration form...</div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4">
      <div className="text-center">
        <i className="fas fa-chess-knight text-5xl text-chess-accent/30 mb-4"></i>
        <h1 className="font-heading text-3xl font-bold text-chess-100 mb-4">No Registration Form Available</h1>
        <p className="text-chess-100/60 mb-6">There is no active registration form for this tournament yet.</p>
        <Link href="/tournaments" className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2">
          <i className="fas fa-arrow-left"></i>Back to Tournaments
        </Link>
      </div>
    </div>
  );

  if (!form || !form.active) return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4">
      <div className="text-center">
        <i className="fas fa-clock text-5xl text-chess-100/30 mb-4"></i>
        <h1 className="font-heading text-3xl font-bold text-chess-100 mb-4">Registration Closed</h1>
        <p className="text-chess-100/60 mb-6">Registration for this tournament is no longer active.</p>
        <Link href="/tournaments" className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2">
          <i className="fas fa-arrow-left"></i>Back to Tournaments
        </Link>
      </div>
    </div>
  );

  if (submitted) return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4">
      <div className="glass-card border border-chess-700/50 rounded-[2rem] p-8 md:p-12 max-w-md text-center backdrop-blur-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-check text-emerald-400 text-2xl"></i>
        </div>
        <h1 className="font-heading text-2xl font-bold text-chess-100 mb-3">Registration Submitted!</h1>
        <p className="text-chess-100/60 mb-6">
          Thank you for registering for <span className="text-chess-accent">{form.tournamentTitle}</span>.
        </p>
        <p className="text-chess-100/40 text-sm mb-6">We will contact you with further details.</p>
        <Link href="/tournaments" className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2">
          <i className="fas fa-arrow-left"></i>Back to Tournaments
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4 py-12">
      <div className="glass-card border border-chess-700/50 rounded-[2rem] p-8 md:p-10 w-full max-w-lg backdrop-blur-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-chess-accent/15 border border-chess-accent/20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-chess-knight text-chess-accent text-xl"></i>
          </div>
          <h1 className="font-heading text-2xl font-bold text-chess-100">{form.title}</h1>
          <p className="text-chess-100/50 text-sm mt-1">{form.tournamentTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {form.fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea value={values[field.id] || ""} onChange={(e) => set(field.id, e.target.value)}
                  required={field.required} placeholder={field.placeholder} rows={4}
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm resize-y" />
              ) : field.type === "select" ? (
                <select value={values[field.id] || ""} onChange={(e) => set(field.id, e.target.value)}
                  required={field.required}
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm">
                  <option value="">Select...</option>
                  {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input type={field.type} value={values[field.id] || ""} onChange={(e) => set(field.id, e.target.value)}
                  required={field.required} placeholder={field.placeholder}
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
              )}
            </div>
          ))}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full bg-chess-accent text-gray-950 font-bold py-3.5 rounded-xl hover:bg-chess-accentHover transition-colors disabled:opacity-50 text-sm">
            {submitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/tournaments" className="text-chess-100/40 hover:text-chess-accent text-xs transition-colors">
            <i className="fas fa-arrow-left mr-1"></i>Back to Tournaments
          </Link>
        </div>
      </div>
    </div>
  );
}
