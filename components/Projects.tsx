"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projectItems, projectsData } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Projects() {
  return (
    <motion.section
      id={projectsData.id}
      className="mx-auto max-w-[1400px] px-6 py-28 tb:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
        <span>{projectsData.tag}</span>
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
        {projectsData.headingStart}
        <br />
        <em className="not-italic text-muted">{projectsData.headingEmphasis}</em>
      </motion.h2>

      <p className="mb-16 mt-8 max-w-[60ch] text-[1.05rem] text-muted">{projectsData.intro}</p>

      <motion.div
        className="grid grid-cols-2 gap-px bg-border max-[899px]:grid-cols-1"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projectItems.map((project, index) => (
          <motion.div key={project.number} custom={index * 0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link href={`/projects/${project.slug}`} className="block">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="proj-card depth-hover relative bg-bg p-10 transition-colors duration-200 hover:bg-surface2"
              >
                <div className="mb-6 font-mono text-[0.65rem] tracking-[0.15em] text-muted">{project.number}</div>
                <h3 className="mb-4 font-serif text-[1.8rem] font-normal leading-[1.2]">{project.name}</h3>
                <p className="mb-6 text-[0.88rem] leading-[1.75] text-muted">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item, chipIndex) => (
                    <motion.span
                      key={`${project.number}-${item.label}`}
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2, delay: chipIndex * 0.01 }}
                      className={`border px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.08em] ${
                        item.accent ? "border-sage/40 text-sage" : "border-border text-muted"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "2.5rem",
                    right: "2.5rem",
                    fontFamily: "IBM Plex Mono",
                    fontSize: "0.7rem",
                    color: "#c8a96e",
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                  className="proj-arrow"
                >
                  → View Project
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
