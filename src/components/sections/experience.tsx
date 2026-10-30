"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experience, profile } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SplitReveal } from "@/components/ui/split-reveal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const job = experience[active];

  return (
    <section id="experience" className="relative py-24 md:py-36">
      <div className="container">
        <Reveal className="grid gap-6 md:grid-cols-12">
          <p className="label md:col-span-3">(03) Experience</p>
          <div className="md:col-span-9">
            <SplitReveal
              className="text-[clamp(2.5rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
              parts={[{ text: "Where I've" }, { text: "shipped", accent: true }]}
            />
            <p className="mt-5 max-w-xl text-lg text-muted">One full-time role and two internships, all spent building interfaces people use every day.</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Sticky summary that follows the role you're reading */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.18),transparent_65%)]" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-2)/0.16),transparent_65%)]" />

                <div className="relative flex items-center justify-between">
                  <p className="label">Now reading</p>
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", job.current ? "bg-accent text-accent-fg" : "bg-elevated text-muted")}>
                    {job.current ? "Current role" : job.type}
                  </span>
                </div>

                <div className="relative mt-8 h-[8.5rem] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={active}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <p className="serif text-[5.5rem] leading-[0.95] text-ink">{job.short}</p>
                      <p className="mt-3 font-mono text-sm tabular-nums text-muted">
                        {job.start} — {job.end} · {job.location}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ul className="relative mt-8 space-y-1 border-t border-line pt-6">
                  {experience.map((j, i) => (
                    <li key={j.company}>
                      <button
                        type="button"
                        onClick={() => items.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                        className={cn("group flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors", i === active ? "bg-elevated" : "hover:bg-elevated/60")}
                      >
                        <span className={cn("font-mono text-xs tabular-nums", i === active ? "text-accent" : "text-muted")}>0{i + 1}</span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block truncate text-sm font-semibold", i !== active && "text-muted")}>{j.role}</span>
                          <span className="block text-xs text-muted">{j.short}</span>
                        </span>
                        <span className={cn("h-2 w-2 rounded-full transition-all", i === active ? "scale-100 bg-accent" : "scale-50 bg-line")} />
                      </button>
                    </li>
                  ))}
                </ul>

                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                  Full resume <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Role cards */}
          <ol ref={listRef} className="relative space-y-6 lg:col-span-7 lg:pl-10">
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block" />
            <motion.span aria-hidden="true" style={{ scaleY: fill }} className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-gradient-to-b from-accent to-accent-2 lg:block" />

            {experience.map((j, i) => (
              <li key={j.company} ref={(el) => { items.current[i] = el; }} data-index={i} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-10 top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 lg:block",
                    i <= active ? "border-accent bg-accent" : "border-line bg-bg",
                  )}
                />
                <motion.article
                  animate={{ opacity: i === active ? 1 : 0.55, scale: i === active ? 1 : 0.985 }}
                  transition={{ duration: 0.5, ease }}
                  className={cn(
                    "rounded-[1.75rem] border bg-surface p-6 transition-[border-color,box-shadow] duration-500 md:p-9",
                    i === active ? "border-accent/40 shadow-[0_30px_60px_-35px_rgb(var(--accent)/0.45)]" : "border-line",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs tabular-nums text-muted">
                      {j.start} — {j.end}
                    </span>
                    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", j.current ? "bg-accent/15 text-accent" : "bg-elevated text-muted")}>
                      {j.current ? "Current · " : ""}
                      {j.type}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-[2rem]">{j.role}</h3>
                  <p className="mt-2 text-muted">
                    <span className="serif text-[1.15em] text-accent">at</span> {j.company} · {j.location}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {j.points.map((pt) => (
                      <li key={pt} className="flex gap-3 leading-relaxed text-ink/85">
                        <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {j.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
