"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { showcaseCategories, showcaseItems } from "@/lib/showcase";

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-15%"]);

  const filtered =
    activeCategory === "all" ? showcaseItems : showcaseItems.filter((item) => item.category === activeCategory);

  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  return (
    <main ref={containerRef} style={{ background: "#0a0a0a", color: "#f0ece4", minHeight: "100vh" }}>
      <div style={{ padding: "8rem 3rem 0", overflow: "hidden" }}>
        <motion.div style={{ y: heroY }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c8a96e",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span>Showcase</span>
            <span
              style={{ width: "4rem", height: "1px", background: "rgba(255,255,255,0.08)", display: "inline-block" }}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "DM Serif Display",
              fontSize: "clamp(4rem, 10vw, 11rem)",
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              marginBottom: "4rem",
            }}
          >
            The
            <br />
            <em style={{ fontStyle: "italic", color: "#888680" }}>work.</em>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            display: "flex",
            gap: "0",
            marginBottom: "0",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            overflowX: "auto",
          }}
        >
          {[{ id: "all", label: "All Work" }, ...showcaseCategories].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "1.1rem 1.75rem",
                fontFamily: "IBM Plex Mono",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                color: activeCategory === cat.id ? "#c8a96e" : "#888680",
                cursor: "pointer",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
                position: "relative",
              }}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="cat-indicator"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#c8a96e",
                  }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      <div style={{ padding: "3rem 3rem 6rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", alignItems: "start" }}
          >
            {[col1, col2, col3].map((col, colIdx) => (
              <div key={colIdx} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.map((item, itemIdx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: itemIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                  >
                    <div
                      style={{
                        aspectRatio: item.aspectRatio,
                        background: "#111111",
                        border: "1px solid rgba(255,255,255,0.06)",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                        boxShadow: hoveredItem === item.id ? "0 20px 50px rgba(0,0,0,0.35)" : "none",
                        borderColor: hoveredItem === item.id ? "rgba(200,169,110,0.35)" : "rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: `repeating-linear-gradient(
                            45deg, rgba(255,255,255,0.02) 0px,
                            rgba(255,255,255,0.02) 1px,
                            transparent 1px, transparent 20px
                          )`,
                        }}
                      />

                      <div
                        style={{
                          fontFamily: "IBM Plex Mono",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(200,169,110,0.4)",
                          zIndex: 1,
                        }}
                      >
                        {item.type === "video" ? "▶ Video" : "◻ Image"} · Placeholder
                      </div>

                      <motion.div
                        animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(10,10,10,0.75)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "DM Serif Display",
                            fontSize: "1.1rem",
                            textAlign: "center",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: "0.62rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#c8a96e",
                          }}
                        >
                          {showcaseCategories.find((c) => c.id === item.category)?.label}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "6rem 0",
              fontFamily: "IBM Plex Mono",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              color: "#888680",
            }}
          >
            No items in this category yet.
          </div>
        )}
      </div>

      <div
        style={{
          padding: "2rem 3rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#888680",
            textDecoration: "none",
          }}
        >
          ← Back Home
        </Link>
        <Link
          href="/#contact"
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c8a96e",
            textDecoration: "none",
          }}
        >
          Get in Touch →
        </Link>
      </div>
    </main>
  );
}