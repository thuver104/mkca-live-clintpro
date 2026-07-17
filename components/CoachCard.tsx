import Image from "next/image";
import type { Coach } from "@/lib/data/coaches";

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <div className="glass-card border-none backdrop-blur-2xl border border-chess-700/50 rounded-[2rem] p-8 flex flex-col items-center max-w-xs mx-auto w-full">
      {coach.external ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coach.photo}
          alt={`Coach ${coach.name}`}
          className="rounded-full w-44 h-44 object-cover mb-6 shadow-lg border-4 border-chess-800"
        />
      ) : (
        <Image
          src={coach.photo}
          alt={`Coach ${coach.name}`}
          width={176}
          height={176}
          className="rounded-full w-44 h-44 object-cover mb-6 shadow-lg border-4 border-chess-800"
        />
      )}
      <h3 className="text-2xl font-semibold mb-2 text-chess-100">{coach.name}</h3>
      <p className="text-chess-accent font-medium mb-1 uppercase text-center leading-snug">{coach.title}</p>
      {coach.rating && <p className="text-chess-100 text-lg mb-3">Rating: {coach.rating}</p>}
      <div className={`text-chess-100 text-sm space-y-1 ${coach.rating ? "" : "mt-4"}`}>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${coach.email}`} className="text-chess-accent hover:underline">
            {coach.email}
          </a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href={`tel:${coach.phone}`} className="text-chess-accent hover:underline">
            {coach.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
