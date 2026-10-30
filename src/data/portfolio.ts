/**
 * All site content lives here. Edit this file to update the portfolio;
 * components read from it, so no JSX changes are needed for content updates.
 */

export type PreviewKind = "marketplace" | "library" | "redesign" | "crm" | "landing" | "streaming" | "travel";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  challenge: string;
  contributions: string[];
  outcome: string;
  stack: string[];
  preview: PreviewKind;
  confidential: boolean;
  /** Backdrop color for the project's preview panel */
  color: string;
}

export interface Job {
  role: string;
  company: string;
  short: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  type: "Full-time" | "Internship";
  points: string[];
  tags: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const profile = {
  name: "Kashish Goel",
  role: "Frontend Developer",
  location: "Noida, India",
  timezone: "Asia/Kolkata",
  availability: "Open to frontend roles",
  email: "kashishgoel35@gmail.com",
  // TODO: replace with your full LinkedIn profile URL
  linkedin: "https://www.linkedin.com/in/kashish-goel-9517341a9/",
  github: "https://github.com/KashishNovo",
  resume: "/Kashish_Goel_Resume.pdf",
  statement:
    "I turn designs into fast, responsive interfaces. In 2+ years I've shipped 4 client products, built the component library my team relies on, and redesigned platforms end to end.",
  focus: "React, Next.js, TypeScript",
  now: { company: "NovoStack", title: "Software Developer (Frontend)", since: "Apr 2025" },
};

/** Two rows in the skills band under the About statement */
export const marqueeRows = {
  tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "ShadCN UI", "REST APIs", "Prisma", "PostgreSQL", "Vercel"],
  craft: ["Component libraries", "Responsive interfaces", "Role-based access", "JWT authentication", "Lighthouse audits", "SEO", "Complete redesigns", "Pixel-accurate UI"],
};

export const projects: Project[] = [
  {
    id: "hellotrade",
    title: "HelloTrade",
    client: "IndiaMART",
    category: "B2B marketplace",
    year: "2025",
    role: "Frontend developer · NovoStack",
    summary: "A B2B trade web app connecting buyers and sellers, used across phones, tablets and desktops.",
    challenge:
      "A B2B marketplace has to work as well on a phone on the move as on a desktop in an office, with dense product information on every screen.",
    contributions: [
      "Built responsive UI components and product features",
      "Fixed usability and cross-device layout issues",
      "Kept the interface consistent from mobile to desktop",
    ],
    outcome: "A consistent, responsive interface across phones, tablets and desktops, with layout and usability issues resolved.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
    preview: "marketplace",
    confidential: true,
    color: "#4865D9",
  },
  {
    id: "compass",
    title: "Compass Visa Apply",
    client: "Leverage",
    category: "Customer portal + CRM",
    year: "2025",
    role: "Frontend developer · NovoStack",
    summary: "Two connected products: a portal where customers apply for visas, and a CRM where the team manages every application.",
    challenge:
      "Customers and the internal team use two different apps that share the same data, and each type of user should only see what they're allowed to.",
    contributions: [
      "Built shared React components used by both apps",
      "Integrated REST APIs with Axios and JWT authentication",
      "Implemented role-based access for customers and admins",
      "Shipped enhancements across the portal and the CRM",
    ],
    outcome: "One shared component set powering both the portal and the CRM, with secure logins and role-based access.",
    stack: ["React", "TypeScript", "Axios", "JWT", "RBAC"],
    preview: "crm",
    confidential: true,
    color: "#2E8A7E",
  },
  {
    id: "indirow",
    title: "Indirow",
    client: "Internovo",
    category: "Complete UI redesign",
    year: "2025",
    role: "Frontend developer · NovoStack",
    summary: "An existing product that needed a completely new interface without breaking what already worked.",
    challenge: "Ship a completely new interface for a live product without breaking any of its existing functionality.",
    contributions: [
      "Rebuilt every screen to a new design specification",
      "Connected the existing APIs to the new interface",
      "Used the shared component library to keep the new UI consistent",
    ],
    outcome: "Every screen rebuilt to the new design, running on the product's existing APIs.",
    stack: ["React", "Tailwind", "ShadCN UI", "REST APIs"],
    preview: "redesign",
    confidential: true,
    color: "#C2704F",
  },
  {
    id: "onebharat",
    title: "OneBharat",
    client: "Internovo",
    category: "Landing page + web app",
    year: "2025",
    role: "Frontend developer · NovoStack",
    summary: "A marketing landing page and companion web app built while requirements were still evolving.",
    challenge: "Deliver a landing page and a web app while the product requirements were still changing.",
    contributions: ["Developed responsive layouts and UI features", "Adapted quickly as the scope changed"],
    outcome: "A responsive landing page and web app delivered while the scope kept evolving.",
    stack: ["Next.js", "Tailwind"],
    preview: "landing",
    confidential: true,
    color: "#B98E33",
  },
  {
    id: "hungama",
    title: "Hungama Redesign",
    client: "Hungama Digital Media",
    category: "Streaming platform",
    year: "2024",
    role: "SDE intern",
    summary: "UI redesign of a large-scale music and video streaming web platform.",
    challenge: "New designs for a large consumer streaming platform had to fit into an existing, large codebase.",
    contributions: [
      "Turned new designs into responsive, production-ready components",
      "Worked with the design and frontend teams inside an existing consumer codebase",
    ],
    outcome: "New designs shipped as responsive, production-ready components.",
    stack: ["React", "Responsive UI"],
    preview: "streaming",
    confidential: false,
    color: "#8E5A86",
  },
  {
    id: "travel",
    title: "Travel Website",
    client: "VIDYAOne IT Solution",
    category: "Performance + SEO",
    year: "2025",
    role: "Development & testing intern",
    summary: "A responsive travel website, tuned with Lighthouse audits for better performance and SEO.",
    challenge: "A travel site needs to load fast on mobile and be easy to find in search.",
    contributions: ["Built the site mobile-first for phones and desktops", "Ran Lighthouse performance and SEO audits and shipped the fixes"],
    outcome: "Better Lighthouse performance and SEO scores after the audits and fixes.",
    stack: ["HTML/CSS", "JavaScript", "Lighthouse", "SEO"],
    preview: "travel",
    confidential: false,
    color: "#3F7FAD",
  },
];

