"use client";

import { useEffect, useState } from "react";

type TimeParts = { days: number; hours: number; minutes: number; seconds: number };

function getTimeParts(targetMs: number): TimeParts | null {
  const distance = targetMs - Date.now();
  if (distance <= 0) return null;
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

const UNITS: { key: keyof TimeParts; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function Countdown({
  target,
  activeMessage,
  startedMessage,
}: {
  target: string;
  activeMessage: string;
  startedMessage: string;
}) {
  const [parts, setParts] = useState<TimeParts | null | undefined>(undefined);

  useEffect(() => {
    const targetMs = new Date(target).getTime();
    const tick = () => setParts(getTimeParts(targetMs));
    const timeoutId = setTimeout(tick, 0);
    const intervalId = setInterval(tick, 1000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [target]);

  const started = parts === null;
  const display = parts ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 max-w-xl mx-auto">
        {UNITS.map((unit) => (
          <div key={unit.key} className="bg-chess-800/60 border border-chess-accent/20 rounded-xl sm:rounded-2xl p-2 sm:p-4 text-center overflow-hidden">
            <span className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-chess-accent block leading-none">
              {String(display[unit.key]).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-normal sm:tracking-widest mt-1.5 sm:mt-2 block">{unit.label}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-slate-400 text-sm mt-3">
        {parts === undefined ? "" : started ? startedMessage : activeMessage}
      </p>
    </div>
  );
}
