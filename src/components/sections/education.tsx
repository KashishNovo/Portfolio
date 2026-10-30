import { certifications, education } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";

export function Education() {
  return (
    <section className="border-t border-line bg-surface/60 py-24 md:py-32">
      <div className="container grid gap-10 md:grid-cols-12 md:gap-6">
        <p className="label md:col-span-3">(05) Education</p>
        <Reveal className="md:col-span-4">
          <p className="font-mono text-sm tabular-nums text-muted">{education.years}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl">{education.degree}</h3>
          <p className="mt-2 text-muted">{education.school}</p>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-5">
          <p className="label">Certifications</p>
          <ul className="mt-4 border-t border-line">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                <span className="font-medium">{c.name}</span>
                <span className="shrink-0 font-mono text-sm tabular-nums text-muted">{c.date}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
