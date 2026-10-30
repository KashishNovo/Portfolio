"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { profile, projects, type Project } from "@/data/portfolio";
import { BrowserMock } from "@/components/ui/browser-mock";
import { SplitReveal } from "@/components/ui/split-reveal";
import { Reveal } from "@/components/ui/reveal";
import { useLoaded } from "@/components/providers";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

function Showcase({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  const chipY = [useTransform(scrollYProgress, [0, 1], [140, -140]), useTransform(scrollYProgress, [0, 1], [60, -200]), useTransform(scrollYProgress, [0, 1], [200, -60])];
  const spots = ["left-[6%] top-[18%]", "right-[7%] top-[26%]", "left-[10%] bottom-[16%]", "right-[12%] bottom-[12%]"];

  return (
    <div ref={ref} className="container">
      <motion.div
        initial={{ clipPath: "inset(12% 8% 12% 8% round 2rem)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease }}
        className="relative grid min-h-[60vh] place-items-center overflow-hidden rounded-[2rem] px-5 py-16 md:min-h-[86vh] md:px-16"
        style={{ backgroundColor: p.color }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.3),transparent_55%)]" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-4 select-none text-[14rem] font-semibold leading-none tracking-[-0.06em] text-black/10 md:text-[24rem]">
          {p.title.split(" ")[0]}
        </span>

        {p.stack.slice(0, 4).map((s, i) => (
          <motion.span
            key={s}
            style={{ y: chipY[i % chipY.length] }}
            className={`absolute hidden rounded-full bg-white/90 px-4 py-2 font-mono text-xs text-night shadow-lg backdrop-blur md:block ${spots[i]}`}
          >
            {s}
          </motion.span>
        ))}

        <motion.div style={{ y, scale }} className="preview-light relative w-full max-w-[880px]">
          <div className="origin-center md:scale-[1.15]">
            <BrowserMock kind={p.preview} label={`${p.id}.app`} className="shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]" />
          </div>
        </motion.div>
      </motion.div>
      {p.confidential && (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Lock size={14} /> Client work under NDA. The preview is an illustration of the product type, not the real screens.
        </p>
      )}
    </div>
  );
}

function NextProject({ next }: { next: Project }) {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });

  return (
    <section data-nav="dark" className="relative mt-28 overflow-hidden rounded-t-[2.5rem] bg-night text-white md:mt-40">
      <Link
        href={`/work/${next.id}/`}
        data-cursor="Next"
        onPointerEnter={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          sx.jump(e.clientX - r.left);
          sy.jump(e.clientY - r.top);
          setHover(true);
        }}
        onPointerLeave={() => setHover(false)}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        className="group relative block overflow-hidden py-24 md:py-36"
      >
        <div className="container relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Next project</p>
          <div className="mt-6 flex items-end justify-between gap-6">
            <h2 className="text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.06em] transition-transform duration-700 group-hover:translate-x-4">
              {next.title}
            </h2>
            <span className="mb-4 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-night md:h-24 md:w-24">
              <ArrowUpRight size={28} />
            </span>
          </div>
          <p className="mt-4 text-lg text-white/60">
            <span className="serif text-periwinkle">for</span> {next.client} · {next.category}
          </p>
        </div>

        {/* Preview that follows the cursor */}
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{ duration: 0.35, ease }}
              style={{ left: sx, top: sy }}
              className="pointer-events-none absolute z-0 hidden w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5 md:block"
            >
              <div className="rounded-2xl p-5" style={{ backgroundColor: next.color }}>
                <div className="preview-light">
                  <BrowserMock kind={next.preview} label={`${next.id}.app`} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      <div className="container border-t border-white/10 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/60">
            Have a frontend role in mind? <span className="text-white">{profile.email}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#work" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-white/50">
              All projects
            </Link>
            <Link href="/#contact" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-periwinkle">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudy({ project: p, next, index }: { project: Project; next: Project; index: number }) {
  const loaded = useLoaded();
  const go = (d: number) => ({ initial: { opacity: 0, y: 16 }, animate: loaded ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: d, ease } });
  const meta = [
    { k: "Client", v: p.client },
    { k: "Role", v: p.role },
    { k: "Year", v: p.year },
    { k: "Category", v: p.category },
  ];

  return (
    <article>
      {/* Hero */}
      <header className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[10%] -top-[30%] -z-10 h-[70vw] max-h-[800px] w-[70vw] max-w-[800px] animate-drift rounded-full" style={{ background: `radial-gradient(circle, ${p.color}33, transparent 62%)` }} />
        <div className="container">
          <motion.div {...go(0.5)} className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/#work" className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink">
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All work
            </Link>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Case study {pad(index + 1)} / {pad(projects.length)}
            </span>
          </motion.div>

          <SplitReveal
            as="h1"
            immediate
            play={loaded}
            delay={0.6}
            className="mt-10 text-[clamp(3.2rem,11vw,10rem)] font-semibold leading-[0.88] tracking-[-0.06em]"
            parts={[{ text: p.title }]}
          />

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <motion.p {...go(1)} className="text-2xl md:col-span-5">
              <span className="serif text-[1.2em] text-accent">for</span> {p.client}
            </motion.p>
            <motion.p {...go(1.1)} className="text-lg leading-relaxed text-muted md:col-span-7">
              {p.summary}
            </motion.p>
          </div>

          <motion.dl
            initial="hide"
            animate={loaded ? "show" : "hide"}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink pt-6 md:grid-cols-4"
          >
            {meta.map((m) => (
              <motion.div key={m.k} variants={{ hide: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6, ease }}>
                <dt className="label">{m.k}</dt>
                <dd className="mt-1.5 font-medium">{m.v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </header>

      <Showcase p={p} />

      {/* Story */}
      <div className="container mt-24 space-y-20 md:mt-36 md:space-y-28">
        <section className="grid gap-6 md:grid-cols-12">
          <p className="label md:col-span-3">(01) The challenge</p>
          <Reveal className="md:col-span-9">
            <p className="text-[clamp(1.6rem,3.2vw,2.8rem)] font-medium leading-[1.15] tracking-[-0.03em]">{p.challenge}</p>
          </Reveal>
        </section>

        <section className="grid gap-6 md:grid-cols-12">
          <p className="label md:col-span-3">(02) What I built</p>
          <ol className="border-t border-line md:col-span-9">
            {p.contributions.map((c, i) => (
              <Reveal key={c} delay={i * 0.06}>
                <li className="group flex items-baseline gap-6 border-b border-line py-6 transition-colors md:py-8">
                  <span className="serif text-3xl text-accent md:text-4xl">{pad(i + 1)}</span>
                  <span className="text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">{c}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="grid gap-6 md:grid-cols-12">
          <p className="label md:col-span-3">(03) The outcome</p>
          <Reveal className="md:col-span-9">
            <p className="text-[clamp(1.6rem,3.2vw,2.8rem)] font-medium leading-[1.15] tracking-[-0.03em]">{p.outcome}</p>
          </Reveal>
        </section>

        <section className="grid gap-6 md:grid-cols-12">
          <p className="label md:col-span-3">Tech used</p>
          <Reveal className="md:col-span-9">
            <ul className="flex flex-wrap gap-3">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-surface px-5 py-2.5 text-lg font-medium transition-colors hover:border-accent hover:text-accent">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>

      <NextProject next={next} />
    </article>
  );
}
