"use client";

import { useEffect, useRef } from "react";
import { researchData, researchItems } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Research() {
  const reducedMotion = useReducedMotion();
  const titleRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const rowRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = rowRefs.current.findIndex((row) => row === entry.target);
          if (index === -1) return;

          const titleEl = titleRefs.current[index];
          const item = researchItems[index];
          if (!titleEl || !item) return;

          if (reducedMotion) {
            titleEl.textContent = item.title;
            return;
          }

          const fullText = item.title;
          let i = 0;
          window.setTimeout(() => {
            const interval = window.setInterval(() => {
              if (!titleEl) {
                window.clearInterval(interval);
                return;
              }
              titleEl.textContent = fullText.slice(0, ++i);
              if (i >= fullText.length) window.clearInterval(interval);
            }, 28);
          }, index * 200);

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    rowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id={researchData.id} className="relative z-[1] bg-transparent px-6 py-28 tb:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#a855f7]">{researchData.tag}</div>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[#f8f8f8]">
          {researchData.headingStart} <em className="not-italic bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">{researchData.headingEmphasis}</em>
        </h2>

        <div className="mt-14 space-y-5">
          {researchItems.map((item, index) => {
            const isPublished = item.status === "Published";
            const isOngoing = item.status === "Ongoing";

            return (
              <article
                key={item.title}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                className="flex items-start justify-between gap-8 rounded-2xl border border-white/10 px-6 py-5 max-[899px]:flex-col"
                style={
                  isPublished
                    ? {
                        border: "1px solid rgba(34, 197, 94, 0.25)",
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.08), 0 0 60px rgba(34, 197, 94, 0.04)",
                      }
                    : isOngoing
                      ? { animation: "shimmer-border 3s ease-in-out infinite" }
                      : undefined
                }
              >
                <div>
                  {item.link ? (
                    <a href={item.link} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} data-hover="true">
                      <h3
                        ref={(node) => {
                          titleRefs.current[index] = node;
                        }}
                        className="max-w-[60ch] text-[1.2rem] font-medium text-[#f8f8f8]"
                      >
                        {item.title}
                      </h3>
                    </a>
                  ) : (
                    <h3
                      ref={(node) => {
                        titleRefs.current[index] = node;
                      }}
                      className="max-w-[60ch] text-[1.2rem] font-medium text-[#f8f8f8]"
                    >
                      {item.title}
                    </h3>
                  )}
                  {item.meta ? <p className="mt-1 font-mono text-xs tracking-[0.08em] text-[rgba(248,248,248,0.5)]">{item.meta}</p> : null}
                </div>
                <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-[rgba(248,248,248,0.75)]">
                  {isPublished ? <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#22c55e", marginRight: 8, animation: "pulse-green 1.5s ease-in-out infinite" }} /> : null}
                  {item.status}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
