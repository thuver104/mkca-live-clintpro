"use client";

import Link from "next/link";
import { useState } from "react";

const TABS = [
  { id: "tamil", label: "தமிழ் அறிவிப்பு" },
  { id: "english", label: "English Details" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function FeaturedTournamentTabs() {
  const [active, setActive] = useState<TabId>("tamil");

  return (
    <>
      <div className="glass-card rounded-[2rem] p-2 flex gap-2 mb-8 bg-chess-950/50 w-full sm:w-max">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`tab-btn flex-1 sm:px-8 py-3 rounded-full font-heading transition-all duration-300 ${
              active === tab.id ? "font-bold text-chess-950 bg-chess-accent" : "font-medium text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-chess-800/30 border border-chess-700/50 rounded-[2rem] p-6 sm:p-8 flex-1">
        {active === "tamil" ? (
          <div className="text-slate-300 text-lg leading-relaxed space-y-5">
            <p className="font-medium text-white border-l-4 border-chess-accent pl-4">
              வடமாகாண சதுரங்க வீரர்களுக்கான மாபெரும் சதுரங்க சுற்றுப்போட்டி தொடர்பானது....
            </p>
            <p>
              வருகின்ற <span className="text-chess-accent font-bold">2026.04.08ம் திகதி (புதன்கிழமை)</span> MAGICAL
              KNIGHT CHESS ACADEMY இனால் வடமாகண சதுரங்க வீரர்களை மாத்திரம் உள்ளடக்கிய{" "}
              <strong className="text-white">MAGICAL KNIGHT CLASSIC</strong> சதுரங்க போட்டியானது நடைபெற உள்ளது. இந்த
              போட்டிகள் கிளி/கிளிநொச்சி மகா வித்தியாலயத்தில் காலை 8.30 மணிக்கு ஆரம்பம் ஆகும்.
            </p>
            <p>
              போட்டிகள் ஆனது.... 6 வயது, 8 வயது, 10 வயது, 12 வயது, 14 வயதின் கீழ் ஆண்கள், பெண்கள் மற்றும் 14 வயதின் மேல்
              ஆண்கள், பெண்கள் என 14 வயது பிரிவுகளை உள்ளடக்கியதாக நடைபெற உள்ளது. அது தவிர பெற்றோர்களுக்கான சதுரங்க
              போட்டிகளும் நடைபெற உள்ளது.
            </p>
            <p>
              ஒவ்வொரு வயது பிரிவிலும் 15 வெற்றியாளர்கள் என{" "}
              <span className="text-chess-accent font-bold">195 வெற்றியாளர்கள்</span> தெரிவு செய்யப்பட்டு
              வெற்றிக்கிண்ணம், வெற்றிபதக்கம், வெற்றிசான்றிதழ் வழங்கி வைக்கப்படும். போட்டியில் பங்குபற்றும் அனைவருக்கும்
              பங்குபற்றுதல் சான்றிதழ் வழங்கிவைக்கப்படும்.
            </p>
            <div className="inline-block bg-chess-950 px-6 py-3 rounded-xl border border-chess-700 w-full text-center sm:text-left sm:w-auto mt-2">
              பதிவுகட்டணம்: <span className="text-2xl font-bold text-white ml-2">Rs. 1000/-</span>
            </div>
          </div>
        ) : (
          <div className="text-slate-300 text-lg leading-relaxed space-y-5">
            <p className="font-medium text-white border-l-4 border-chess-blue pl-4">
              A grand provincial-level chess tournament exclusively for Northern Province chess players.
            </p>
            <p>
              The <strong className="text-white">Magical Knight Classic Chess Tournament 2026</strong> will be
              officially organized by the Magical Knight Chess Academy on{" "}
              <span className="text-chess-blue font-bold">08th APR 2026 (Wednesday)</span> at Kilinochchi Maha
              Vidyalayam, starting sharp at 8.30 AM.
            </p>
            <p>
              The tournament features categories for boys and girls: Under 6, 8, 10, 12, 14, and Above 14.
              Additionally, we are hosting a special chess event exclusively for parents to participate!
            </p>
            <p>
              A massive total of <span className="text-chess-blue font-bold">195 winners</span> (15 from each age
              group) will be awarded prestigious trophies, medals, and certificates. Every participant walks away
              with a guaranteed participation certificate.
            </p>
            <div className="inline-block bg-chess-950 px-6 py-3 rounded-xl border border-chess-700 w-full text-center sm:text-left sm:w-auto mt-2">
              Registration Fee: <span className="text-2xl font-bold text-white ml-2">Rs. 1000/-</span>
            </div>
          </div>
        )}

        <hr className="border-chess-700/60 my-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://chat.whatsapp.com/FDmyZ3aIyO6JkM67TVJZ6t?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-white hover:bg-[#25D366] hover:text-chess-950 transition-all duration-300 group"
          >
            <i className="fab fa-whatsapp text-3xl text-[#25D366] group-hover:text-chess-950 mb-2"></i>
            <span className="font-semibold text-sm">Join WhatsApp</span>
          </a>
          <Link
            href="/register/academy"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-chess-blue/10 border border-chess-blue/30 text-white hover:bg-chess-blue hover:text-chess-950 transition-all duration-300 group"
          >
            <i className="fas fa-file-signature text-3xl text-chess-blue group-hover:text-chess-950 mb-2"></i>
            <span className="font-semibold text-sm">Register Now</span>
          </Link>
          <a
            href="https://maps.app.goo.gl/dcpZejA6bcFdtbQq5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-white hover:bg-red-500 hover:text-chess-950 transition-all duration-300 group sm:col-span-2 lg:col-span-1"
          >
            <i className="fas fa-map-marked-alt text-3xl text-red-500 group-hover:text-chess-950 mb-2"></i>
            <span className="font-semibold text-sm">View Location</span>
          </a>
        </div>
      </div>
    </>
  );
}
