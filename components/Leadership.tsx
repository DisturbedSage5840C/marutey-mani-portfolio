"use client";

import { motion } from "framer-motion";
import { leadershipData, leadershipItems } from "@/lib/data";
import { fadeUp, sectionTagSlide, staggerContainer } from "@/lib/motion";

export default function Leadership() {
  return (
    <motion.section
      id={leadershipData.id}
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
        <span>{leadershipData.tag}</span>
        <span className="h-px w-16 bg-border" />
      </motion.div>

      <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.02em]">
        {leadershipData.headingStart}
        <br />
        <em className="not-italic text-muted">{leadershipData.headingEmphasis}</em>
      </h2>

      <p className="mb-14 mt-8 max-w-[60ch] text-muted">{leadershipData.intro}</p>

      <motion.div
        className="grid grid-cols-3 gap-px bg-border max-[899px]:grid-cols-2 max-[599px]:grid-cols-1"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {leadershipItems.map((item) => (
          <motion.article key={item.title} variants={fadeUp} className="bg-bg p-7">
            <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-gold">{item.label}</div>
            <h3 className="mb-1.5 font-serif text-xl font-normal">{item.title}</h3>
            <p className="text-sm text-muted">{item.subtitle}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
