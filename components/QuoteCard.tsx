export function QuoteCard({ quote, cite }: { quote: string; cite: string }) {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card border-none backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-12 transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
          <blockquote className="text-2xl md:text-3xl font-heading tracking-wide italic text-chess-100/90 mb-6">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <cite className="text-chess-accent font-semibold">— {cite}</cite>
        </div>
      </div>
    </section>
  );
}
