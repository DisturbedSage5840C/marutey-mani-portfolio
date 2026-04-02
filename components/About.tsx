"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import { fadeUp, sectionTagSlide, staggerContainer } from "@/lib/motion";

export default function About() {
  return (
    <motion.section
      id={aboutData.id}
      className="mx-auto grid max-w-[1400px] grid-cols-2 gap-24 px-6 py-28 max-[899px]:grid-cols-1 max-[899px]:gap-12 tb:px-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div>
        <motion.div
          variants={sectionTagSlide}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold"
        >
          <span>{aboutData.tag}</span>
          <span className="h-px w-16 bg-border" />
        </motion.div>

        <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.02em]">
          {aboutData.headingStart}
          <br />
          <em className="not-italic text-muted">{aboutData.headingEmphasis}</em>
        </h2>

        <div className="mt-8 space-y-6 text-[1.05rem] leading-[1.85] text-muted">
          {aboutData.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-px bg-border max-[599px]:grid-cols-1"
        >
          {aboutData.skills.map((skill) => (
            <motion.div key={skill.label} variants={fadeUp} className="bg-bg p-5">
              <div className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-gold">{skill.label}</div>
              <div className="text-sm text-muted">{skill.items}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="pt-14 max-[899px]:pt-0"
      >
        {aboutData.infoRows.map((row) => (
          <motion.div
            key={row.label}
            variants={fadeUp}
            className="flex items-center justify-between gap-6 border-b border-border py-4 text-[0.9rem] max-[599px]:flex-col max-[599px]:items-start"
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">{row.label}</span>
            <span className="text-right text-text max-[599px]:text-left">
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="text-gold hover:underline"
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
