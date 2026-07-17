"use client";

import { useEffect, useState } from "react";

export function AcademyStatus() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const id = setTimeout(() => {
      const hours = new Date().getHours();
      setMessage(
        hours >= 8 && hours < 21 ? "Academy doors are open!" : "We're done for the day. Catch you tomorrow!"
      );
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return <>{message}</>;
}
