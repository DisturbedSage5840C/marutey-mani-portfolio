"use client";

import { motion } from "framer-motion";
import { experienceData, experienceItems } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Experience() {
  return (
    <motion.section
      id={experienceData.id}
      className="bg-surface px-6 py-28 tb:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
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

        <motion.div
          className="mt-16 flex flex-col"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experienceItems.map((item, index) => (
            <motion.article
              key={`${item.org}-${item.role}`}
              custom={index * 0.06}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-[220px_1fr] gap-12 border-t border-border py-10 max-[899px]:grid-cols-1 max-[899px]:gap-5"
            >
              <div>
                <div className="mb-1 text-[0.9rem] font-bold text-text">{item.org}</div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">{item.period}</div>
                <span className="mt-2.5 inline-block border border-border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
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
            </motion.article>
          ))}
          <div className="border-b border-border" />
        </motion.div>
      </div>
    </motion.section>
  );
}
