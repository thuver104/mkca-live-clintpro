export function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card border-none backdrop-blur-xl border border-chess-700/50 rounded-[1.5rem] p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
        >
          <div className="text-4xl font-bold text-chess-accent mb-4">{stat.value}</div>
          <p className="text-chess-100/80">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
