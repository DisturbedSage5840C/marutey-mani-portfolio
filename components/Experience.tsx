"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { experienceData, experienceItems } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type BadgeStyle = {
  background: string;
  color: string;
  border: string;
};

const badgeMap: Record<string, BadgeStyle> = {
  University:     { background: "rgba(124,58,237,0.15)",  color: "#a78bfa", border: "rgba(124,58,237,0.3)" },
  Internship:     { background: "rgba(6,182,212,0.15)",   color: "#67e8f9", border: "rgba(6,182,212,0.3)" },
  NGO:            { background: "rgba(16,185,129,0.15)",  color: "#6ee7b7", border: "rgba(16,185,129,0.3)" },
  Founder:        { background: "rgba(245,158,11,0.15)",  color: "#fcd34d", border: "rgba(245,158,11,0.3)" },
  Social:         { background: "rgba(236,72,153,0.15)",  color: "#f9a8d4", border: "rgba(236,72,153,0.3)" },
  "Student Role": { background: "rgba(124,58,237,0.15)",  color: "#a78bfa", border: "rgba(124,58,237,0.3)" },
};

function ExperienceCard({
  index, org, period, category, role, bullets,
}: {
  index: number; org: string; period: string;
  category: string; role: string; bullets: string[];
}) {
  const indexRef   = useRef<HTMLDivElement | null>(null);
  const cardRef    = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!indexRef.current || !cardRef.current) return;

    if (reducedMotion) {
      indexRef.current.textContent = String(index + 1).padStart(2, "0");
      return;
    }

    // Slide-in from right on scroll
    gsap.fromTo(
      cardRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.75, ease: "expo.out",
        delay: index * 0.06,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );

    // Number scramble
    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const padded = String(index + 1).padStart(2, "0");
        let counter = 0;
        const iv = window.setInterval(() => {
          if (!indexRef.current) return;
          indexRef.current.textContent = String(Math.floor(Math.random() * 99)).padStart(2, "0");
          if (counter++ > 15) {
            window.clearInterval(iv);
            if (indexRef.current) indexRef.current.textContent = padded;
          }
        }, 40);
      },
    });

    return () => { trigger.kill(); };
  }, [index, reducedMotion]);

  const badge = badgeMap[category] ?? {
    background: "rgba(255,255,255,0.08)", color: "#e5e5e5", border: "rgba(255,255,255,0.15)",
  };

  return (
    <article
      ref={cardRef}
      className="relative flex h-[480px] w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 p-7"
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)", opacity: 0 }}
      onMouseMove={(e) => {
        if (reducedMotion) return;
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const rx = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -18;
        const ry = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  18;
        gsap.to(el, { rotateX: rx, rotateY: ry, scale: 1.02, duration: 0.35, ease: "power2.out", transformPerspective: 1000 });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.55, ease: "power2.out" });
      }}
    >
      <div ref={indexRef} className="mb-4 shrink-0 font-mono text-xs tracking-[0.2em] text-[#a78bfa]">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="shrink-0 text-xl font-semibold text-[#f8f8f8]">{org}</h3>
      <p className="mt-1 shrink-0 font-mono text-xs uppercase tracking-[0.08em] text-[rgba(248,248,248,0.5)]">{period}</p>
      <span
        className="mt-3 inline-flex shrink-0 self-start rounded-full border px-3 py-1 text-xs font-semibold"
        style={{ background: badge.background, color: badge.color, borderColor: badge.border }}
      >
        {category}
      </span>
      <h4 className="mt-4 shrink-0 text-base font-medium text-[#f8f8f8]">{role}</h4>
      <ul
        className="mt-4 min-h-0 flex-1 space-y-2.5 overflow-y-auto text-[0.82rem] leading-[1.7] text-[rgba(248,248,248,0.65)]"
        style={{ scrollbarWidth: "none" }}
      >
        {bullets.map((bullet) => (
          <li key={bullet} className="relative pl-5">
            <span className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-[#a855f7]" />
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  const pinnedRef  = useRef<HTMLDivElement | null>(null);
  const railRef    = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !pinnedRef.current || !railRef.current) return;

    // Defer until layout is stable
    const id = window.setTimeout(() => {
      if (!pinnedRef.current || !railRef.current) return;

      const totalWidth = railRef.current.scrollWidth - window.innerWidth + 120;
      if (totalWidth <= 0) return;

      const tween = gsap.to(railRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: pinnedRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1.4,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, 150);

    return () => window.clearTimeout(id);
  }, [reducedMotion]);

  return (
    <section id={experienceData.id} className="relative z-[1] bg-transparent">
      <div ref={pinnedRef} className="flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-6 tb:px-12">
          <div className="mb-10">
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#a855f7]">{experienceData.tag}</div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[#f8f8f8]">
              {experienceData.headingStart}{" "}
              <em className="not-italic bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
                {experienceData.headingEmphasis}
              </em>
            </h2>
          </div>
          <div ref={railRef} className="flex gap-5" style={{ willChange: "transform" }}>
            {experienceItems.map((item, index) => (
              <ExperienceCard key={`${item.org}-${item.role}`} index={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
