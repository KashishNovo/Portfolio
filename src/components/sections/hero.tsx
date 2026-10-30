"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useLoaded } from "@/components/providers";
import { LocalTime } from "@/components/ui/local-time";
import { RotatingBadge } from "@/components/ui/rotating-badge";
import { HeroScene } from "@/components/hero-scene";

const ease = [0.76, 0, 0.24, 1] as const;

function SplitWord({ word, delay, show }: { word: string; delay: number; show: boolean }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.06em]" aria-hidden="true">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={show ? { y: 0 } : {}}
          transition={{ duration: 1, delay: delay + i * 0.045, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const show = useLoaded();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const info = [
    { k: "Role", v: profile.role },
    { k: "Currently", v: `${profile.now.company}, since ${profile.now.since}` },
    { k: "Based in", v: profile.location, time: true },
    { k: "Focus", v: profile.focus },
  ];

  const up = (d: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: show ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden pb-8 pt-28 md:flex md:min-h-[100svh] md:flex-col md:pt-32">
      {/* Background: soft drifting color fields */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -right-[15%] -top-[20%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] animate-drift rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.16),transparent_62%)]" />
        <div className="absolute -bottom-[30%] -left-[20%] h-[60vw] max-h-[760px] w-[60vw] max-w-[760px] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgb(var(--accent-2)/0.14),transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--line)/0.55)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.55)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_60%_55%_at_70%_40%,#000,transparent_75%)]" />
      </div>

      {/* 3D particle sphere */}
      <motion.div
        style={{ scale: sceneScale, y: sceneY, opacity: fade }}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="pointer-events-none absolute -right-[40%] top-56 -z-10 h-[105vw] w-[105vw] md:-right-[4%] md:top-[4%] md:h-[92%] md:w-[62%]"
      >
        <motion.div
          initial={{ scale: 0.6, rotate: -20 }}
          animate={show ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full opacity-50 md:opacity-100"
        >
          <HeroScene className="h-full w-full" />
        </motion.div>
      </motion.div>

      <div className="container relative flex flex-1 flex-col">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <motion.div {...up(0.5)} className="md:col-span-6 lg:col-span-5">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[13px] font-medium backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-emerald-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability}
            </span>
            <p className="mt-6 max-w-md text-lg leading-snug md:text-xl">
              Frontend developer crafting <span className="serif text-[1.2em] text-accent">fast,</span> responsive interfaces for real products, from first design file to production.
            </p>
          </motion.div>
          <motion.div {...up(0.7)} className="hidden justify-end md:col-span-6 md:flex lg:col-span-7">
            <RotatingBadge text="Open to work • Frontend roles • " href="#contact" />
          </motion.div>
        </div>

        <motion.h1
          style={{ y: nameY, opacity: fade }}
          className="mt-20 text-[24vw] font-semibold leading-[0.82] tracking-[-0.065em] md:mt-auto md:pt-10 md:text-[15.5vw] 2xl:text-[14rem]"
          aria-label={profile.name}
        >
          <span className="block">
            <SplitWord word="Kashish" delay={0.05} show={show} />
          </span>
          <span className="flex flex-wrap items-end gap-x-[0.12em]">
            <SplitWord word="Goel" delay={0.25} show={show} />
            <motion.span {...up(0.9)} className="serif mb-[0.18em] block text-[clamp(1.4rem,3.4vw,3.2rem)] font-normal leading-none tracking-[-0.02em] text-muted">
              frontend developer<span className="text-accent">.</span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.dl {...up(1)} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink pt-5 md:grid-cols-4">
          {info.map((i) => (
            <div key={i.k} className="min-w-0">
              <dt className="label">{i.k}</dt>
              <dd className="mt-1.5 text-[15px] font-medium">
                {i.v}
                {i.time && <LocalTime className="mt-0.5 block font-mono text-xs tabular-nums text-muted" />}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.a
          href="#about"
          {...up(1.2)}
          className="mt-8 hidden items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink md:inline-flex"
        >
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={13} />
          </motion.span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
