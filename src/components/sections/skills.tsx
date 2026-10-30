"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Blocks, MessagesSquare, Plug, Rocket } from "lucide-react";
import { process, skills } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SplitReveal } from "@/components/ui/split-reveal";

const icons = [MessagesSquare, Blocks, Plug, Rocket];
const tints = ["from-accent/15 to-transparent", "from-accent-2/20 to-transparent", "from-accent/10 to-accent-2/10", "from-warm/20 to-transparent"];

function StackCard({ i, progress, total }: { i: number; progress: MotionValue<number>; total: number }) {
  const s = process[i];
  const Icon = icons[i];
  // Each card shrinks a little as the next one slides over it
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(progress, [i / total, (i + 1) / total], [1, i === total - 1 ? 1 : 0.8]);

  return (
    <div className="sticky top-0 flex h-[78vh] items-center md:h-[85vh]">
      <motion.div
        style={{ scale, top: `calc(${i * 22}px)` }}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_-20px_60px_-40px_rgba(13,15,21,0.35)]"
      >
        <motion.div style={{ opacity: dim }} className={`grid gap-10 bg-gradient-to-br p-8 md:grid-cols-12 md:p-14 ${tints[i]}`}>
          <div className="md:col-span-7">
            <div className="flex items-center gap-4">
              <span className="serif text-6xl leading-none text-accent md:text-8xl">0{i + 1}</span>
              <span className="label">Step {i + 1} of {total}</span>
            </div>
            <h3 className="mt-8 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{s.title}</h3>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted md:text-xl">{s.text}</p>
          </div>
          <div className="grid place-items-center md:col-span-5">
            <div className="relative grid h-40 w-40 place-items-center md:h-56 md:w-56">
              <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/40" />
              <span className="absolute inset-6 rounded-full bg-gradient-to-br from-accent/20 to-accent-2/20 blur-xl" />
              <span className="relative grid h-20 w-20 place-items-center rounded-3xl bg-ink text-bg shadow-xl md:h-24 md:w-24">
                <Icon size={36} strokeWidth={1.6} />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Skills() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="skills" className="border-t border-line bg-surface/60 py-24 md:py-36">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="label md:col-span-3">(04) Capabilities</p>
          <SplitReveal
            className="text-[clamp(2.5rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] md:col-span-9"
            parts={[{ text: "How I" }, { text: "work", accent: true }, { text: "& what I use" }]}
          />
        </div>

        {/* Stacking process cards */}
        <div ref={stackRef} className="relative mt-10 md:mt-16">
          {process.map((s, i) => (
            <StackCard key={s.title} i={i} total={process.length} progress={scrollYProgress} />
          ))}
        </div>

        <div className="mt-16 grid gap-y-12 md:grid-cols-12 md:gap-x-6">
          <p className="label md:col-span-3">Toolkit</p>
          <div className="grid gap-10 sm:grid-cols-2 md:col-span-9 lg:grid-cols-4">
            {skills.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <h3 className="border-b border-ink pb-3 text-sm font-semibold">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((s) => (
                    <li key={s} className="group flex cursor-default items-center gap-2 text-[17px] text-muted transition-colors hover:text-ink">
                      <span className="h-1.5 w-1.5 scale-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-100" />
                      <span className="-ml-3.5 transition-transform duration-300 group-hover:translate-x-3.5">{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
