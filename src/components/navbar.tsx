"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "@/data/portfolio";
import { ThemeToggle } from "./theme-toggle";
import { ScrambleText } from "./ui/scramble-text";
import { LocalTime } from "./ui/local-time";
import { useLoaded } from "./providers";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;

export function Navbar() {
  const loaded = useLoaded();
  const pathname = usePathname();
  const home = pathname === "/";
  const link = (id: string) => (home ? `#${id}` : `/#${id}`);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Is the bar currently over a dark section (Work / Contact)?
      const dark = [...document.querySelectorAll<HTMLElement>("[data-nav='dark']")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 44 && r.bottom >= 44;
      });
      setOverDark(dark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease }}
        className={cn("fixed inset-x-0 top-0 z-50 px-3 pt-3", overDark && !open && "nav-dark")}
      >
        <nav
          className={cn(
            "mx-auto flex h-14 max-w-[1440px] items-center justify-between rounded-2xl border px-3 transition-all duration-500 md:h-16 md:px-5",
            scrolled && !open ? "border-line/80 bg-bg/70 shadow-[0_10px_40px_-20px_rgba(13,15,21,0.25)] backdrop-blur-xl" : "border-transparent",
          )}
        >
          <a href={home ? "#top" : "/"} className="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight" aria-label="Back to top">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-[11px] font-bold text-bg transition-transform duration-500 group-hover:rotate-[8deg]">KG</span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={link(l.id)} className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink">
                  <ScrambleText text={l.label} />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <LocalTime className="hidden font-mono text-xs tabular-nums text-muted lg:inline" />
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-ink px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-bg sm:inline-block"
            >
              Resume
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[60] grid h-10 w-10 place-items-center rounded-full bg-ink text-bg md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={cn("absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-300", open && "top-1/2 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-300", open && "bottom-auto top-1/2 -rotate-45")} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-night px-5 pb-10 pt-28 text-white md:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={link(l.id)}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease }}
                    className="flex items-baseline gap-4 text-5xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-white/45">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-4">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-white px-6 py-3 font-semibold text-night">
                View resume
              </a>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">
                {profile.location} · <LocalTime />
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
