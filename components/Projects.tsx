"use client";

import { motion } from "framer-motion";
import { projectItems, projectsData } from "@/lib/data";
import { fadeUp, sectionTagSlide, staggerContainer } from "@/lib/motion";

export default function Projects() {
  return (
    <motion.section
      id={projectsData.id}
      className="mx-auto max-w-[1400px] px-6 py-28 tb:px-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
    >
      <motion.div
        variants={sectionTagSlide}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold"
      >
        <span>{projectsData.tag}</span>
        <span className="h-px w-16 bg-border" />
      </motion.div>

      <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.02em]">
        {projectsData.headingStart}
        <br />
        <em className="not-italic text-muted">{projectsData.headingEmphasis}</em>
      </h2>

      <p className="mb-16 mt-8 max-w-[60ch] text-[1.05rem] text-muted">{projectsData.intro}</p>

      <motion.div
        className="grid grid-cols-2 gap-px bg-border max-[899px]:grid-cols-1"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projectItems.map((project) => (
          <motion.article
            key={project.number}
            variants={fadeUp}
            className="bg-bg p-10 transition-colors duration-200 hover:bg-surface2"
          >
            <div className="mb-6 font-mono text-[0.65rem] tracking-[0.15em] text-muted">{project.number}</div>
            <h3 className="mb-4 font-serif text-[1.8rem] font-normal leading-[1.2]">{project.name}</h3>
            <p className="mb-6 text-[0.88rem] leading-[1.75] text-muted">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={`${project.number}-${item.label}`}
                  className={`border px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.08em] ${
                    item.accent ? "border-sage/40 text-sage" : "border-border text-muted"
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
