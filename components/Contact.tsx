"use client";

import { motion } from "framer-motion";
import { contactData } from "@/lib/data";
import { fadeUp, sectionTagSlide, staggerContainer } from "@/lib/motion";

export default function Contact() {
  return (
    <motion.section
      id={contactData.id}
      className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center border-t border-border px-6 py-28 tb:px-12"
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
        <span>{contactData.tag}</span>
        <span className="h-px w-16 bg-border" />
      </motion.div>

      <h2 className="mb-12 font-serif text-[clamp(3rem,7vw,8rem)] italic leading-[0.95] tracking-[-0.02em]">
        {contactData.headingStart}
        <br />
        <em className="not-italic text-muted">{contactData.headingEmphasis}</em>
      </h2>

      <motion.div
        className="flex flex-wrap gap-x-8 gap-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {contactData.links.map((link) => (
          <motion.a
            key={link.label}
            variants={fadeUp}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-gold"
          >
            <span aria-hidden="true">→</span>
            <span>{link.label}</span>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
