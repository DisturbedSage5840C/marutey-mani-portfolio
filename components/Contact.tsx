"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { contactData } from "@/lib/data";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
  createdAt: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
};

const COLORS = ["#a78bfa", "#22d3ee", "#ec4899"];

export default function Contact() {
  const headingWords = useMemo(() => `${contactData.headingStart} ${contactData.headingEmphasis}`.split(" "), []);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const idRef = useRef(0);

  const pushTrail = (x: number, y: number) => {
    idRef.current += 1;
    const now = Date.now();
    setTrail((prev) => [...prev, { id: idRef.current, x, y, createdAt: now }].slice(-8));

    window.setTimeout(() => {
      setTrail((prev) => prev.filter((p) => p.id !== idRef.current));
    }, 500);
  };

  const spawnBurst = (x: number, y: number) => {
    const created = Array.from({ length: 10 }, (_, index) => ({
      id: Date.now() + index,
      x,
      y,
      angle: (Math.PI * 2 * index) / 10,
      distance: 40 + Math.random() * 40,
    }));

    setBursts((prev) => [...prev, ...created]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((item) => !created.some((n) => n.id === item.id)));
    }, 620);
  };

  return (
    <section
      id={contactData.id}
      className="relative mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center border-t border-border px-6 py-28 tb:px-12"
      onMouseMove={(event) => pushTrail(event.clientX, event.clientY)}
      onClick={(event) => spawnBurst(event.clientX, event.clientY)}
    >
      <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
        <span>{contactData.tag}</span>
        <span className="h-px w-16 bg-border" />
      </div>

      <h2 className="mb-12 font-serif text-[clamp(3rem,7vw,8rem)] italic leading-[0.95] tracking-[-0.02em]">
        {headingWords.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="mr-3 inline-block"
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      <div className="flex flex-wrap gap-4">
        {contactData.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface/60 font-mono text-xs uppercase tracking-[0.12em] text-muted transition duration-300 hover:text-gold"
            data-cursor="hover"
            onMouseMove={(event) => {
              const node = event.currentTarget;
              const rect = node.getBoundingClientRect();
              const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.4;
              const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.4;
              node.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.1)`;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transition = "transform 0.4s ease";
              event.currentTarget.style.transform = "translate3d(0,0,0) scale(1)";
            }}
            aria-label={link.label}
            title={link.label}
          >
            <span className="text-center text-[0.5rem] leading-tight">{link.label}</span>
          </a>
        ))}
      </div>

      {trail.map((point, index) => (
        <span
          key={point.id}
          className="pointer-events-none fixed z-40 h-1.5 w-1.5 rounded-full"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            backgroundColor: COLORS[index % COLORS.length],
            animation: "trail-fade 500ms ease forwards",
          }}
        />
      ))}

      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="pointer-events-none fixed z-40 h-1.5 w-1.5 rounded-full bg-white"
          style={{
            left: burst.x - 3,
            top: burst.y - 3,
            transform: `translate(${Math.cos(burst.angle) * burst.distance}px, ${Math.sin(burst.angle) * burst.distance}px)`,
            animation: "burst-fade 600ms ease forwards",
          }}
        />
      ))}
    </section>
  );
}
