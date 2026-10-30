import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/instrument-serif/400.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { profile } from "@/data/portfolio";

const description =
  "Kashish Goel is a Frontend Developer with 2+ years of experience building production web apps with React, Next.js and TypeScript.";

export const metadata: Metadata = {
  // TODO: replace with your deployed URL
  metadataBase: new URL("https://kashish998.github.io"),
  title: `${profile.name} | ${profile.role}`,
  description,
  keywords: ["Kashish Goel", "Frontend Developer", "React", "Next.js", "TypeScript", "Noida", "Portfolio"],
  authors: [{ name: profile.name }],
  openGraph: { title: `${profile.name} | ${profile.role}`, description, type: "website" },
  twitter: { card: "summary", title: `${profile.name} | ${profile.role}`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0F" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
