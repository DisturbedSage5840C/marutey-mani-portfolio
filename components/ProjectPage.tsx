"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/lib/projects";

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  backend: { color: "#a855f7", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.25)" },
  frontend: { color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.25)" },
  ml:       { color: "#f4866a", bg: "rgba(244,134,106,0.08)", border: "rgba(244,134,106,0.25)" },
  db:       { color: "#7dd4fc", bg: "rgba(125,212,252,0.08)", border: "rgba(125,212,252,0.25)" },
  infra:    { color: "#b8a0f0", bg: "rgba(184,160,240,0.08)", border: "rgba(184,160,240,0.25)" },
  mobile:   { color: "#6ee7b7", bg: "rgba(110,231,183,0.08)", border: "rgba(110,231,183,0.25)" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay } }),
};

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <main className="min-h-screen" style={{ background: "var(--c-bg, #080808)", color: "var(--c-text, #f8f8f8)" }}>

      {/* ── Hero header ── */}
      <div
        className="relative border-b px-6 pb-16 pt-28 tb:px-16"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {/* Gradient orb */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 600, height: 300,
            background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-200"
          style={{ color: "rgba(248,248,248,0.4)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a855f7")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,248,248,0.4)")}
        >
          ← Back to Projects
        </Link>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: {} }}
        >
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em]"
            style={{ color: "#a855f7" }}
          >
            <span>Project {project.number}</span>
            <span style={{ width: "3rem", height: 1, background: "rgba(168,85,247,0.4)", display: "inline-block" }} />
            <span style={{ color: "rgba(248,248,248,0.3)" }}>v{project.version}</span>
          </motion.div>

          <motion.h1
            custom={0.08}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-5 font-bold leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #f8f8f8 30%, rgba(168,85,247,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {project.name}
            </span>
          </motion.h1>

          <motion.p
            custom={0.16}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-8 max-w-[70ch] text-[1.1rem] italic leading-relaxed"
            style={{ color: "rgba(248,248,248,0.5)" }}
          >
            {project.tagline}
          </motion.p>

          <motion.div custom={0.22} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-all duration-200"
              style={{
                background: "rgba(168,85,247,0.12)",
                borderColor: "rgba(168,85,247,0.4)",
                color: "#a855f7",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(168,85,247,0.2)";
                e.currentTarget.style.borderColor = "#a855f7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(168,85,247,0.12)";
                e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)";
              }}
            >
              View on GitHub ↗
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="grid border-b"
        style={{
          gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`,
          gap: 1,
          background: "rgba(255,255,255,0.06)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        {project.stats.map((stat, i) => (
          <motion.div
            key={`stat-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-7"
            style={{ background: "var(--c-bg, #080808)" }}
          >
            <div
              className="mb-1 font-bold leading-none"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                background: "linear-gradient(135deg, #a855f7, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em]" style={{ color: "rgba(248,248,248,0.38)" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Problem / Solution / Architecture ── */}
      <div className="grid gap-0 border-b md:grid-cols-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {/* Left col: problem + solution */}
        <div className="border-r px-8 py-14 tb:px-14" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.22em]" style={{ color: "#a855f7" }}>
              The Problem
            </div>
            <p className="text-[0.97rem] leading-[1.9]" style={{ color: "rgba(248,248,248,0.58)" }}>
              {project.problem}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.22em]" style={{ color: "#22d3ee" }}>
              The Solution
            </div>
            <p className="text-[0.97rem] leading-[1.9]" style={{ color: "rgba(248,248,248,0.58)" }}>
              {project.solution}
            </p>
          </motion.div>
        </div>

        {/* Right col: architecture */}
        <div className="px-8 py-14 tb:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.22em]" style={{ color: "#b8a0f0" }}>
              Architecture
            </div>
            <p className="text-[0.97rem] leading-[1.9]" style={{ color: "rgba(248,248,248,0.58)" }}>
              {project.architecture}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Key Features ── */}
      <div className="border-b px-8 py-16 tb:px-14" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="mb-8 font-mono text-[0.62rem] uppercase tracking-[0.22em]" style={{ color: "#a855f7" }}>
          Key Features
        </div>
        <div
          className="grid gap-px"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", background: "rgba(255,255,255,0.06)" }}
        >
          {project.features.map((f, i) => (
            <motion.div
              key={`feat-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="p-7"
              style={{ background: "var(--c-bg, #080808)" }}
            >
              <div
                className="mb-2 text-[0.95rem] font-semibold leading-snug"
                style={{ color: "#f8f8f8" }}
              >
                {f.title}
              </div>
              <p className="text-[0.83rem] leading-[1.8]" style={{ color: "rgba(248,248,248,0.5)" }}>
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div className="border-b px-8 py-16 tb:px-14" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="mb-6 font-mono text-[0.62rem] uppercase tracking-[0.22em]" style={{ color: "#a855f7" }}>
          Tech Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => {
            const c = categoryColors[t.category] ?? categoryColors.infra;
            return (
              <motion.span
                key={`tech-${i}`}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.025 }}
                viewport={{ once: true }}
                className="rounded-full border px-3.5 py-1.5 font-mono text-[0.62rem] tracking-[0.06em]"
                style={{ color: c.color, background: c.bg, borderColor: c.border }}
              >
                {t.label}
              </motion.span>
            );
          })}
        </div>

        {/* Category legend */}
        <div className="mt-8 flex flex-wrap gap-5">
          {Object.entries(categoryColors).map(([cat, c]) => (
            <span key={cat} className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.14em]" style={{ color: "rgba(248,248,248,0.3)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, display: "inline-block" }} />
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div
        className="flex items-center justify-between px-8 py-7 tb:px-14"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Link
          href="/#projects"
          className="font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-200"
          style={{ color: "rgba(248,248,248,0.38)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f8f8f8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,248,248,0.38)")}
        >
          ← All Projects
        </Link>
        <Link
          href="/#contact"
          className="font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-200"
          style={{ color: "#a855f7" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#22d3ee")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a855f7")}
        >
          Get in Touch →
        </Link>
      </div>
    </main>
  );
}
