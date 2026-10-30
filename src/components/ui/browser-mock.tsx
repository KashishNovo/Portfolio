import type { PreviewKind } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Abstract, brand-free UI previews. Client work is under NDA, so each
 * project gets an illustrative wireframe of its product type instead of a screenshot.
 */

const Bar = ({ className }: { className?: string }) => <span className={cn("block h-2 rounded-full bg-line", className)} />;

function Marketplace() {
  return (
    <div className="grid h-full grid-cols-[88px_1fr] gap-3 p-4 sm:grid-cols-[110px_1fr]">
      <div className="space-y-2.5">
        <Bar className="w-3/4 bg-accent/70" />
        <Bar />
        <Bar className="w-5/6" />
        <Bar className="w-2/3" />
        <Bar className="w-4/5" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2">
          <span className="h-3 w-3 rounded-full border-2 border-muted/50" />
          <Bar className="w-1/3" />
          <span className="ml-auto h-5 w-14 rounded-md bg-accent" />
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-lg border border-line bg-surface p-2 transition-transform duration-500 group-hover:-translate-y-1",
                i > 3 && "hidden sm:block",
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="mb-2 h-10 rounded-md bg-gradient-to-br from-accent/25 to-warm/20" />
              <Bar className="mb-1.5 w-4/5" />
              <Bar className="w-1/2 bg-accent/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Crm() {
  const rows = ["bg-emerald-500", "bg-warm", "bg-accent", "bg-emerald-500", "bg-rose-400"];
  return (
    <div className="grid h-full grid-cols-[1fr] gap-3 p-4 sm:grid-cols-[1.4fr_1fr]">
      <div className="rounded-lg border border-line bg-surface p-3">
        <div className="mb-3 flex items-center justify-between">
          <Bar className="w-24" />
          <span className="h-5 w-16 rounded-md bg-accent" />
        </div>
        <div className="space-y-2">
          {rows.map((c, i) => (
            <div key={i} className="flex items-center gap-2 rounded-md px-1 py-1 transition-colors duration-300 group-hover:bg-elevated" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="h-5 w-5 shrink-0 rounded-full bg-elevated ring-1 ring-line" />
              <Bar className="w-1/3" />
              <Bar className="hidden w-1/5 sm:block" />
              <span className={cn("ml-auto h-4 w-12 rounded-full opacity-80", c)} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden space-y-3 sm:block">
        <div className="rounded-lg border border-line bg-surface p-3">
          <Bar className="mb-2 w-1/2" />
          <div className="flex h-16 items-end gap-1.5">
            {[40, 65, 50, 80, 60, 92].map((h, i) => (
              <span key={i} className="flex-1 origin-bottom rounded-sm bg-accent/70 transition-transform duration-500 group-hover:scale-y-110" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-lg border border-line bg-surface p-3">
          <Bar className="w-2/3" />
          <div className="h-6 rounded-md border border-line" />
          <div className="h-6 rounded-md border border-line" />
          <span className="block h-6 rounded-md bg-accent" />
        </div>
      </div>
    </div>
  );
}

function Redesign() {
  return (
    <div className="relative grid h-full grid-cols-2 gap-3 p-4">
      <div className="space-y-2 rounded-lg border border-dashed border-line p-3 opacity-60 grayscale">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-muted">Before</span>
        <Bar className="w-full" />
        <Bar className="w-5/6" />
        <div className="h-12 rounded border border-line" />
        <Bar className="w-2/3" />
        <Bar className="w-1/2" />
      </div>
      <div className="space-y-2.5 rounded-lg border border-accent/40 bg-surface p-3 shadow-[0_10px_30px_-15px_rgb(var(--accent)/0.6)] transition-transform duration-500 group-hover:-translate-y-1">
        <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-accent">After</span>
        <div className="flex gap-2">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-warm" />
          <div className="flex-1 space-y-1.5 pt-1">
            <Bar className="w-3/4" />
            <Bar className="w-1/2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-10 rounded-md bg-accent/15" />
          <div className="h-10 rounded-md bg-warm/20" />
        </div>
        <span className="block h-6 w-2/3 rounded-md bg-accent" />
      </div>
    </div>
  );
}

function Library() {
  return (
    <div className="flex h-full flex-wrap content-center items-center justify-center gap-2.5 p-5">
      <span className="rounded-lg bg-accent px-3 py-1.5 font-mono text-[11px] text-accent-fg">Button</span>
      <span className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-ink">Input</span>
      <span className="rounded-full bg-emerald-500/15 px-3 py-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">Badge</span>
      <span className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-ink transition-transform duration-500 group-hover:-rotate-3">Modal</span>
      <span className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-ink">Table</span>
      <span className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-ink">
        <span className="relative h-3.5 w-6 rounded-full bg-accent"><span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-white" /></span>
        Switch
      </span>
      <span className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-ink transition-transform duration-500 group-hover:rotate-3">Tabs</span>
    </div>
  );
}

function Landing() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
      <span className="rounded-full border border-line px-3 py-1"><Bar className="w-16" /></span>
      <span className="block h-4 w-3/4 rounded-full bg-ink/80" />
      <span className="block h-4 w-1/2 rounded-full bg-gradient-to-r from-accent to-warm" />
      <Bar className="w-2/3" />
      <div className="mt-1 flex gap-2">
        <span className="h-7 w-20 rounded-lg bg-accent transition-transform duration-500 group-hover:scale-105" />
        <span className="h-7 w-20 rounded-lg border border-line" />
      </div>
    </div>
  );
}

function Streaming() {
  return (
    <div className="space-y-3 p-4">
      <div className="relative h-20 overflow-hidden rounded-lg bg-gradient-to-r from-accent/40 via-accent/15 to-warm/30">
        <span className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 transition-transform duration-500 group-hover:scale-110">
          <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-black" />
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="aspect-square rounded-md bg-elevated ring-1 ring-line transition-transform duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 60}ms` }} />
        ))}
      </div>
    </div>
  );
}

function Travel() {
  const scores = [96, 92, 100];
  return (
    <div className="flex h-full items-center justify-center gap-4 p-5 sm:gap-6">
      {scores.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="relative h-16 w-16">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-line" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.5" fill="none" strokeWidth="3" strokeLinecap="round"
                className="stroke-emerald-500 transition-all duration-700"
                strokeDasharray={`${(s / 100) * 97.4} 97.4`}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center font-mono text-[11px] text-ink">
              {["Perf", "SEO", "Mobile"][i]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const map: Record<PreviewKind, () => JSX.Element> = {
  marketplace: Marketplace,
  crm: Crm,
  redesign: Redesign,
  library: Library,
  landing: Landing,
  streaming: Streaming,
  travel: Travel,
};

export function BrowserMock({ kind, label, className }: { kind: PreviewKind; label: string; className?: string }) {
  const Content = map[kind];
  return (
    <div
      aria-hidden="true"
      className={cn("overflow-hidden rounded-xl border border-line bg-bg shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)]", className)}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-elevated px-3 py-0.5 font-mono text-[10px] text-muted">{label}</span>
      </div>
      <div className="min-h-[190px]">
        <Content />
      </div>
    </div>
  );
}
