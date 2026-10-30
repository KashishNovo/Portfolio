"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

/** Half-filled circle that rotates between light and dark. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 backdrop-blur transition-colors hover:border-ink"
    >
      <motion.svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" animate={{ rotate: isDark ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </motion.svg>
    </button>
  );
}
