"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { experienceData, experienceItems } from "@/lib/data";
import { fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RoleColors = {
  badge: string;
  border: string;
};

const roleColors: Record<string, RoleColors> = {
  University: { badge: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200", border: "#8b5cf6" },
  Internship: { badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", border: "#3b82f6" },
  NGO: { badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", border: "#22c55e" },
  Founder: { badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200", border: "#f59e0b" },
  Social: { badge: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200", border: "#ec4899" },
  "Student Role": { badge: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200", border: "#8b5cf6" },
};

export default function Experience() {
  const reducedMotion = useReducedMotion();
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const observers: IntersectionObserver[] = [];
    const cards = cardRefs.current;

    cards.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (!entry.isIntersecting) return;

          gsap.fromTo(
            card,
            { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.12,
            }
          );

          observer.disconnect();
        },
        { threshold: 0.25 }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      cards.forEach((card) => {
        if (card) gsap.killTweensOf(card);
      });
    };
  }, [reducedMotion]);

  return (
    <section id={experienceData.id} className="bg-surface px-6 py-28 tb:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
          <span>{experienceData.tag}</span>
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
          {experienceData.headingStart}
          <br />
          <em className="not-italic text-muted">{experienceData.headingEmphasis}</em>
        </motion.h2>

        <div className="mt-16 flex flex-col">
          {experienceItems.map((item, index) => {
            const palette = roleColors[item.category] ?? {
              badge: "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200",
              border: "#71717a",
            };

            return (
              <article
                key={`${item.org}-${item.role}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="grid grid-cols-[220px_1fr] gap-12 border-t border-border py-10 max-[899px]:grid-cols-1 max-[899px]:gap-5"
                style={{
                  borderLeft: `3px solid ${palette.border}`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-4px)";
                  event.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="pl-5">
                  <div className="mb-1 text-[0.9rem] font-bold text-text">{item.org}</div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">{item.period}</div>
                  <span
                    className={`mt-2.5 inline-block rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] ${palette.badge}`}
                  >
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="mb-4 font-serif text-3xl font-normal">{item.role}</h3>
                  <ul className="space-y-2 pl-4 text-[0.9rem] leading-[1.8] text-muted marker:text-muted">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
          <div className="border-b border-border" />
        </div>
      </div>
    </section>
  );
}
