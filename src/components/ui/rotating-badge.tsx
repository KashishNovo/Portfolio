import { ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Circular rotating text badge with an arrow in the middle. */
export function RotatingBadge({ text, href, className }: { text: string; href: string; className?: string }) {
  return (
    <a href={href} data-cursor="Hire" aria-label={text} className={cn("group relative grid h-32 w-32 place-items-center md:h-36 md:w-36", className)}>
      <span className="absolute inset-2 rounded-full bg-surface/70 backdrop-blur-md" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-path" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text className="fill-ink font-mono text-[15px] uppercase tracking-[0.3em]">
          <textPath href="#badge-path">{text}</textPath>
        </text>
      </svg>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-ink text-bg transition-all duration-500 group-hover:rotate-[-45deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-fg">
        <ArrowDownRight size={22} />
      </span>
    </a>
  );
}
