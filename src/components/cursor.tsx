"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Follower cursor for mouse users. Grows over links; shows a label over any
 * element with a `data-cursor="Label"` attribute. The native cursor stays visible.
 */
export function Cursor() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea");
      setLabel(el?.dataset.cursor ?? null);
      setHovering(!!el);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  useEffect(() => {
    setLabel(null);
    setHovering(false);
  }, [pathname]);

  if (!enabled) return null;

  const size = label ? 84 : hovering ? 40 : 10;

  return (
    <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[95]">
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={
          "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full " +
          (label ? "bg-accent text-accent-fg" : "bg-white mix-blend-difference")
        }
      >
        {label && (
          <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="text-xs font-semibold">
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
