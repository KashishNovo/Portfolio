import type { Config } from "tailwindcss";

const withAlpha = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        bg: withAlpha("--bg"),
        surface: withAlpha("--surface"),
        elevated: withAlpha("--elevated"),
        ink: withAlpha("--ink"),
        muted: withAlpha("--muted"),
        line: withAlpha("--line"),
        accent: withAlpha("--accent"),
        "accent-2": withAlpha("--accent-2"),
        "accent-fg": withAlpha("--accent-fg"),
        warm: withAlpha("--warm"),
        // Fixed dark surfaces used by the Work and Contact sections in both themes
        night: "#0C0E14",
        "night-2": "#151821",
        periwinkle: "#9DB1FF",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        "marquee-rev": { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
        spin: { to: { transform: "rotate(360deg)" } },
        ping2: { "75%, 100%": { transform: "scale(2.4)", opacity: "0" } },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-4%, 6%) scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-rev": "marquee-rev 50s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        ping2: "ping2 1.8s cubic-bezier(0,0,.2,1) infinite",
        drift: "drift 16s ease-in-out infinite",
        "drift-slow": "drift 22s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};

export default config;
