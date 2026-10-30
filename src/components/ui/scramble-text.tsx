"use client";

import { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+<>/";

/** Text that briefly scrambles and resolves when hovered. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    let i = 0;
    const total = text.length * 3;
    const step = () => {
      i++;
      setDisplay(
        text
          .split("")
          .map((ch, idx) => (ch === " " || idx < i / 3 ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      if (i < total) frame.current = requestAnimationFrame(step);
      else setDisplay(text);
    };
    frame.current = requestAnimationFrame(step);
  };

  return (
    <span className={className} onPointerEnter={run} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
