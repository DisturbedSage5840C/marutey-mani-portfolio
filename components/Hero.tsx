"use client";

import gsap from "gsap";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroData } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroCanvas = dynamic(() => import("@/components/ui/HeroCanvas"), { ssr: false });

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const nameRef = useRef<HTMLSpanElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || !nameRef.current) return;

    const chars = Array.from(nameRef.current.querySelectorAll<HTMLElement>("span[data-char='true']"));

    const timer = window.setTimeout(() => {
      gsap.fromTo(
        chars,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          ease: "back.out(1.7)",
          duration: 0.8,
        }
      );
    }, 300);

    return () => {
      window.clearTimeout(timer);
      gsap.killTweensOf(chars);
    };
  }, [reducedMotion]);

  const fullName = `${heroData.firstName} ${heroData.lastName}`;
  const chars = reducedMotion ? [fullName] : fullName.split("");

  return (
    <section
      id={heroData.id}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-24 tb:px-12"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        setMouse({ x: x * 2 - 1, y: y * 2 - 1 });
      }}
      style={{
        ["--mx" as string]: "50%",
        ["--my" as string]: "50%",
      }}
    >
      <HeroCanvas mouse={mouse} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle 300px at var(--mx, 50%) var(--my, 50%), rgba(167,139,250,0.08), transparent 70%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="glow-orb absolute right-[15%] top-[18%] h-64 w-64 rounded-full bg-gold/40"
        animate={{ opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="glow-orb sage absolute left-[10%] top-[32%] h-52 w-52 rounded-full bg-sage/35"
        animate={{ opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 8.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute left-0 top-[8vh] select-none whitespace-nowrap font-serif text-[clamp(8rem,18vw,22rem)] leading-none text-white/5">
        {heroData.ghostText}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]" onMouseMove={(event) => {
        const sectionRect = event.currentTarget.getBoundingClientRect();
        const mx = event.clientX - sectionRect.left;
        const my = event.clientY - sectionRect.top;
        event.currentTarget.parentElement?.style.setProperty("--mx", `${mx}px`);
        event.currentTarget.parentElement?.style.setProperty("--my", `${my}px`);
      }}>
        <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
          <span className="h-px w-10 bg-gold" />
          <span>{heroData.eyebrow}</span>
        </div>

        <h1 className="mb-8 font-serif text-[clamp(3.5rem,8vw,9rem)] leading-[0.92] tracking-[-0.02em]">
          <span ref={nameRef} className="inline-block [perspective:800px]" data-cursor="text">
            {chars.map((char, index) => (
              <span
                key={`${char}-${index}`}
                data-char={!reducedMotion ? "true" : undefined}
                className={`inline-block ${char === " " ? "w-[0.35em]" : ""} ${char.includes(".") ? "text-gold" : ""}`}
                style={{ opacity: reducedMotion ? 1 : 0 }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p className="mb-12 max-w-[52ch] text-lg leading-[1.75] text-muted">{heroData.description}</p>

        <div className="flex flex-wrap items-center gap-4">
          {heroData.ctas.map((cta) => {
            const shared =
              "cta-shimmer inline-flex items-center justify-center px-8 py-3.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300";

            return (
              <motion.a
                key={cta.label}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                data-cursor="hover"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                onMouseMove={(event) => {
                  const button = event.currentTarget;
                  const rect = button.getBoundingClientRect();
                  const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.35;
                  const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.35;
                  button.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transition = "transform 0.4s ease";
                  event.currentTarget.style.transform = "translate3d(0,0,0)";
                }}
                className={
                  cta.variant === "primary"
                    ? `${shared} bg-gold text-bg hover:opacity-85`
                    : `${shared} border border-border text-text hover:border-muted`
                }
              >
                {cta.label}
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-20 right-12 hidden flex-col gap-8 text-right max-[899px]:hidden tb:flex">
        {heroData.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-serif text-5xl leading-none text-gold">{stat.value}</div>
            <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
