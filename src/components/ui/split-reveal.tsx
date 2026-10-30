"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Part = { text: string; accent?: boolean };

const ease = [0.22, 1, 0.36, 1] as const;

/** Heading whose words slide up from behind a mask, one after another, as it scrolls into view. */
export function SplitReveal({
  parts,
  className,
  as: Tag = "h2",
  delay = 0,
  accentClass = "text-accent",
  immediate = false,
  play = true,
}: {
  parts: Part[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  accentClass?: string;
  /** Animate on mount instead of on scroll */
  immediate?: boolean;
  /** With `immediate`, wait until this is true */
  play?: boolean;
}) {
  const words = parts.flatMap((p) => p.text.split(" ").filter(Boolean).map((w) => ({ w, accent: p.accent })));
  const label = parts.map((p) => p.text).join(" ");

  return (
    <Tag className={className} aria-label={label}>
      {words.map(({ w, accent }, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className={cn("inline-block", accent && cn("serif font-normal", accentClass))}
            initial={{ y: "110%", rotate: 4 }}
            {...(immediate ? { animate: play ? { y: 0, rotate: 0 } : {} } : { whileInView: { y: 0, rotate: 0 }, viewport: { once: true, margin: "-8% 0px" } })}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
