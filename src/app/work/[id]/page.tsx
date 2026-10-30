import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, profile } from "@/data/portfolio";
import { Navbar } from "@/components/navbar";
import { CaseStudy } from "@/components/case-study";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = projects.find((x) => x.id === params.id);
  if (!p) return {};
  return {
    title: `${p.title} | ${profile.name}`,
    description: `${p.title} for ${p.client}: ${p.summary}`,
  };
}

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const index = projects.findIndex((p) => p.id === params.id);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main>
        <CaseStudy project={project} next={next} index={index} />
      </main>
    </>
  );
}
