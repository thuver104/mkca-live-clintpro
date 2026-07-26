"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const AGE_CATEGORIES = [
  "Under 6 Boys", "Under 6 Girls",
  "Under 8 Boys", "Under 8 Girls",
  "Under 10 Boys", "Under 10 Girls",
  "Under 12 Boys", "Under 12 Girls",
  "Under 14 Boys", "Under 14 Girls",
  "Over 14 Boys", "Over 14 Girls",
  "Parents Event",
];

const CONTACT_NUMBERS = ["075 317 5528", "077 527 3514", "077 946 5344", "077 142 4880", "077 421 8063"];

export default function MullaiChessChampionship2026RegisterPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    first_name: "", last_name: "", dob: "", gender: "", phone: "", email: "",
    school: "", age_category: "", fide_id: "", jersey_interest: "",
  });
  const [paymentSlipUrl, setPaymentSlipUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/tournaments/mullai-2026/register")
      .then((r) => r.json())
      .then((d) => setActive(d.active !== false))
      .catch(() => setActive(true));
  }, []);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setPaymentSlipUrl(data.url);
    else setError("Payment slip upload failed. Please try again.");
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!paymentSlipUrl) {
      setError("Please upload your payment slip.");
      return;
    }
    if (!consent1 || !consent2) {
      setError("Please agree to both declarations before submitting.");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/tournaments/mullai-2026/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, payment_slip_url: paymentSlipUrl }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Submission failed. Please try again.");
    }
    setSubmitting(false);
  };

  if (active === null) {
    return (
      <div className="min-h-screen bg-chess-950 flex items-center justify-center">
        <div className="text-chess-accent animate-pulse font-heading text-xl">Loading...</div>
      </div>
    );
  }

  if (!active) {
    return (
      <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4">
        <div className="text-center">
          <i className="fas fa-clock text-5xl text-chess-100/30 mb-4"></i>
          <h1 className="font-heading text-3xl font-bold text-chess-100 mb-4">Registration Closed</h1>
          <p className="text-chess-100/60 mb-6">Registration for Mullai Chess Championship 2026 is currently closed.</p>
          <Link href="/tournaments" className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>Back to Tournaments
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-chess-950 flex items-center justify-center px-4 py-24">
        <div className="glass-card border border-chess-700/50 rounded-[2rem] p-8 md:p-12 max-w-md text-center backdrop-blur-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-emerald-400 text-2xl"></i>
          </div>
          <h1 className="font-heading text-2xl font-bold text-chess-100 mb-3">Registration Submitted!</h1>
          <p className="text-chess-100/60 mb-6">
            Thank you for registering for <span className="text-chess-accent">Mullai Chess Championship 2026</span>.
          </p>
          <p className="text-chess-100/40 text-sm mb-6">We will verify your payment and contact you with further details.</p>
          <Link href="/tournaments" className="bg-chess-accent text-gray-950 font-bold px-6 py-3 rounded-xl hover:bg-chess-accentHover transition-colors text-sm inline-flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>Back to Tournaments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chess-950 px-4 py-24 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="glass-card border border-chess-700/50 rounded-[2rem] p-8 md:p-10 backdrop-blur-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-chess-accent/15 border border-chess-accent/20 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-chess-knight text-chess-accent text-xl"></i>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-chess-100">Mullai Chess Championship 2026</h1>
            <p className="text-chess-100/50 text-sm mt-1">Registration &mdash; Magical Knight Chess Academy</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-chess-800/40 rounded-xl p-4">
              <p className="text-chess-100/40 uppercase text-xs tracking-widest mb-1"><i className="fas fa-calendar-alt mr-1"></i>Date</p>
              <p className="text-chess-100 font-semibold">16 August 2026</p>
            </div>
            <div className="bg-chess-800/40 rounded-xl p-4">
              <p className="text-chess-100/40 uppercase text-xs tracking-widest mb-1"><i className="fas fa-map-marker-alt mr-1"></i>Venue</p>
              <p className="text-chess-100 font-semibold">Mu/Venavil Sri Muruganantha Viddiyalayam</p>
            </div>
          </div>

          <div className="bg-chess-800/30 border border-chess-700/30 rounded-xl p-5 mb-8 text-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-chess-100/60">Entry Fee</span>
              <span className="text-chess-accent font-bold">Rs. 500/-</span>
            </div>
            <p className="text-chess-100/40 text-xs">
              Registration deadline: 12 August 2026. An additional Rs. 300/- applies for late registration after this date.
            </p>
            <div className="border-t border-chess-700/30 pt-3">
              <p className="text-chess-100/60 mb-1">Bank Details</p>
              <p className="text-chess-100">Bank of Ceylon (Kilinochchi Branch)</p>
              <p className="text-chess-100">Account Name: V. Tharsikan</p>
              <p className="text-chess-100">Account Number: 73869077</p>
            </div>
            <div className="border-t border-chess-700/30 pt-3 text-chess-100/60 text-xs space-y-1">
              <p><i className="fas fa-check text-emerald-400 mr-1.5"></i>Pay the entry fee before registering.</p>
              <p><i className="fas fa-check text-emerald-400 mr-1.5"></i>Upload your payment receipt / slip below.</p>
              <p><i className="fas fa-check text-emerald-400 mr-1.5"></i>Include the player&apos;s full name in the bank transfer reference.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input type="text" value={form.first_name} onChange={(e) => set("first_name", e.target.value)} required
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input type="text" value={form.last_name} onChange={(e) => set("last_name", e.target.value)} required
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                  Date of Birth <span className="text-red-400">*</span>
                </label>
                <input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} required
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select value={form.gender} onChange={(e) => set("gender", e.target.value)} required
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm">
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                  Phone (+94) <span className="text-red-400">*</span>
                </label>
                <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required placeholder="7X XXX XXXX"
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-chess-100/70 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="example@email.com"
                  className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 placeholder-chess-100/30 focus:outline-none focus:border-chess-accent/50 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                School Name <span className="text-red-400">*</span>
              </label>
              <input type="text" value={form.school} onChange={(e) => set("school", e.target.value)} required
                className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm" />
              <p className="text-chess-100/30 text-xs mt-1.5">A trophy will be awarded to the school with the most participants.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                Age Category <span className="text-red-400">*</span>
              </label>
              <select value={form.age_category} onChange={(e) => set("age_category", e.target.value)} required
                className="w-full bg-chess-800/60 border border-chess-700/50 rounded-xl px-4 py-3 text-chess-100 focus:outline-none focus:border-chess-accent/50 text-sm">
                <option value="">Select...</option>
                {AGE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <span className="block text-sm font-medium text-chess-100/70 mb-1.5">
                Do you have a FIDE ID? <span className="text-red-400">*</span>
              </span>
              <div className="flex gap-6">
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-chess-100/80">
                    <input type="radio" name="fide_id" value={opt} checked={form.fide_id === opt} onChange={(e) => set("fide_id", e.target.value)} required
                      className="w-4 h-4 accent-chess-accent" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-chess-100/70 mb-1.5">
                Upload Payment Slip <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input type="file" ref={fileRef} onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="glass-card border border-chess-700/50 text-chess-100 text-sm px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors disabled:opacity-50">
                  <i className="fas fa-upload mr-2"></i>{uploading ? "Uploading..." : "Choose File"}
                </button>
                {paymentSlipUrl && <span className="text-emerald-400 text-xs"><i className="fas fa-check-circle mr-1"></i>Uploaded</span>}
              </div>
              <p className="text-chess-100/30 text-xs mt-1.5">Bank of Ceylon, Kilinochchi &mdash; V. Tharsikan &mdash; Account 73869077. Include the player&apos;s full name as the transfer reference.</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-chess-100/70 mb-1.5">
                Interested in buying an academy/event jersey? <span className="text-red-400">*</span>
              </span>
              <div className="flex gap-6">
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-chess-100/80">
                    <input type="radio" name="jersey_interest" value={opt} checked={form.jersey_interest === opt} onChange={(e) => set("jersey_interest", e.target.value)} required
                      className="w-4 h-4 accent-chess-accent" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer bg-chess-800/30 border border-chess-700/30 rounded-xl p-4">
              <input type="checkbox" checked={consent1} onChange={(e) => setConsent1(e.target.checked)}
                className="w-5 h-5 rounded accent-chess-accent mt-0.5 shrink-0" />
              <span className="text-xs text-chess-100/60 leading-relaxed">
                I confirm that all personal information provided in this registration form is my own, true, and correct.
                I consent to this information being collected, processed, and used for the registration, administration,
                and related requirements of this event.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer bg-chess-800/30 border border-chess-700/30 rounded-xl p-4">
              <input type="checkbox" checked={consent2} onChange={(e) => setConsent2(e.target.checked)}
                className="w-5 h-5 rounded accent-chess-accent mt-0.5 shrink-0" />
              <span className="text-xs text-chess-100/60 leading-relaxed">
                I acknowledge that if requested, I must submit a birth certificate, valid passport, or National Identity
                Card (NIC) to confirm the player&apos;s age, and that failure to do so may result in denial of
                participation in the tournament.
              </span>
            </label>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
            )}

            <button type="submit" disabled={submitting || uploading}
              className="w-full bg-chess-accent text-gray-950 font-bold py-3.5 rounded-xl hover:bg-chess-accentHover transition-colors disabled:opacity-50 text-sm">
              {submitting ? "Submitting..." : "Register"}
            </button>
          </form>

          <div className="border-t border-chess-700/30 mt-8 pt-6 text-center">
            <p className="text-chess-100/40 text-xs mb-2">Contact for inquiries</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-chess-100/60">
              {CONTACT_NUMBERS.map((n) => (
                <a key={n} href={`tel:${n.replace(/\s/g, "")}`} className="hover:text-chess-accent transition-colors">{n}</a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-chess-100/30 text-xs mt-4">
          <Link href="/tournaments" className="hover:text-chess-accent transition-colors">
            <i className="fas fa-arrow-left mr-1"></i>Back to Tournaments
          </Link>
        </p>
      </div>
    </div>
  );
}