export const experience: Job[] = [
  {
    role: "Software Developer (Frontend)",
    company: "NovoStack Pvt. Ltd.",
    short: "NovoStack",
    location: "Noida",
    start: "Apr 2025",
    end: "Present",
    current: true,
    type: "Full-time",
    points: [
      "Ship responsive web apps in React, Next.js and TypeScript for 4 client products, owning features from requirements to production.",
      "Built a reusable component library with Tailwind CSS and ShadCN UI, shared across every client project.",
      "Integrate REST APIs with Axios, including JWT authentication and role-based access control.",
      "Work with designers, backend developers and clients to deliver pixel-accurate interfaces and fix production bugs.",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "RBAC"],
  },
  {
    role: "Software Development & Testing Intern",
    company: "VIDYAOne IT Solution Pvt. Ltd.",
    short: "VIDYAOne",
    location: "Lucknow",
    start: "Jan 2025",
    end: "Mar 2025",
    type: "Internship",
    points: [
      "Built a responsive travel website optimised for mobile and desktop.",
      "Ran Lighthouse performance and SEO audits and implemented the fixes.",
    ],
    tags: ["Lighthouse", "SEO", "Responsive"],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Hungama Digital Media Entertainment",
    short: "Hungama",
    location: "Noida",
    start: "Jun 2024",
    end: "Sep 2024",
    type: "Internship",
    points: [
      "Contributed to the UI redesign of Hungama's music and video streaming platform.",
      "Converted new designs into responsive, production-ready components.",
    ],
    tags: ["React", "UI redesign"],
  },
];

export const process = [
  { title: "Understand", text: "Clarify requirements with clients and designers before writing a line of code, so the build starts from the right problem." },
  { title: "Build", text: "Compose screens from reusable, typed components that hold up on every screen size, from phones to wide desktops." },
  { title: "Connect", text: "Wire up REST APIs, JWT authentication and role-based access so every type of user sees exactly what they should." },
  { title: "Ship & tune", text: "Release to production, fix bugs fast, and audit performance and SEO with Lighthouse." },
];

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL", "Java"] },
  { title: "Frontend", items: ["React.js", "Next.js", "Redux Toolkit", "React Hooks", "Tailwind CSS", "ShadCN UI"] },
  { title: "APIs & Data", items: ["REST APIs", "Axios", "JWT Auth", "RBAC", "Prisma ORM", "PostgreSQL"] },
  { title: "Performance & Tools", items: ["Lighthouse", "SEO", "Git & GitHub", "Postman", "Vercel", "VS Code"] },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Dronacharya College of Engineering, Gurugram",
  years: "2021 – 2025",
};

export const certifications = [
  { name: "Java Full Stack Development Training", date: "Sep 2023" },
  { name: "Data Science in Python, NPTEL", date: "Mar 2024" },
  { name: "oneAPI Workshop, Intel", date: "Apr 2023" },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
