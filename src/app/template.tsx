/**
 * Re-mounts on every page change. The curtain is pure CSS, so it starts
 * sliding away on first paint without waiting for JavaScript.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="page-curtain pointer-events-none fixed inset-0 z-[85] bg-night" />
      {children}
    </>
  );
}
