"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

/** Live clock in Kashish's time zone (rendered after mount to avoid hydration mismatch). */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", minute: "2-digit", hour12: false });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className={className}>{now ?? "--:--"} IST</span>;
}
