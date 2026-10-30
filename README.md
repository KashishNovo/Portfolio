# Kashish Goel — Portfolio

Personal portfolio of **Kashish Goel**, Frontend Developer.

**Live:** https://kashish998.github.io <!-- update after deploying -->

## Tech stack

- **Next.js 14** (App Router, static export)
- **React 18** + **TypeScript**
- **Tailwind CSS** with a token-based light/dark theme
- **Three.js** with custom GLSL shaders for the 3D hero
- **Framer Motion** for the intro, text reveals and scroll-linked animations
- **Lenis** for smooth scrolling
- **next-themes**, **lucide-react**, **Geist** + **Instrument Serif** fonts

## Features

- **Greeting intro**: "Hello → नमस्ते → Hola…" then the panel lifts away on a curved edge. The first word is in the static HTML, so the screen is never blank. Plays once per visit
- **3D particle sphere** in the hero, written as custom GLSL shaders: noise-driven, mouse-reactive, pauses off-screen, theme-aware
- **Project gallery**: pinned horizontal scroll on desktop with prev/next buttons, clickable dots, ← → keys and 3D tilt cards; swipeable snap carousel on phones
- **Case-study pages** (`/work/[id]`) for every project: challenge, what I built, outcome, tech, a clip-path reveal showcase with parallax, and a "next project" link with a cursor-following preview
- **Page transitions**: a CSS curtain on every route change
- **Scroll-speed marquee**: the skills band speeds up, flips direction and leans with your scroll velocity
- **Masked word-by-word heading reveals**, blur-to-sharp statement text, **stacking process cards**, footer name that rises letter by letter
- **Experience timeline** with a sticky summary that follows the role you're reading
- **Working contact form** with validation that opens a pre-filled Gmail draft or the default mail app
- Custom cursor with contextual labels, text-scramble nav, navbar that adapts over dark sections
- Fully responsive, light and dark themes, respects "reduce motion"; SEO metadata per page

## Project structure

```
├── public/
│   └── Kashish_Goel_Resume.pdf        # linked across the site
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # fonts, SEO metadata, providers
│   │   ├── template.tsx               # page-transition curtain
│   │   ├── work/[id]/page.tsx         # one static page per project
│   │   ├── page.tsx                   # assembles the sections
│   │   ├── globals.css                # theme tokens + base styles
│   │   └── icon.svg                   # favicon
│   ├── components/
│   │   ├── sections/                  # hero, about, work, experience, skills, education, contact
│   │   ├── ui/                        # BrowserMock, Reveal, Magnetic, ScrambleText, LocalTime...
│   │   ├── hero-scene.tsx             # Three.js particle sphere + shaders
│   │   ├── case-study.tsx             # case-study page layout and animations
│   │   ├── navbar.tsx
│   │   ├── preloader.tsx
│   │   ├── cursor.tsx
│   │   ├── providers.tsx              # theme, motion config, smooth scroll, load state
│   │   └── theme-toggle.tsx
│   ├── data/
│   │   └── portfolio.ts               # ✏️ all text content lives here
│   └── lib/
│       ├── contact.ts                 # Gmail / mailto links, clipboard helper
│       ├── scroll.ts                  # smooth-scroll helpers
│       └── utils.ts
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Run locally

Requires Node.js 18.17 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

Everything you'll want to change (bio, projects, experience, skills, links) is in
`src/data/portfolio.ts`. To update the resume, replace `public/Kashish_Goel_Resume.pdf`
with a file of the same name.

## Deploy

### Vercel (recommended)
1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Click **Deploy**. Every push to `main` redeploys automatically.

### GitHub Pages
1. `npm run build` creates a static site in the `out/` folder.
2. Easiest: in the repo, go to **Settings → Pages → Source: GitHub Actions** and pick the
   **Next.js** workflow GitHub suggests.
3. If the repo is named `<username>.github.io`, the site is served at `https://<username>.github.io`.

### Netlify
Build command `npm run build`, publish directory `out`.
