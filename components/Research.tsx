"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { researchData, researchItems } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Research() {
  const reducedMotion = useReducedMotion();
  const [typedTitles, setTypedTitles] = useState<string[]>(researchItems.map(() => ""));
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setTypedTitles(researchItems.map((item) => item.title));
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        observer.disconnect();

        const typeItem = (itemIndex: number, charIndex = 0) => {
          if (cancelled || itemIndex >= researchItems.length) return;
          const full = researchItems[itemIndex].title;

          if (charIndex <= full.length) {
            setTypedTitles((prev) => {
              const next = [...prev];
              next[itemIndex] = full.slice(0, charIndex);
              return next;
            });

            window.setTimeout(() => typeItem(itemIndex, charIndex + 1), 40);
            return;
          }

          typeItem(itemIndex + 1, 0);
        };

        typeItem(0, 0);
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [reducedMotion]);

  return (
    <motion.section
      id={researchData.id}
      ref={sectionRef}
      className="bg-surface px-6 py-28 tb:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
          <span>{researchData.tag}</span>
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
          {researchData.headingStart}
          <br />
          <em className="not-italic text-muted">{researchData.headingEmphasis}</em>
        </motion.h2>

        <motion.div className="mt-14" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {researchItems.map((item, index) => {
            const isPublished = item.status === "Published";
            const isOngoing = item.status === "Ongoing";
            const shownTitle = reducedMotion ? item.title : typedTitles[index] || "";

            return (
              <motion.article
                key={item.title}
                custom={index * 0.08}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative flex items-start justify-between gap-12 border-t border-border py-7 max-[899px]:flex-col max-[899px]:gap-4"
                style={
                  isPublished
                    ? {
                        border: "1px solid rgba(34,197,94,0.3)",
                        boxShadow: "0 0 12px rgba(34,197,94,0.1)",
                        animation: "published-glow 3s ease-in-out infinite",
                      }
                    : undefined
                }
              >
                {isOngoing ? <div className="pointer-events-none absolute inset-x-0 bottom-2 h-2 overflow-hidden opacity-15"><div className="h-full w-1/2 animate-[shimmer_1.8s_linear_infinite] bg-gradient-to-r from-transparent via-white to-transparent" /></div> : null}

                <div>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="transition-colors duration-200 hover:text-gold"
                      data-cursor="hover"
                    >
                      <h3 className="max-w-[60ch] font-serif text-[1.2rem] font-normal">
                        {shownTitle}
                        {!reducedMotion && shownTitle.length < item.title.length ? <span className="ml-1 inline-block h-[1em] w-px animate-pulse bg-current align-middle" /> : null}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="max-w-[60ch] font-serif text-[1.2rem] font-normal">
                      {shownTitle}
                      {!reducedMotion && shownTitle.length < item.title.length ? <span className="ml-1 inline-block h-[1em] w-px animate-pulse bg-current align-middle" /> : null}
                    </h3>
                  )}
                  {item.meta ? <p className="mt-1.5 font-mono text-[0.65rem] tracking-[0.08em] text-muted">{item.meta}</p> : null}
                </div>
                <span
                  className={`mt-1 shrink-0 whitespace-nowrap border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] ${
                    item.status === "Published"
                      ? "border-sage text-sage"
                      : item.status === "Complete"
                        ? "border-gold text-gold"
                        : "border-border text-muted"
                  }`}
                >
                  {isPublished ? <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-[pulse-soft_1.5s_infinite]" /> : null}
                  {item.status}
                </span>
              </motion.article>
            );
          })}
          <div className="border-b border-border" />
        </motion.div>
      </div>
    </motion.section>
  );
}
