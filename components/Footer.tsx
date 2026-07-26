import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-chess-950 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo-mark.jpg"
                alt="MKCA Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-heading font-bold text-2xl text-white">MKCA</span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Elevating minds through the royal game of chess. Building the next generation of grandmasters in the
              Northern Province.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-400 hover:text-chess-accent transition-colors">Home</Link></li>
              <li><Link href="/tournaments" className="text-slate-400 hover:text-chess-accent transition-colors">Tournaments</Link></li>
              <li><Link href="/rated-players" className="text-slate-400 hover:text-chess-accent transition-colors">Rated Players</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-chess-accent transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="font-heading text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-chess-accent"></i> +94 75 317 5528 (Tharsikan.V)
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-chess-accent"></i> +94 77 527 3514 (Dishanthan.V)
              </li>
              <li className="pt-2">
                <a
                  href="https://web.facebook.com/magicalknightchessacademykilinochchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-[#1877F2] transition-colors"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 MKCA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
