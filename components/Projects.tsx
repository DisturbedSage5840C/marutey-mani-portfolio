"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { projectItems, projectsData } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, ease: "expo.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [reducedMotion]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -18;
    const ry = ((x - rect.width / 2) / rect.width) * 18;
    gsap.to(event.currentTarget, {
      rotateX: rx, rotateY: ry, scale: 1.025,
      duration: 0.4, ease: "power2.out", transformPerspective: 1000,
    });
    const glare = event.currentTarget.querySelector<HTMLElement>(".glare");
    if (glare) {
      gsap.to(glare, {
        opacity: 0.14,
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.28), transparent 60%)`,
        duration: 0.2,
      });
    }
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const tags = event.currentTarget.querySelectorAll<HTMLElement>(".tech-tag");
    tags.forEach((tag, i) => {
      gsap.to(tag, {
        x: (Math.random() - 0.5) * 14, y: (Math.random() - 0.5) * 8,
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

  return (
    <section ref={sectionRef} id={projectsData.id} className="relative z-[1] mx-auto max-w-[1400px] px-6 py-28 tb:px-12">
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

      <div className="grid grid-cols-2 gap-6 max-[899px]:grid-cols-1">
        {projectItems.map((project, index) => (
          <div
            key={project.number}
            style={{ opacity: 0 }}
            ref={(node) => { cardRefs.current[index] = node; }}
          >
            <Link href={`/projects/${project.slug}`} className="block" data-hover="true">
              <div
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden rounded-[20px] p-8 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transformStyle: "preserve-3d",
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                  minHeight: 360,
                }}
              >
                <div
                  className="glare"
                  style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    opacity: 0, pointerEvents: "none", zIndex: 10,
                  }}
                />

                {/* Number watermark */}
                <div
                  className="absolute right-4 bottom-4 font-mono font-black leading-none select-none"
                  style={{
                    fontSize: "clamp(6rem, 11vw, 10rem)",
                    background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.06))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.04em",
                    pointerEvents: "none",
                    zIndex: 0,
                    lineHeight: 1,
                  }}
                >
                  {project.number}
                </div>

                <span
                  className="absolute right-6 top-6 text-[rgba(248,248,248,0.3)] transition-all duration-300"
                  style={{ fontSize: "1.15rem", zIndex: 2 }}
                >
                  ↗
                </span>

                <div className="relative z-[2]">
                  <div className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#a855f7]">
                    Project {project.number}
                  </div>
                  <h3 className="mb-3 text-[1.45rem] font-bold leading-tight text-[#f8f8f8]">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-sm leading-[1.8] text-[rgba(248,248,248,0.58)]">
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
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
