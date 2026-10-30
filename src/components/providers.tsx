"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { Preloader } from "./preloader";
import { Cursor } from "./cursor";
import { scrollToEl, scrollToY, setLenis } from "@/lib/scroll";

/** True once the intro has finished, so hero animations start after it. */
const LoadedContext = createContext(false);
export const useLoaded = () => useContext(LoadedContext);

function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(lenis);
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Smooth-scroll in-page anchors ("#work", or "/#work" while already on the home page)
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      let hash: string | null = null;
      if (href.startsWith("#")) hash = href;
      else if (href.startsWith("/#") && window.location.pathname === "/") hash = href.slice(1);
      if (!hash) return;
      e.preventDefault();
      if (hash === "#" || hash === "#top") lenis.scrollTo(0);
      else {
        const target = document.querySelector<HTMLElement>(hash);
        if (target) lenis.scrollTo(target);
      }
    };
    document.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
      setLenis(undefined);
    };
  }, []);

  // On page change: jump to the hash target if there is one, otherwise to the top
  useEffect(() => {
    const t = setTimeout(() => {
      const hash = window.location.hash;
      const el = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (el) scrollToEl(el, true);
      else scrollToY(0, true);
    }, 30);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <LoadedContext.Provider value={loaded}>
          <Preloader onDone={() => setLoaded(true)} />
          <Cursor />
          <SmoothScroll />
          {children}
        </LoadedContext.Provider>
      </MotionConfig>
    </ThemeProvider>
  );
}
