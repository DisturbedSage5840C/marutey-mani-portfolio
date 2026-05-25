"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { showcaseCategories, showcaseItems } from "@/lib/showcase";

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "all"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === activeCategory);

  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  return (
    <main className="min-h-screen" style={{ background: "var(--c-bg, #080808)", color: "var(--c-text, #f8f8f8)" }}>

      {/* ── Header ── */}
      <div ref={headerRef} className="px-6 pb-0 pt-28 tb:px-14">

        {/* Gradient orb */}
        <div
          className="pointer-events-none absolute left-1/3 top-0"
          style={{
            width: 500, height: 280,
            background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-3 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.22em]"
          style={{ color: "#a855f7" }}
        >
          <span>Showcase</span>
          <span style={{ width: "3rem", height: 1, background: "rgba(168,85,247,0.35)", display: "inline-block" }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 font-bold leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
        >
          The{" "}
          <em
            className="not-italic"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            work.
          </em>
        </motion.h1>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65 }}
          className="flex overflow-x-auto border-t border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)", gap: 0 }}
        >
          {[{ id: "all", label: "All Work" }, ...showcaseCategories].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className="relative shrink-0 border-r px-6 py-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-200"
              style={{
                background: "none",
                border: "none",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                color: activeCategory === cat.id ? "#a855f7" : "rgba(248,248,248,0.38)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="cat-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "#a855f7" }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Grid ── */}
      <div className="px-6 py-10 tb:px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", alignItems: "start" }}
          >
            {[col1, col2, col3].map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-3">
                {col.map((item, itemIdx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: itemIdx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative overflow-hidden"
                    style={{ cursor: "pointer" }}
                  >
                    <a
                      href={item.href}
                      target={item.href ? "_blank" : undefined}
                      rel={item.href ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      <div
                        className="relative flex items-center justify-center overflow-hidden"
                        style={{
                          aspectRatio: item.aspectRatio,
                          background: "rgba(255,255,255,0.025)",
                          border: hoveredItem === item.id
                            ? "1px solid rgba(168,85,247,0.35)"
                            : "1px solid rgba(255,255,255,0.07)",
                          borderRadius: "12px",
                          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                          boxShadow: hoveredItem === item.id
                            ? "0 20px 50px rgba(124,58,237,0.15)"
                            : "none",
                        }}
                      >
                        {/* Subtle grid pattern */}
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `repeating-linear-gradient(
                              45deg, rgba(255,255,255,0.015) 0px,
                              rgba(255,255,255,0.015) 1px,
                              transparent 1px, transparent 24px
                            )`,
                            borderRadius: "12px",
                          }}
                        />

                        <div className="z-[1] font-mono text-[0.58rem] uppercase tracking-[0.15em]" style={{ color: "rgba(168,85,247,0.35)" }}>
                          {item.type === "video" ? "▶ Video" : item.type === "document" ? "▣ Document" : "◻ Image"} · Placeholder
                        </div>

                        {/* Hover overlay */}
                        <motion.div
                          animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                          transition={{ duration: 0.22 }}
                          className="absolute inset-0 flex flex-col items-center justify-center p-6"
                          style={{ background: "rgba(8,8,8,0.82)", borderRadius: "12px" }}
                        >
                          <div className="mb-2 text-center text-[0.95rem] font-semibold leading-snug text-[#f8f8f8]">
                            {item.title}
                          </div>
                          <div className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#a855f7]">
                            {showcaseCategories.find((c) => c.id === item.category)?.label}
                          </div>
                        </motion.div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-24 text-center font-mono text-[0.72rem] uppercase tracking-[0.12em]" style={{ color: "rgba(248,248,248,0.3)" }}>
            No items in this category yet.
          </div>
        )}
      </div>
    </main>
  );
}
