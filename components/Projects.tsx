"use client";

import Link from "next/link";
import gsap from "gsap";
import { useRef } from "react";
import { projectItems, projectsData } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
      rotateX: rx,
      rotateY: ry,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
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
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 10,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
        delay: i * 0.03,
      });
    });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
    });

    const glare = event.currentTarget.querySelector<HTMLElement>(".glare");
    if (glare) gsap.to(glare, { opacity: 0, duration: 0.3 });

    const tags = event.currentTarget.querySelectorAll<HTMLElement>(".tech-tag");
    gsap.to(tags, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <section id={projectsData.id} className="relative z-[1] mx-auto max-w-[1400px] px-6 py-28 tb:px-12">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#a855f7]">{projectsData.tag}</div>
      <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[#f8f8f8]">
        {projectsData.headingStart} <em className="not-italic bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">{projectsData.headingEmphasis}</em>
      </h2>
      <p className="mb-16 mt-8 max-w-[60ch] text-[1.05rem] text-[rgba(248,248,248,0.55)]">{projectsData.intro}</p>

      <div className="grid grid-cols-2 gap-6 max-[899px]:grid-cols-1">
        {projectItems.map((project, index) => (
          <div key={project.number}>
            <Link href={`/projects/${project.slug}`} className="block" data-hover="true">
              <div
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden rounded-[20px] border border-white/10 p-8"
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
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />
                <div
                  className="mb-3 font-mono"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.15))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.number}
                </div>
                <h3 className="mb-3 text-3xl font-semibold text-[#f8f8f8]">{project.name}</h3>
                <p className="mb-5 text-sm leading-7 text-[rgba(248,248,248,0.6)]">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item.label}
                      className="tech-tag rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-[rgba(248,248,248,0.7)]"
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
    </section>
  );
}
