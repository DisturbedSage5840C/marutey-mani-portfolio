"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function About() {
  return (
    <motion.section
      id={aboutData.id}
      className="mx-auto grid max-w-[1400px] grid-cols-[40fr_25fr_35fr] gap-12 px-6 py-28 max-[899px]:grid-cols-1 max-[899px]:gap-10 tb:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div>
        <div className="mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
          <span>{aboutData.tag}</span>
          <span className="h-px w-16 bg-border" />
        </div>

        <motion.h2
          className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.02em]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          {aboutData.headingStart}
          <br />
          <em className="not-italic text-muted">{aboutData.headingEmphasis}</em>
        </motion.h2>

        <div className="relative mb-8 mt-8 hidden max-[599px]:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] max-h-[380px] overflow-hidden">
              <Image
                src="/images/marutey_photo.jpg"
                alt="Marutey Mani"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 60%, #0a0a0a 100%)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#888680",
                marginTop: "0.75rem",
                textAlign: "center",
              }}
            >
              Plaksha University · 2026
            </p>
          </motion.div>
        </div>

        <div className="mt-8 space-y-6 text-[1.05rem] leading-[1.85] text-muted">
          {aboutData.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-px bg-border max-[599px]:grid-cols-1"
        >
          {aboutData.skills.map((skill) => (
            <motion.div
              key={skill.label}
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-bg p-5"
            >
              <div className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-gold">{skill.label}</div>
              <div className="text-sm text-muted">{skill.items}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative hidden max-[599px]:hidden max-[899px]:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-[3/4] max-h-[380px] overflow-hidden">
            <Image
              src="/images/marutey_photo.jpg"
              alt="Marutey Mani"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 60%, #0a0a0a 100%)",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#888680",
              marginTop: "0.75rem",
              textAlign: "center",
            }}
          >
            Plaksha University · 2026
          </p>
        </motion.div>
      </div>

      <div className="relative max-[899px]:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/marutey_photo.jpg"
              alt="Marutey Mani"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 60%, #0a0a0a 100%)",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#888680",
              marginTop: "0.75rem",
              textAlign: "center",
            }}
          >
            Plaksha University · 2026
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="pt-14 max-[899px]:pt-0"
      >
        {aboutData.infoRows.map((row, index) => (
          <motion.div
            key={row.label}
            custom={index * 0.04}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
