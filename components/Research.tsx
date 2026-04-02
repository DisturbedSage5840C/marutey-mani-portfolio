"use client";

import { motion } from "framer-motion";
import { researchData, researchItems } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Research() {
  return (
    <motion.section
      id={researchData.id}
      className="bg-surface px-6 py-28 tb:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
          <span>{researchData.tag}</span>
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
          {researchData.headingStart}
          <br />
          <em className="not-italic text-muted">{researchData.headingEmphasis}</em>
        </motion.h2>

        <motion.div
          className="mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {researchItems.map((item, index) => (
            <motion.article
              key={item.title}
              custom={index * 0.08}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-start justify-between gap-12 border-t border-border py-7 max-[899px]:flex-col max-[899px]:gap-4"
            >
              <div>
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="transition-colors duration-200 hover:text-gold"
                  >
                    <h3 className="max-w-[60ch] font-serif text-[1.2rem] font-normal">{item.title}</h3>
                  </a>
                ) : (
                  <h3 className="max-w-[60ch] font-serif text-[1.2rem] font-normal">{item.title}</h3>
                )}
                {item.meta ? (
                  <p className="mt-1.5 font-mono text-[0.65rem] tracking-[0.08em] text-muted">{item.meta}</p>
                ) : null}
              </div>
              <span
                className={`mt-1 shrink-0 whitespace-nowrap border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] ${
                  item.status === "Published"
                    ? "border-sage text-sage"
                    : item.status === "Complete"
                      ? "border-gold text-gold"
                      : "border-border text-muted"
                }`}
              >
                {item.status}
              </span>
            </motion.article>
          ))}
          <div className="border-b border-border" />
        </motion.div>
      </div>
    </motion.section>
  );
}
