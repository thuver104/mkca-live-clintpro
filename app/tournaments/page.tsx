import type { Metadata } from "next";
import { Countdown } from "@/components/Countdown";
import { GalleryCard } from "@/components/GalleryCard";
import { QuoteCard } from "@/components/QuoteCard";
import { StatGrid } from "@/components/StatGrid";
import { scheduleCards, tournamentStats } from "@/lib/data/tournaments";
import { achievementGallery } from "@/lib/data/achievements";

export const metadata: Metadata = {
  title: "Tournaments & Championships | MKCA",
  description: "MKCA tournaments and championships — upcoming events, past results, and the 2025 schedule.",
};

export default function TournamentsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 text-center flex flex-col items-center">
        <h1 className="font-heading tracking-wide font-bold text-5xl sm:text-7xl lg:text-8xl mb-6 drop-shadow-2xl">
          <span className="text-gradient-gold">Tournaments</span>
          <br />
          <span className="text-chess-100">& Championships</span>
        </h1>
        <p className="font-sans text-xl md:text-3xl lg:text-4xl tracking-wide mb-4 max-w-4xl text-chess-100/90 font-light">
          Compete at the Highest Level
        </p>
        <p className="font-sans text-lg md:text-xl mb-12 max-w-3xl text-slate-400 font-light leading-relaxed">
          Join our prestigious tournaments and showcase your chess mastery on the competitive stage.
        </p>

        <div className="w-full max-w-5xl mb-4">
          <h2 className="font-heading tracking-wide text-2xl md:text-3xl mb-4 text-chess-accent text-center">
            Tournament Hub
          </h2>
          <p className="mb-8 text-lg text-chess-accent/90 flex flex-col items-center gap-2">
            <span className="text-center text-base md:text-lg font-semibold">
              Professional Chess Tournaments across Northern Province
            </span>
          </p>
        </div>
      </section>

      {/* Current Tournament Section */}
      <section id="current-tournament" className="relative z-10 py-20 px-4 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-gold">
            Featured Tournament
          </h2>

          <div className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 md:p-12 mb-8 transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="font-heading tracking-wide text-3xl md:text-4xl font-bold text-chess-accent mb-2">
                Magical Knight Classic Chess Tournament 2026
              </h3>
              <p className="text-chess-100/80 text-lg">Northern Province Players Only • Organized by MKCA</p>
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full mt-4 font-semibold">
                REGISTRATION OPEN
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-calendar-alt text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Date</h4>
                <p className="text-chess-100/80">Wednesday, 08 APR 2026</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-clock text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Time</h4>
                <p className="text-chess-100/80">From 8:30 AM onwards</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-map-marker-alt text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Venue</h4>
                <p className="text-chess-100/80">Kilinochchi Maha Vidyalayam</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-money-bill-wave text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Entry Fee</h4>
                <p className="text-chess-100/80">Rs. 1000/- per participant</p>
              </div>
            </div>

            {/* Match Countdown */}
            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-4 text-center flex items-center justify-center gap-2">
                <i className="fas fa-hourglass-half animate-pulse"></i> Match Starts In
              </h4>
              <Countdown
                target="April 8, 2026 08:30:00"
                activeMessage="Wednesday, 08 APR 2026 · 8:30 AM · Kilinochchi Maha Vidyalayam"
                startedMessage="🎉 The tournament has started! Good luck to all players!"
              />
            </div>

            {/* Age Categories */}
            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-6 text-center">
                Age Categories
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {["Under 6", "Under 8", "Under 10", "Under 12", "Under 14", "Above 14"].map((label) => (
                  <div key={label} className="bg-chess-800/40 rounded-xl p-4 text-center">
                    <p className="text-chess-100 font-semibold">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-chess-100/80 text-center mt-4">
                Separate categories for boys and girls in all age groups + Special event for parents.
              </p>
            </div>

            {/* Prizes Summary */}
            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-6 text-center">
                Awards & Prizes
              </h4>
              <p className="text-chess-100/80 text-center max-w-3xl mx-auto mb-4">
                A total of <span className="text-chess-accent font-semibold">195 winners</span> (15 winners from each
                category) will receive trophies, medals and certificates. All participants will be awarded a
                participation certificate.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <a
                href="https://chat.whatsapp.com/FDmyZ3aIyO6JkM67TVJZ6t?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center hover:bg-white/5 transition-colors duration-300 flex flex-col items-center justify-center"
              >
                <div className="text-2xl mb-2 text-chess-accent"><i className="fab fa-whatsapp"></i></div>
                <h5 className="font-semibold text-chess-100 mb-1">Join WhatsApp Group</h5>
                <p className="text-chess-100/70 text-sm">Get updates & clarifications</p>
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfVslF3X-SlvlaXh2MDXf9yGmlXu-yPIR23mtNhusEAguwq5Q/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center hover:bg-white/5 transition-colors duration-300 flex flex-col items-center justify-center"
              >
                <div className="text-2xl mb-2 text-chess-accent"><i className="fas fa-file-signature"></i></div>
                <h5 className="font-semibold text-chess-100 mb-1">Online Registration</h5>
                <p className="text-chess-100/70 text-sm">Submit your entry via Google Form</p>
              </a>
              <a
                href="https://maps.app.goo.gl/dcpZejA6bcFdtbQq5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center hover:bg-white/5 transition-colors duration-300 flex flex-col items-center justify-center"
              >
                <div className="text-2xl mb-2 text-chess-accent"><i className="fas fa-map-marked-alt"></i></div>
                <h5 className="font-semibold text-chess-100 mb-1">View Venue</h5>
                <p className="text-chess-100/70 text-sm">Kilinochchi Maha Vidyalayam – Google Maps</p>
              </a>
            </div>

            <div className="text-center mt-4">
              <a
                href="/pdf/magical-knight-classic-chess-tournament-2026.pdf"
                target="_blank"
                className="bg-chess-accent text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-chess-accentHover transition-colors duration-300 inline-flex items-center gap-2"
              >
                <i className="fas fa-file-pdf"></i>
                Download Tournament PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Past Tournaments Section */}
      <section id="past-tournaments" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading tracking-wide text-3xl md:text-4xl font-bold mb-12 text-center text-gradient-gold">
            Past Tournaments
          </h2>

          {/* Mullai Chess Championship 2025 */}
          <div className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 md:p-12 mb-8 transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="font-heading tracking-wide text-3xl md:text-4xl font-bold text-chess-accent mb-2">
                Mullai Chess Championship 2025
              </h3>
              <p className="text-chess-100/80 text-lg">Organized by Magical Knight Chess Academy</p>
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full mt-4 font-semibold">
                EVENT COMPLETED
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-calendar-alt text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Date</h4>
                <p className="text-chess-100/80">Friday, September 27, 2025</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-clock text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Time</h4>
                <p className="text-chess-100/80">8:00 AM onwards</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-map-marker-alt text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Venue</h4>
                <p className="text-chess-100/80">Puthukkudiyiruppu Central College Auditorium</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-user-plus text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Registration Deadline</h4>
                <p className="text-chess-100/80">September 26, 2025 at 11:59 PM</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-6 text-center">
                Entry Fees
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                  <h5 className="font-semibold text-chess-100 mb-2">Ages 6 & 8 (M/F)</h5>
                  <p className="text-chess-accent text-2xl font-bold">400 LKR</p>
                </div>
                <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                  <h5 className="font-semibold text-chess-100 mb-2">Ages 10, 12 & 14 (M/F)</h5>
                  <p className="text-chess-accent text-2xl font-bold">500 LKR</p>
                </div>
                <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                  <h5 className="font-semibold text-chess-100 mb-2">Ages 14+ (M/F)</h5>
                  <p className="text-chess-accent text-2xl font-bold">600 LKR</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-6 text-center">
                Age Categories
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {["Under 6", "Under 8", "Under 10", "Under 12", "Under 14", "Over 14"].map((label) => (
                  <div key={label} className="bg-chess-800/40 rounded-xl p-4 text-center">
                    <p className="text-chess-100 font-semibold">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-chess-100/80 text-center mt-4">
                Separate categories for males and females + Special RAPID tournament for parents
              </p>
            </div>

            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-6 text-center">
                Tournament Rules
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-chess-800/40 rounded-xl p-4">
                  <p className="text-chess-100">• Matches start on time - no delays</p>
                  <p className="text-chess-100">• 30+ minutes late = forfeit</p>
                  <p className="text-chess-100">• Maximum 5 rounds</p>
                </div>
                <div className="bg-chess-800/40 rounded-xl p-4">
                  <p className="text-chess-100">• 90 min per game (50 min + 20 min with clock)</p>
                  <p className="text-chess-100">• FIDE rules apply</p>
                  <p className="text-chess-100">• 180 total prizes!</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-6 text-center">
                Prizes (180 Total!)
              </h4>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl p-6 text-center text-gray-900">
                  <div className="text-3xl mb-2">🥇</div>
                  <h5 className="font-bold mb-2">Champion</h5>
                  <p className="text-sm">Trophy + Gold Medal + Certificate</p>
                </div>
                <div className="bg-gradient-to-r from-gray-400 to-gray-300 rounded-xl p-6 text-center text-gray-900">
                  <div className="text-3xl mb-2">🥈</div>
                  <h5 className="font-bold mb-2">1st Runner-up</h5>
                  <p className="text-sm">Trophy + Medal + Certificate</p>
                </div>
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-xl p-6 text-center text-gray-900">
                  <div className="text-3xl mb-2">🥉</div>
                  <h5 className="font-bold mb-2">2nd Runner-up</h5>
                  <p className="text-sm">Trophy + Medal + Certificate</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-chess-100/80">4th-5th: Trophy + Merit Certificate | 6th-15th: Medal + Merit Certificate</p>
                <p className="text-chess-accent font-semibold mt-2">All participants receive participation certificates!</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-heading tracking-wide text-2xl font-bold text-chess-accent mb-6 text-center">
                Event Schedule
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-chess-800/40 rounded-xl p-4 text-center">
                  <h5 className="font-semibold text-chess-100 mb-2">Registration & Opening</h5>
                  <p className="text-chess-accent">8:00-8:20 AM</p>
                </div>
                <div className="bg-chess-800/40 rounded-xl p-4 text-center">
                  <h5 className="font-semibold text-chess-100 mb-2">Round 1-3</h5>
                  <p className="text-chess-accent">8:30 AM-1:10 PM</p>
                </div>
                <div className="bg-chess-800/40 rounded-xl p-4 text-center">
                  <h5 className="font-semibold text-chess-100 mb-2">Round 4-5</h5>
                  <p className="text-chess-accent">1:30-4:35 PM</p>
                </div>
                <div className="bg-chess-800/40 rounded-xl p-4 text-center">
                  <h5 className="font-semibold text-chess-100 mb-2">Prize Ceremony</h5>
                  <p className="text-chess-accent">5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-chess-800/40 rounded-[1.5rem] p-6">
              <h4 className="font-heading tracking-wide text-xl font-bold text-chess-accent mb-4 text-center">
                Registration Process
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🏦</div>
                  <h5 className="font-semibold text-chess-100 mb-2">Step 1: Deposit Fee</h5>
                  <p className="text-chess-100/80 text-sm">Deposit entry fee to BOC Bank Account: 73869077 (Visvanathan Tharsikan)</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📱</div>
                  <h5 className="font-semibold text-chess-100 mb-2">Step 2: Send Receipt</h5>
                  <p className="text-chess-100/80 text-sm">WhatsApp deposit slip photo to +94 75 317 5528</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📝</div>
                  <h5 className="font-semibold text-chess-100 mb-2">Step 3: Include Details</h5>
                  <p className="text-chess-100/80 text-sm">Include player name, date of birth, and school in message</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <a
                href="/pdf/Mullai_Chess_Championship_2025_Updated.pdf"
                target="_blank"
                className="bg-chess-accent text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-chess-accentHover transition-colors duration-300 inline-flex items-center gap-2"
              >
                <i className="fas fa-download"></i>
                Download Tournament PDF
              </a>
            </div>
          </div>

          {/* 2nd Rapid Championship */}
          <div className="glass-card backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 md:p-12 mb-8 transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full mb-4 font-semibold">
                EVENT COMPLETED
              </div>
              <h3 className="font-heading tracking-wide text-3xl md:text-4xl font-bold text-chess-accent mb-2">
                2nd Rapid Championship
              </h3>
              <p className="text-chess-100/80 text-lg">Category: Open Tournament</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-calendar-alt text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Date</h4>
                <p className="text-chess-100/80">July 10, 2025</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-clock text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Time</h4>
                <p className="text-chess-100/80">9:00 AM</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-map-marker-alt text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Venue</h4>
                <p className="text-chess-100/80">MKCA, Kilinochchi</p>
              </div>
              <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
                <i className="fas fa-money-bill-wave text-2xl text-chess-accent mb-3"></i>
                <h4 className="font-semibold text-chess-100 mb-2">Entry Fee</h4>
                <p className="text-chess-100/80">LKR 300.00</p>
              </div>
            </div>

            <div className="bg-chess-800/40 rounded-[1.5rem] p-6 text-center">
              <h4 className="font-heading tracking-wide text-xl font-bold text-chess-accent mb-4">Tournament Status</h4>
              <p className="text-chess-100/80 mb-4">This tournament has concluded successfully</p>
              <div className="text-chess-100/80 space-y-2">
                <p><strong>Contact:</strong> +94 77 527 3514 – Dishanthan.V</p>
                <p><strong>Contact:</strong> +94 75 317 5528 – Tharsikan.V</p>
              </div>
              <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full mt-4 font-semibold">
                Registration Closed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Schedule Section */}
      <section id="schedule" className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold">
            2025 Tournament Schedule
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scheduleCards.map((card) => (
              <div
                key={card.title}
                className="glass-card backdrop-blur-xl border border-chess-700/50 rounded-[1.5rem] p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
              >
                <div className="text-5xl mb-4 text-chess-accent"><i className={`fas ${card.icon}`}></i></div>
                <h3 className="font-heading tracking-wide text-2xl font-bold mb-4 text-chess-100">{card.title}</h3>
                <p className="text-chess-100/80 leading-relaxed">{card.description}</p>
                <div className="mt-4 text-chess-accent font-semibold">{card.month}</div>
              </div>
            ))}
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

      {/* Tournament Statistics Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading tracking-wide text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold">
            Tournament Statistics
          </h2>
          <StatGrid stats={tournamentStats} />
        </div>
      </section>

      <QuoteCard quote="In chess, as in life, opportunity strikes but once." cite="Irving Chernev" />
    </>
  );
}
