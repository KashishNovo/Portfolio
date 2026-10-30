"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SplitReveal } from "@/components/ui/split-reveal";
import { LocalTime } from "@/components/ui/local-time";
import { copyText, gmailComposeUrl, mailtoUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface Errors { name?: string; message?: string }

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-periwinkle/70 focus:bg-white/[0.06]";

export function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const subject = `Hello Kashish${company ? ` (from ${company})` : name ? ` (from ${name})` : ""}`;
  const body = `${message}\n\n— ${name}${company ? `, ${company}` : ""}`;

  const validate = () => {
    const e: Errors = {};
    if (!name.trim()) e.name = "Please add your name.";
    if (message.trim().length < 10) e.message = "Please write at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendGmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(gmailComposeUrl(subject, body), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const sendMailApp = () => {
    if (!validate()) return;
    window.location.href = mailtoUrl(subject, body);
    setSent(true);
  };

  const copy = async () => {
    if (await copyText(profile.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const links = [
    { label: "LinkedIn", note: "Let's connect", href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", note: "Browse my code", href: profile.github, icon: Github },
    { label: "Resume", note: "PDF, one page", href: profile.resume, icon: FileText },
  ];

  return (
    <section id="contact" data-nav="dark" className="relative isolate overflow-hidden rounded-t-[2.5rem] bg-night pt-24 text-white md:pt-32">
      {/* Background glow + grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[-20%] h-[640px] w-[640px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(72,101,217,0.35),transparent_65%)]" />
        <div className="absolute -right-[10%] bottom-[-10%] h-[560px] w-[560px] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(139,122,232,0.25),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />
      </div>

      <div className="container">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">(06) Contact</p>
        <SplitReveal
          className="mt-6 max-w-5xl text-[clamp(3rem,8.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
          parts={[{ text: "Let's build something" }, { text: "together.", accent: true }]}
          accentClass="text-periwinkle"
        />

        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-12">
          {/* Direct options */}
          <Reveal className="flex flex-col gap-4 lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-white/60">
              I&apos;m looking for a frontend role where I can keep shipping fast, polished products with a strong team. Send a message, or reach me directly.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">Email</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="break-all text-xl font-medium tracking-tight md:text-2xl">{profile.email}</span>
                <button
                  type="button"
                  onClick={copy}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    copied ? "bg-emerald-500 text-white" : "bg-white text-night hover:bg-periwinkle",
                  )}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <ul className="grid grid-cols-3 gap-2 sm:gap-3">
              {links.map(({ label, note, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-all sm:p-4 duration-300 hover:-translate-y-1 hover:border-periwinkle/50 hover:bg-white/[0.06]"
                  >
                    <span className="flex items-center justify-between text-white/80">
                      <Icon size={18} />
                      <ArrowUpRight size={15} className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </span>
                    <span className="mt-4 text-sm font-semibold sm:mt-5 sm:text-base">{label}</span>
                    <span className="hidden text-xs text-white/45 sm:block">{note}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-white/80">{profile.availability}</span>
              <span className="ml-auto font-mono text-xs tabular-nums text-white/45">
                {profile.location} · <LocalTime />
              </span>
            </div>
          </Reveal>

          {/* Message form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="h-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                      className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-400"
                    >
                      <Check size={30} strokeWidth={2.5} />
                    </motion.span>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight">Your email is ready</h3>
                    <p className="mt-2 max-w-sm text-white/60">It opened with your message filled in. Press send and I&apos;ll get back to you soon.</p>
                    <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-medium text-periwinkle hover:underline">
                      Write another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={sendGmail} noValidate>
                    <h3 className="text-2xl font-semibold tracking-tight">Send me a message</h3>
                    <p className="mt-1 text-sm text-white/50">It opens a ready-to-send email with everything filled in.</p>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-white/80">Your name</label>
                        <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Priya Sharma" className={cn(field, errors.name && "border-rose-400/70")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} />
                        {errors.name && <p id="c-name-err" className="mt-1.5 text-xs text-rose-300">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-company" className="mb-1.5 block text-sm font-medium text-white/80">Company <span className="text-white/40">(optional)</span></label>
                        <input id="c-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." className={field} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-white/80">Message</label>
                      <textarea
                        id="c-message"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hi Kashish, we're hiring a frontend developer and would love to chat…"
                        className={cn(field, "resize-none", errors.message && "border-rose-400/70")}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "c-message-err" : undefined}
                      />
                      {errors.message && <p id="c-message-err" className="mt-1.5 text-xs text-rose-300">{errors.message}</p>}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-night transition-all hover:-translate-y-0.5 hover:bg-periwinkle">
                        <Send size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        Send with Gmail
                      </button>
                      <button type="button" onClick={sendMailApp} className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition-colors hover:border-white/40">
                        Use my email app
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col gap-6 border-t border-white/10 py-10 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built with Next.js, TypeScript and Three.js.</p>
          <a href="#top" className="link-underline self-start text-white/80 hover:text-white sm:self-auto">Back to top ↑</a>
        </footer>
      </div>

      {/* Oversized name watermark */}
      <p aria-hidden="true" className="pointer-events-none -mb-[0.2em] flex select-none justify-center overflow-hidden whitespace-nowrap text-[18vw] font-semibold leading-none tracking-[-0.06em] text-white/[0.05]">
        {"Kashish Goel".split("").map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch === " " ? "\u00a0" : ch}
          </motion.span>
        ))}
      </p>
    </section>
  );
}
