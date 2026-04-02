"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/lib/projects";

const categoryColors: Record<string, string> = {
  backend: "#c8a96e",
  frontend: "#7b9e87",
  ml: "#b06060",
  db: "#8888c8",
  infra: "#888680",
  mobile: "#a8b87b",
};

export default function ProjectPage({ project }: { project: Project }) {
  return (
    <main style={{ background: "#0a0a0a", color: "#f0ece4", minHeight: "100vh" }}>
      <div style={{ padding: "6rem 3rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link
          href="/#projects"
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#888680",
            textDecoration: "none",
            display: "block",
            transition: "color 0.2s",
            marginBottom: "3rem",
          }}
        >
          ← Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingBottom: "4rem" }}
        >
          <div
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
            <span>Project {project.number}</span>
            <span
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,0.08)",
                maxWidth: "4rem",
                display: "inline-block",
              }}
            />
          </div>
          <h1
            style={{
              fontFamily: "DM Serif Display",
              fontSize: "clamp(3rem, 7vw, 7rem)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            {project.name}
          </h1>
          <p
            style={{
              fontFamily: "DM Serif Display",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 400,
              color: "#888680",
              fontStyle: "italic",
              maxWidth: "70ch",
              marginBottom: "2.5rem",
            }}
          >
            {project.tagline}
          </p>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.85rem 2rem",
              background: "#c8a96e",
              color: "#0a0a0a",
              fontFamily: "IBM Plex Mono",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            View on GitHub →
          </a>
        </motion.div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${project.stats.length}, 1fr)`,
          gap: "1px",
          background: "rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {project.stats.map((stat, i) => (
          <motion.div
            key={`${stat.label}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.6 }}
            style={{ background: "#0a0a0a", padding: "2rem 2.5rem" }}
          >
            <div style={{ fontFamily: "DM Serif Display", fontSize: "2.2rem", color: "#c8a96e", lineHeight: 1 }}>
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#888680",
                marginTop: "0.4rem",
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ padding: "5rem 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: "0.75rem",
              }}
            >
              The Problem
            </div>
            <p style={{ color: "#888680", lineHeight: 1.85, fontSize: "1rem", marginBottom: "3rem" }}>{project.problem}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c8a96e",
                marginBottom: "0.75rem",
              }}
            >
              The Solution
            </div>
            <p style={{ color: "#888680", lineHeight: 1.85, fontSize: "1rem" }}>{project.solution}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c8a96e",
              marginBottom: "0.75rem",
            }}
          >
            Architecture
          </div>
          <p style={{ color: "#888680", lineHeight: 1.85, fontSize: "1rem" }}>{project.architecture}</p>
        </motion.div>
      </div>

      <div style={{ padding: "0 3rem 5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c8a96e",
            padding: "3rem 0 2.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          Key Features
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.08)" }}>
          {project.features.map((f, i) => (
            <motion.div
              key={`${f.title}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              viewport={{ once: true }}
              style={{ background: "#0a0a0a", padding: "2rem" }}
            >
              <div style={{ fontFamily: "DM Serif Display", fontSize: "1.15rem", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                {f.title}
              </div>
              <p style={{ fontSize: "0.85rem", color: "#888680", lineHeight: 1.75 }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 3rem 6rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c8a96e",
            padding: "3rem 0 2rem",
          }}
        >
          Tech Stack
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.tech.map((t, i) => (
            <motion.span
              key={`${t.label}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                padding: "0.35rem 0.75rem",
                border: `1px solid ${categoryColors[t.category]}44`,
                color: categoryColors[t.category],
              }}
            >
              {t.label}
            </motion.span>
          ))}
        </div>
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
          href="/#projects"
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#888680",
            textDecoration: "none",
          }}
        >
          ← All Projects
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