import ProjectPage from "@/components/ProjectPage";
import { getAllSlugs, getProject } from "@/lib/projects";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return {};

  return {
    title: `${project.name} — Marutey Mani`,
    description: project.tagline,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return <ProjectPage project={project} />;
}