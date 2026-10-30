type LenisLike = { scrollTo: (target: number | HTMLElement, opts?: { duration?: number; immediate?: boolean; offset?: number }) => void };

const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/** Smooth-scroll to a page Y position (uses Lenis when it's running). */
export function scrollToY(y: number, immediate = false) {
  const l = lenis();
  if (l) l.scrollTo(y, { duration: 1.2, immediate });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

export function scrollToEl(el: HTMLElement, immediate = false) {
  const l = lenis();
  if (l) l.scrollTo(el, { duration: 1.2, immediate });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}

export function setLenis(instance: LenisLike | undefined) {
  (window as unknown as { __lenis?: LenisLike }).__lenis = instance;
}
