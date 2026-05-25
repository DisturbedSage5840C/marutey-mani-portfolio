"use client";

import { motion } from "framer-motion";
import { leadershipData, leadershipItems } from "@/lib/data";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
};

export default function Leadership() {
  return (
    <section
      id={leadershipData.id}
      className="relative z-[1] mx-auto max-w-[1400px] px-6 py-28 tb:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="mb-3 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#a855f7]">
          <span>{leadershipData.tag}</span>
          <span className="h-px w-14 bg-[rgba(168,85,247,0.35)]" />
        </div>

        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[#f8f8f8]">
          {leadershipData.headingStart}
          <br />
          <em className="not-italic bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
            {leadershipData.headingEmphasis}
          </em>
        </h2>

        <p className="mb-14 mt-8 max-w-[58ch] text-[1rem] leading-relaxed text-[rgba(248,248,248,0.52)]">
          {leadershipData.intro}
        </p>
      </motion.div>

      <div
        className="grid grid-cols-3 gap-px max-[899px]:grid-cols-2 max-[599px]:grid-cols-1"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        {leadershipItems.map((item, i) => (
          <motion.article
            key={item.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden p-7 transition-colors duration-300"
            style={{ background: "var(--c-bg, #080808)" }}
            whileHover={{ scale: 1.015 }}
          >
            {/* Hover accent line */}
            <div
              className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-[#a855f7] to-[#22d3ee] transition-transform duration-500 group-hover:scale-y-100"
            />
            <div className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#a855f7]">
              {item.label}
            </div>
            <h3 className="mb-1.5 text-[1.1rem] font-semibold leading-snug text-[#f8f8f8]">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-[rgba(248,248,248,0.48)]">{item.subtitle}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
