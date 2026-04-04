"use client";

import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { projectItems, projectsData } from "@/lib/data";
import { projects } from "@/lib/projects";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RepoStats = {
  stars: number;
  pushedAt: string;
};

function extractRepoPath(url: string): string | null {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
}

function daysAgo(date: string): string {
  const then = new Date(date).getTime();
  const now = Date.now();
  const diff = Math.max(1, Math.round((now - then) / (1000 * 60 * 60 * 24)));
  return `Updated ${diff} days ago`;
}

export default function Projects() {
  const reducedMotion = useReducedMotion();

  const [repoStats, setRepoStats] = useState<Record<string, RepoStats | null>>({});
  const [loadingRepos, setLoadingRepos] = useState<Record<string, boolean>>({});

  const detailBySlug = useMemo(() => Object.fromEntries(projects.map((project) => [project.slug, project])), []);

  useEffect(() => {
    const fetchRepo = async (repoPath: string, slug: string) => {
      const cacheKey = `repo-stats-${repoPath}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setRepoStats((prev) => ({ ...prev, [slug]: JSON.parse(cached) as RepoStats }));
        return;
      }

      setLoadingRepos((prev) => ({ ...prev, [slug]: true }));
      try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (!res.ok) throw new Error("repo request failed");
        const data = (await res.json()) as { stargazers_count?: number; pushed_at?: string };
        if (!data.pushed_at) throw new Error("missing pushed_at");

        const value: RepoStats = {
          stars: data.stargazers_count ?? 0,
          pushedAt: data.pushed_at,
        };
        sessionStorage.setItem(cacheKey, JSON.stringify(value));
        setRepoStats((prev) => ({ ...prev, [slug]: value }));
      } catch {
        setRepoStats((prev) => ({ ...prev, [slug]: null }));
      } finally {
        setLoadingRepos((prev) => ({ ...prev, [slug]: false }));
      }
    };

    projectItems.forEach((project) => {
      const detail = detailBySlug[project.slug];
      if (!detail?.github) return;
      const repoPath = extractRepoPath(detail.github);
      if (!repoPath) return;
      fetchRepo(repoPath, project.slug);
    });
  }, [detailBySlug]);

  const handleCardMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((event.clientX - cx) / (rect.width / 2)) * 12;
    const ry = ((event.clientY - cy) / (rect.height / 2)) * 12;

    card.style.transform = `perspective(1000px) rotateX(${-ry}deg) rotateY(${rx}deg) scale(1.02)`;

    const overlay = card.querySelector<HTMLElement>("[data-specular='true']");
    if (overlay) {
      const edgeX = Math.abs((event.clientX - cx) / (rect.width / 2));
      const edgeY = Math.abs((event.clientY - cy) / (rect.height / 2));
      const edgeMix = Math.min(1, (edgeX + edgeY) / 2);
      overlay.style.opacity = `${0.12 * edgeMix}`;
    }
  };

  const handleCardEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const tags = event.currentTarget.querySelectorAll<HTMLElement>("[data-tech='true']");
    tags.forEach((tag, index) => {
      gsap.to(tag, {
        x: gsap.utils.random(-8, 8),
        y: gsap.utils.random(-6, 6),
        duration: 0.3,
        delay: index * 0.03,
        ease: "elastic.out(1,0.3)",
      });
    });
  };

  const handleCardLeave = (event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

    const overlay = card.querySelector<HTMLElement>("[data-specular='true']");
    if (overlay) overlay.style.opacity = "0";

    const tags = card.querySelectorAll<HTMLElement>("[data-tech='true']");
    gsap.to(tags, { x: 0, y: 0, duration: 0.3, ease: "elastic.out(1,0.3)" });
  };

  return (
    <motion.section
      id={projectsData.id}
      className="mx-auto max-w-[1400px] px-6 py-28 tb:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
        <span>{projectsData.tag}</span>
        <span className="h-px w-16 bg-border" />
      </div>

      <motion.h2
        className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.02em]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        custom={0}
        variants={fadeUp}
      >
        {projectsData.headingStart}
        <br />
        <em className="not-italic text-muted">{projectsData.headingEmphasis}</em>
      </motion.h2>

      <p className="mb-16 mt-8 max-w-[60ch] text-[1.05rem] text-muted">{projectsData.intro}</p>

      <motion.div
        className="grid grid-cols-2 gap-px bg-border max-[899px]:grid-cols-1"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projectItems.map((project, index) => {
          const stat = repoStats[project.slug];
          const loading = Boolean(loadingRepos[project.slug]);

          return (
            <motion.div key={project.number} custom={index * 0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link href={`/projects/${project.slug}`} className="block" data-cursor="hover">
                <article
                  className="proj-card relative overflow-hidden bg-bg p-10 transition-colors duration-200 hover:bg-surface2"
                  onMouseMove={handleCardMove}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                  data-cursor="hover"
                >
                  <div data-specular="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity" style={{
                    background: "linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                  }} />

                  <motion.div
                    className="mb-6 font-mono text-[0.65rem] tracking-[0.15em] text-muted"
                    initial={{ opacity: 0.1, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.number}
                  </motion.div>

                  {loading ? (
                    <div className="absolute right-4 top-4 h-10 w-36 animate-pulse rounded bg-white/10" />
                  ) : stat ? (
                    <div className="absolute right-4 top-4 rounded bg-black/40 px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white">
                      <div>★ {stat.stars}</div>
                      <div className="mt-1 text-white/80">{daysAgo(stat.pushedAt)}</div>
                    </div>
                  ) : null}

                  <h3 className="mb-4 font-serif text-[1.8rem] font-normal leading-[1.2]">{project.name}</h3>
                  <p className="mb-6 text-[0.88rem] leading-[1.75] text-muted">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={`${project.number}-${item.label}`}
                        data-tech="true"
                        className={`border px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.08em] transition-transform ${
                          item.accent ? "border-sage/40 text-sage" : "border-border text-muted"
                        }`}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <div className="proj-arrow absolute bottom-10 right-10 font-mono text-[0.7rem] text-gold opacity-0 transition-opacity">→ View Project</div>
                </article>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
