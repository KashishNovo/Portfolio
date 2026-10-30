"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { BrowserMock } from "@/components/ui/browser-mock";
import { SplitReveal } from "@/components/ui/split-reveal";
import { Tilt } from "@/components/ui/tilt";
import { scrollToY } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");
const total = projects.length;

function Panel({ p, i, active, compact = false }: { p: Project; i: number; active?: boolean; compact?: boolean }) {
  return (
    <Link
      href={`/work/${p.id}/`}
      data-cursor="View"
      aria-label={`${p.title}: open case study`}
      className={cn(
        "group grid shrink-0 gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4 transition-[opacity,transform,border-color] duration-700 hover:border-white/25 sm:p-5 md:p-7",
        compact ? "w-[86vw] max-w-[520px] snap-center" : "w-full lg:h-[min(66vh,600px)] lg:w-[min(74vw,1060px)] lg:grid-cols-[0.85fr_1.15fr] lg:gap-10",
        active === false && "lg:scale-[0.97] lg:opacity-45",
      )}
    >
      {/* Preview first on phones, second on desktop */}
      <Tilt className={cn("min-w-0 rounded-2xl", !compact && "lg:order-2")}>
        <div className="relative grid h-full min-h-[220px] place-items-center overflow-hidden rounded-2xl p-5 sm:p-8 lg:p-10" style={{ backgroundColor: p.color }}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.28),transparent_55%)]" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-2 select-none text-[8rem] font-semibold leading-none tracking-[-0.06em] text-black/10 md:text-[11rem]">
            {pad(i + 1)}
          </span>
          <div className="preview-light relative w-full max-w-[540px] [transform:translateZ(40px)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5">
            <BrowserMock kind={p.preview} label={`${p.id}.app`} />
          </div>
        </div>
      </Tilt>

      <div className={cn("flex min-w-0 flex-col", !compact && "lg:order-1")}>
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-white/45">
          <span>
            {pad(i + 1)} / {pad(total)} · {p.year}
          </span>
          {p.confidential && (
            <span className="inline-flex items-center gap-1.5">
              <Lock size={12} /> NDA
            </span>
          )}
        </div>

        <h3 className={cn("mt-5 font-semibold leading-[0.95] tracking-[-0.05em] text-white", compact ? "text-4xl" : "text-[clamp(2.3rem,4.2vw,4rem)] lg:mt-auto")}>{p.title}</h3>
        <p className="mt-3 text-lg text-white/90">
          <span className="serif text-[1.25em] text-periwinkle">for</span> {p.client}
        </p>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-white/45">{p.category}</p>

        <p className={cn("mt-5 max-w-md leading-relaxed text-white/65", compact && "line-clamp-3")}>{p.summary}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {p.stack.slice(0, compact ? 3 : 4).map((s) => (
              <li key={s} className="rounded-full border border-white/15 px-3 py-1 text-[13px] text-white/75">
                {s}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <span className="relative">
              Case study
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-night transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function Header({ right }: { right?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">(02) Selected work</p>
        <SplitReveal
          className="mt-4 text-[clamp(2.5rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white"
          parts={[{ text: "Products I've" }, { text: "helped", accent: true }, { text: "build" }]}
          accentClass="text-periwinkle"
        />
      </div>
      {right}
    </div>
  );
}

function Controls({ active, onGo }: { active: number; onGo: (i: number) => void }) {
  return (
    <div className="flex items-center gap-5">
      <ul className="flex items-center gap-1.5">
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onGo(i)}
              aria-label={`Go to ${p.title}`}
              aria-current={i === active}
              className="grid h-6 place-items-center px-0.5"
            >
              <span
                className={cn("block h-1.5 rounded-full transition-all duration-500", i === active ? "w-8" : "w-1.5 bg-white/25 hover:bg-white/60")}
                style={i === active ? { backgroundColor: p.color } : undefined}
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="font-mono text-sm tabular-nums text-white/55">
        <span className="text-2xl text-white">{pad(active + 1)}</span> / {pad(total)}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onGo(Math.max(0, active - 1))}
          disabled={active === 0}
          aria-label="Previous project"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-night disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => onGo(Math.min(total - 1, active + 1))}
          disabled={active === total - 1}
          aria-label="Next project"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-night disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/** Desktop: pinned section where vertical scroll moves the projects sideways. */
function DesktopWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Rest on the first project for the first 10% of the scroll and on the last for the final 10%
  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, -distance]);
  const progress = useSpring(useTransform(scrollYProgress, [0.1, 0.9], [0, 1]), { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const p = Math.min(1, Math.max(0, (v - 0.1) / 0.8));
    setActive(Math.round(p * (total - 1)));
  });

  /** Scroll the page to the exact spot where project i is centred in the gallery. */
  const go = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    scrollToY(top + (0.1 + (0.8 * i) / (total - 1)) * travel);
  }, []);

  // ← → keys while the gallery is pinned
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
      const r = el.getBoundingClientRect();
      if (r.top > 1 || r.bottom < window.innerHeight - 1) return;
      e.preventDefault();
      go(e.key === "ArrowRight" ? Math.min(total - 1, active + 1) : Math.max(0, active - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  return (
    <section
      id="work"
      data-nav="dark"
      ref={sectionRef}
      className="relative rounded-t-[2.5rem] bg-night text-white"
      // ~900px of scrolling per project keeps the pace calm and readable
      style={{ height: `calc(100vh + ${Math.max(distance * 1.7, 2400)}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pt-16">
        <div className="container">
          <Header right={<Controls active={active} onGo={go} />} />
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          {projects.map((p, i) => (
            <Panel key={p.id} p={p} i={i} active={i === active} />
          ))}
        </motion.div>

        <div className="container">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">Scroll or use ← →</span>
            <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-[#4865D9] to-periwinkle" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">{projects[active].title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Phones and tablets: a swipeable, snapping carousel with dots and arrows. */
function MobileWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = [...rail.children] as HTMLElement[];
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)) best = i;
    });
    setActive(best);
  };

  const go = (i: number) => {
    const rail = railRef.current;
    const card = rail?.children[i] as HTMLElement | undefined;
    if (!rail || !card) return;
    rail.scrollTo({ left: card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section id="work" data-nav="dark" className="rounded-t-[2rem] bg-night py-20 text-white">
      <div className="container">
        <Header />
        <p className="mt-4 max-w-sm text-white/55">Swipe through real client products. Tap any card for the full case study.</p>
      </div>
      <div
        ref={railRef}
        onScroll={onScroll}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-520px)/2))] pb-2"
      >
        {projects.map((p, i) => (
          <Panel key={p.id} p={p} i={i} compact />
        ))}
      </div>
      <div className="container mt-6 flex justify-center sm:justify-end">
        <Controls active={active} onGo={go} />
      </div>
    </section>
  );
}

export function Work() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return desktop ? <DesktopWork /> : <MobileWork />;
}
