"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { heroData } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroSphere = dynamic(() => import("@/components/three/HeroSphere"), { ssr: false });

function countUp(el: HTMLElement, target: number, decimals = 0, duration = 1200) {
  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = (eased * target).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const subheadingRef = useRef<HTMLParagraphElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const statRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!nameRef.current || !subheadingRef.current) return;

    const chars = Array.from(nameRef.current.querySelectorAll("span[data-char='true']"));

    if (reducedMotion) {
      gsap.set(chars, { y: 0, opacity: 1, rotateX: 0 });
      gsap.set(subheadingRef.current, { clipPath: "inset(0 0% 0 0)" });
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      chars,
      { y: 100, opacity: 0, rotateX: -90, transformOrigin: "50% 50% -20px" },
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.025, ease: "expo.out", delay: 1.6 }
    ).fromTo(
      subheadingRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.inOut", delay: -0.6 }
    );

    return () => {
      tl.kill();
      gsap.killTweensOf(chars);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    if (reducedMotion) {
      if (statRefs.current[0]) statRefs.current[0].textContent = "9";
      if (statRefs.current[1]) statRefs.current[1].textContent = "2";
      if (statRefs.current[2]) statRefs.current[2].textContent = "96.75";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        if (statRefs.current[0]) countUp(statRefs.current[0], 9, 0);
        if (statRefs.current[1]) countUp(statRefs.current[1], 2, 0);
        if (statRefs.current[2]) countUp(statRefs.current[2], 96.75, 2);

        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const fullName = `${heroData.firstName} ${heroData.lastName}`;

  return (
    <section
      ref={heroRef}
      id={heroData.id}
      className="relative z-[1] flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-24 tb:px-12"
      onMouseMove={(event) => {
        if (!glareRef.current || !heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        glareRef.current.style.background = `radial-gradient(circle 400px at ${x}px ${y}px, rgba(124, 58, 237, 0.07), transparent 70%)`;
      }}
    >
      <HeroSphere />
      <div ref={glareRef} className="pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
          <span className="h-px w-10 bg-gold" />
          <span>{heroData.eyebrow}</span>
        </div>

        <h1 ref={nameRef} className="mb-8 text-[clamp(3.5rem,10vw,9rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
          {fullName.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              data-char="true"
              className={`inline-block ${char === " " ? "w-[0.32em]" : ""} ${char.includes("M") || char.includes("a") || char.includes("n") || char.includes("i") || char.includes(".") ? "" : ""}`}
              style={char === "M" || (index > fullName.indexOf(" ") && char !== " ") ? {
                background: "linear-gradient(135deg, #a855f7, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              } : undefined}
            >
              {char}
            </span>
          ))}
        </h1>

        <p ref={subheadingRef} className="mb-12 max-w-[520px] text-lg leading-[1.75] text-[rgba(248,248,248,0.55)]">
          {heroData.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {heroData.ctas.map((cta) => (
            <div key={cta.label} className="p-[120px] -m-[120px]">
              <a
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                data-hover="true"
                onMouseMove={(event) => {
                  const btn = event.currentTarget;
                  const rect = btn.getBoundingClientRect();
                  const cx = rect.left + rect.width / 2;
                  const cy = rect.top + rect.height / 2;
                  const dx = (event.clientX - cx) * 0.38;
                  const dy = (event.clientY - cy) * 0.38;
                  gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={(event) => {
                  gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
                }}
                className={`inline-flex items-center justify-center px-8 py-3.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                  cta.variant === "primary" ? "bg-gold text-bg hover:opacity-85" : "border border-border text-text hover:border-muted"
                }`}
              >
                {cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-20 right-12 hidden flex-col gap-8 text-right tb:flex">
        {heroData.stats.map((stat, index) => {
          const suffix = stat.value.replace(/[0-9.]/g, "");
          return (
            <div key={stat.label}>
              <div className="font-mono text-5xl leading-none text-gold">
                <span
                  ref={(node) => {
                    statRefs.current[index] = node;
                  }}
                >
                  0
                </span>
                {suffix}
              </div>
              <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
