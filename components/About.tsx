"use client";

import Image from "next/image";
import gsap from "gsap";
import { useRef } from "react";
import { aboutData } from "@/lib/data";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function About() {
  const reducedMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id={aboutData.id} className="relative z-[1] mx-auto grid max-w-[1400px] grid-cols-[40fr_25fr_35fr] gap-12 px-6 py-28 max-[899px]:grid-cols-1 tb:px-12">
      <div>
        <RevealOnScroll variant="clip">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#a855f7]">{aboutData.tag}</div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[#f8f8f8]">
            {aboutData.headingStart} <em className="not-italic bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">{aboutData.headingEmphasis}</em>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll variant="fade" delay={0.05}>
          <div className="mt-8 space-y-6 text-[1.05rem] leading-[1.85] text-[rgba(248,248,248,0.6)]">
            {aboutData.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </RevealOnScroll>

        <div className="mt-12 flex flex-wrap gap-3">
          {aboutData.skills.flatMap((skill, idx) =>
            skill.items.split("·").map((item, j) => (
              <RevealOnScroll key={`${skill.label}-${item.trim()}`} variant="fade" delay={(idx + j) * 0.03}>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[rgba(248,248,248,0.75)] backdrop-blur-sm transition-all duration-200 hover:border-[rgba(168,85,247,0.4)] hover:bg-[rgba(124,58,237,0.1)]">
                  {item.trim()}
                </span>
              </RevealOnScroll>
            ))
          )}
        </div>
      </div>

      <div className="relative max-[899px]:order-first">
        <RevealOnScroll variant="fade">
          <div
            ref={photoRef}
            className="relative overflow-hidden rounded-2xl border border-[rgba(124,58,237,0.3)]"
            style={{
              boxShadow: "0 0 30px rgba(124, 58, 237, 0.15), 0 0 80px rgba(6, 182, 212, 0.08)",
              transformStyle: "preserve-3d",
            }}
            onMouseMove={(event) => {
              if (reducedMotion) return;
              const el = event.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              const rx = ((y - rect.height / 2) / rect.height) * -12;
              const ry = ((x - rect.width / 2) / rect.width) * 12;
              gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
            }}
            onMouseEnter={() => {
              if (reducedMotion || !shineRef.current) return;
              gsap.fromTo(shineRef.current, { backgroundPositionX: "-100%" }, { backgroundPositionX: "200%", duration: 0.6, ease: "power2.out" });
            }}
            onMouseLeave={(event) => {
              gsap.to(event.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
            }}
          >
            <div className="relative aspect-[3/4]">
              <Image src="/images/marutey_photo.jpg" alt="Marutey Mani" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
              <div
                ref={shineRef}
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
                  backgroundPositionX: "-100%",
                }}
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <div className="space-y-1">
        {aboutData.infoRows.map((row, i) => (
          <RevealOnScroll key={row.label} variant="fade" delay={i * 0.08}>
            <div className="flex items-center justify-between gap-6 border-b border-white/10 py-4 text-[0.9rem] max-[599px]:flex-col max-[599px]:items-start">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[rgba(248,248,248,0.5)]">{row.label}</span>
              <span className="text-right text-[#f8f8f8] max-[599px]:text-left">
                {row.href ? (
                  <a href={row.href} target={row.external ? "_blank" : undefined} rel={row.external ? "noopener noreferrer" : undefined} data-hover="true" className="text-[#a855f7] hover:underline">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
