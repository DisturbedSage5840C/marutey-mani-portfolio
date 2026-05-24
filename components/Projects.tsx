"use client";

import Link from "next/link";
import gsap from "gsap";
import { useRef } from "react";
import { projectItems, projectsData } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AGENT_TYPES = [
  { label: "Research", color: "#b8a0f0" },
  { label: "Code",     color: "#7dd4fc" },
  { label: "Analysis", color: "#e8c97c" },
  { label: "Writer",   color: "#f4866a" },
];

const PIPELINE_STAGES = [
  { label: "Orchestration",       sub: "Intake · Planner · Router" },
  { label: "Execution Pool",      sub: "4 agent types · parallel DAG" },
  { label: "Validation & QA",     sub: "Fact-Check · Critic · Safety" },
  { label: "Optimization",        sub: "Refine · Compress · Format" },
];

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -20;
    const ry = ((x - rect.width / 2) / rect.width) * 20;
    gsap.to(event.currentTarget, {
      rotateX: rx, rotateY: ry, scale: 1.02,
      duration: 0.4, ease: "power2.out", transformPerspective: 1000,
    });
    const glare = event.currentTarget.querySelector<HTMLElement>(".glare");
    if (glare) {
      gsap.to(glare, {
        opacity: 0.12,
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 60%)`,
        duration: 0.2,
      });
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const tags = event.currentTarget.querySelectorAll<HTMLElement>(".tech-tag");
    tags.forEach((tag, i) => {
      gsap.to(tag, {
        x: (Math.random() - 0.5) * 16, y: (Math.random() - 0.5) * 10,
        duration: 0.4, ease: "elastic.out(1, 0.4)", delay: i * 0.03,
      });
    });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.7, ease: "elastic.out(1, 0.6)",
    });
    const glare = event.currentTarget.querySelector<HTMLElement>(".glare");
    if (glare) gsap.to(glare, { opacity: 0, duration: 0.3 });
    const tags = event.currentTarget.querySelectorAll<HTMLElement>(".tech-tag");
    gsap.to(tags, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  const regularProjects = projectItems.slice(0, 2);
  const featuredProject = projectItems[2]; // AMATE

  return (
    <section id={projectsData.id} className="relative z-[1] mx-auto max-w-[1400px] px-6 py-28 tb:px-12">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#a855f7]">
        {projectsData.tag}
      </div>
      <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[#f8f8f8]">
        {projectsData.headingStart}{" "}
        <em className="not-italic bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
          {projectsData.headingEmphasis}
        </em>
      </h2>
      <p className="mb-16 mt-8 max-w-[60ch] text-[1.05rem] text-[rgba(248,248,248,0.55)]">
        {projectsData.intro}
      </p>

      {/* ── Standard 2-col grid for first two projects ── */}
      <div className="grid grid-cols-2 gap-6 max-[899px]:grid-cols-1">
        {regularProjects.map((project, index) => (
          <div key={project.number}>
            <Link href={`/projects/${project.slug}`} className="block" data-hover="true">
              <div
                ref={(node) => { cardRefs.current[index] = node; }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden rounded-[20px] border p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transformStyle: "preserve-3d",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div
                  className="glare"
                  style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    opacity: 0, pointerEvents: "none", zIndex: 10,
                  }}
                />
                {/* Arrow */}
                <span
                  className="absolute right-6 top-6 text-[rgba(248,248,248,0.35)] transition-all duration-300"
                  style={{ fontSize: "1.15rem" }}
                >
                  ↗
                </span>

                <div
                  className="mb-3 font-mono"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800,
                    background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.13))",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.number}
                </div>
                <h3 className="mb-3 text-[1.4rem] font-bold leading-tight text-[#f8f8f8]">
                  {project.name}
                </h3>
                <p className="mb-5 text-sm leading-[1.75] text-[rgba(248,248,248,0.6)]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item.label}
                      className={`tech-tag rounded-full border px-3 py-1 font-mono text-[0.62rem] ${
                        item.accent
                          ? "border-[rgba(168,85,247,0.4)] text-[#a855f7]"
                          : "border-white/10 text-[rgba(248,248,248,0.7)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ── AMATE — full-width featured card ── */}
      {featuredProject && (
        <div className="mt-6">
          <Link href={`/projects/${featuredProject.slug}`} className="block" data-hover="true">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden rounded-[20px] p-8 tb:p-10"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.09) 0%, rgba(6,182,212,0.04) 60%, rgba(0,0,0,0) 100%)",
                border: "1px solid rgba(124,58,237,0.22)",
                transformStyle: "preserve-3d",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <div
                className="glare"
                style={{
                  position: "absolute", inset: 0, borderRadius: "20px",
                  opacity: 0, pointerEvents: "none", zIndex: 10,
                }}
              />

              {/* Arrow */}
              <span
                className="absolute right-8 top-8 text-[rgba(168,85,247,0.5)] transition-all duration-300"
                style={{ fontSize: "1.15rem" }}
              >
                ↗
              </span>

              <div className="grid grid-cols-[1fr_300px] gap-12 max-[899px]:grid-cols-1 max-[899px]:gap-8">
                {/* ── Left: project info ── */}
                <div>
                  <div
                    className="mb-2 font-mono"
                    style={{
                      fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800,
                      background: "linear-gradient(135deg, rgba(124,58,237,0.28), rgba(6,182,212,0.22))",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {featuredProject.number}
                  </div>

                  {/* Badge */}
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(124,58,237,0.35)] bg-[rgba(124,58,237,0.08)] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#a855f7]">
                    <span
                      style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "#a855f7", display: "inline-block",
                        animation: "pulse-green 1.8s ease-in-out infinite",
                      }}
                    />
                    Multi-Agent AI System · 15 Agent Prompts
                  </div>

                  <h3 className="mb-3 text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-tight text-[#f8f8f8]">
                    {featuredProject.name}
                  </h3>
                  <p className="mb-6 max-w-[72ch] text-sm leading-[1.8] text-[rgba(248,248,248,0.6)]">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.stack.map((item) => (
                      <span
                        key={item.label}
                        className={`tech-tag rounded-full border px-3 py-1 font-mono text-[0.62rem] ${
                          item.accent
                            ? "border-[rgba(168,85,247,0.4)] text-[#a855f7]"
                            : "border-white/10 text-[rgba(248,248,248,0.7)]"
                        }`}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Right: architecture overview ── */}
                <div className="flex flex-col gap-5">
                  {/* Pipeline stages */}
                  <div>
                    <div className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[rgba(248,248,248,0.35)]">
                      Pipeline Architecture
                    </div>
                    <div className="flex flex-col gap-2">
                      {PIPELINE_STAGES.map((stage, i) => (
                        <div key={stage.label} className="flex items-start gap-3">
                          <div
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[rgba(124,58,237,0.3)] font-mono text-[0.5rem] text-[#a855f7]"
                          >
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-[0.8rem] font-semibold text-[#f8f8f8]">
                              {stage.label}
                            </div>
                            <div className="font-mono text-[0.58rem] text-[rgba(248,248,248,0.38)]">
                              {stage.sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Execution agents */}
                  <div className="border-t border-white/[0.07] pt-4">
                    <div className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[rgba(248,248,248,0.35)]">
                      Execution Agents
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {AGENT_TYPES.map((agent) => (
                        <span
                          key={agent.label}
                          className="rounded-full px-2.5 py-0.5 font-mono text-[0.6rem]"
                          style={{
                            border: `1px solid ${agent.color}55`,
                            color: agent.color,
                            background: `${agent.color}0d`,
                          }}
                        >
                          {agent.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quality gate metric */}
                  <div
                    className="rounded-xl border px-4 py-3"
                    style={{
                      border: "1px solid rgba(34,211,238,0.2)",
                      background: "rgba(34,211,238,0.04)",
                    }}
                  >
                    <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[rgba(34,211,238,0.55)]">
                      Quality Gate Threshold
                    </div>
                    <div
                      className="my-1 font-mono font-bold leading-none text-[#22d3ee]"
                      style={{ fontSize: "1.8rem" }}
                    >
                      ≥ 0.80
                    </div>
                    <div className="font-mono text-[0.55rem] text-[rgba(248,248,248,0.35)]">
                      Composite score — Fact-Check 30% · Critic 40% · Safety 30%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}
