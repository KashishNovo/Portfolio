"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { profile, marqueeRows } from "@/data/portfolio";
import { VelocityMarquee } from "@/components/ui/velocity-marquee";

const emphasis = new Set(["fast,", "responsive", "4", "component", "library"]);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const blur = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, filter: blur }} className={emphasis.has(word) ? "serif text-accent" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = profile.statement.split(" ");

  return (
    <section id="about" className="pb-16 pt-20 md:pb-24 md:pt-36">
      <div className="container grid gap-10 md:grid-cols-12">
        <p className="label md:col-span-3">(01) About</p>
        <p ref={ref} className="text-[clamp(1.9rem,4.2vw,3.8rem)] font-medium leading-[1.1] tracking-[-0.035em] md:col-span-9">
          {words.map((w, i) => (
            <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>

      {/* Skills band: drifts on its own, speeds up and leans as you scroll */}
      <div className="mt-20 border-y border-line bg-surface/50 py-7 backdrop-blur-sm md:mt-28">
        <div className="space-y-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <VelocityMarquee baseVelocity={-1.2}>
            {marqueeRows.tech.map((t) => (
              <span key={t} className="flex items-center gap-10 whitespace-nowrap pr-10 text-xl font-medium tracking-tight text-ink/80 md:text-[1.7rem]">
                {t}
                <span aria-hidden="true" className="h-2 w-2 rotate-45 rounded-[2px] bg-accent/70" />
              </span>
            ))}
          </VelocityMarquee>
          <VelocityMarquee baseVelocity={1}>
            {marqueeRows.craft.map((t) => (
              <span key={t} className="serif flex items-center gap-10 whitespace-nowrap pr-10 text-2xl text-muted md:text-[2.1rem]">
                {t}
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-2/70" />
              </span>
            ))}
          </VelocityMarquee>
        </div>
      </div>
    </section>
  );
}
