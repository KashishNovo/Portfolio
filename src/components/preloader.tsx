"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const greetings = ["Hello", "नमस्ते", "Hola", "Bonjour", "Ciao", "こんにちは", "Hallo"];
const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Intro: greetings flash by, then the panel lifts away with a curved edge.
 * The first word is in the server HTML, so the screen is never blank.
 * Plays once per visit.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [size, setSize] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("kg-intro") === "1";
      sessionStorage.setItem("kg-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setVisible(false);
      onDone();
      return;
    }
    setSize({ w: window.innerWidth, h: window.innerHeight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!visible) return;
    const last = index === greetings.length; // final step shows the name
    const t = setTimeout(
      () => (last ? setVisible(false) : setIndex((i) => i + 1)),
      index === 0 ? 650 : last ? 750 : 150,
    );
    return () => clearTimeout(t);
  }, [index, visible]);

  const { w, h } = size;
  const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 260} 0 ${h} L0 0`;
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;
  const showName = index >= greetings.length;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="intro"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease, delay: 0.15 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-night text-white"
        >
          {/* Curved bottom edge that flattens as the panel lifts */}
          <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[calc(100%+260px)] w-full" viewBox={`0 0 ${w} ${h + 260}`} preserveAspectRatio="none">
            <motion.path
              fill="#0C0E14"
              initial={{ d: curved }}
              exit={{ d: flat }}
              transition={{ duration: 0.85, ease, delay: 0.15 }}
            />
          </svg>

          <div className="relative flex items-center gap-4">
            <span className="h-2.5 w-2.5 rounded-full bg-periwinkle" />
            {showName ? (
              <motion.span
                key="name"
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45 }}
                className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl"
              >
                Kashish <span className="serif font-normal text-periwinkle">Goel.</span>
              </motion.span>
            ) : (
              <span key={index} className="text-4xl font-medium tracking-tight md:text-6xl">
                {greetings[index]}
              </span>
            )}
          </div>

          <motion.span
            className="absolute bottom-10 left-1/2 h-px -translate-x-1/2 bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 2.1, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
