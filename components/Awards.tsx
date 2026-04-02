"use client";

import { motion } from "framer-motion";
import { awardItems, awardsData } from "@/lib/data";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations";

export default function Awards() {
  return (
    <motion.section
      id={awardsData.id}
      className="bg-surface px-6 py-28 tb:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
          <span>{awardsData.tag}</span>
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
          {awardsData.headingStart}
          <br />
          <em className="not-italic text-muted">{awardsData.headingEmphasis}</em>
        </motion.h2>

        <motion.div
          className="mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {awardItems.map((award, index) => (
            <motion.article
              key={award.name}
              custom={index * 0.04}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-between gap-8 border-t border-border py-4 max-[599px]:flex-col max-[599px]:items-start"
            >
              <p className="flex-1 text-[0.95rem] text-text">{award.name}</p>
              <span className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.1em] text-gold">
                {award.mark}
              </span>
            </motion.article>
          ))}
          <div className="border-b border-border" />
        </motion.div>
      </div>
    </motion.section>
  );
}
