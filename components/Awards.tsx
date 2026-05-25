"use client";

import { motion } from "framer-motion";
import { awardItems, awardsData } from "@/lib/data";

export default function Awards() {
  return (
    <section
      id={awardsData.id}
      className="relative z-[1] px-6 py-28 tb:px-12"
      style={{ background: "rgba(255,255,255,0.018)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="mb-3 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#a855f7]">
            <span>{awardsData.tag}</span>
            <span className="h-px w-14 bg-[rgba(168,85,247,0.35)]" />
          </div>

          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[#f8f8f8]">
            {awardsData.headingStart}
            <br />
            <em className="not-italic bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent">
              {awardsData.headingEmphasis}
            </em>
          </h2>
        </motion.div>

        <div className="mt-14">
          {awardItems.map((award, index) => (
            <motion.article
              key={award.name}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group flex items-center justify-between gap-8 border-t py-5 max-[599px]:flex-col max-[599px]:items-start"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <p className="flex-1 text-[0.97rem] text-[#f8f8f8] transition-colors duration-200 group-hover:text-[rgba(248,248,248,0.8)]">
                {award.name}
              </p>
              <span className="whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-colors duration-200 group-hover:text-[#22d3ee]" style={{ color: "#a855f7" }}>
                {award.mark}
              </span>
            </motion.article>
          ))}
          <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }} />
        </div>
      </div>
    </section>
  );
}
