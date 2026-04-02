"use client";

import { motion } from "framer-motion";
import { heroData } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id={heroData.id}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-24 tb:px-12"
    >
      <div className="pointer-events-none absolute left-0 top-[8vh] select-none whitespace-nowrap font-serif text-[clamp(8rem,18vw,22rem)] leading-none text-white/5">
        {heroData.ghostText}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-gold">
          <span className="h-px w-10 bg-gold" />
          <span>{heroData.eyebrow}</span>
        </div>

        <h1 className="mb-8 font-serif text-[clamp(3.5rem,8vw,9rem)] leading-[0.92] tracking-[-0.02em]">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {heroData.firstName}
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <em className="not-italic text-gold">{heroData.lastName}</em>
          </motion.span>
        </h1>

        <p className="mb-12 max-w-[52ch] text-lg leading-[1.75] text-muted">{heroData.description}</p>

        <div className="flex flex-wrap items-center gap-4">
          {heroData.ctas.map((cta) => {
            const shared =
              "inline-flex items-center justify-center px-8 py-3.5 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-200";

            return (
              <a
                key={cta.label}
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className={
                  cta.variant === "primary"
                    ? `${shared} bg-gold text-bg hover:opacity-85`
                    : `${shared} border border-border text-text hover:border-muted`
                }
              >
                {cta.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-20 right-12 hidden flex-col gap-8 text-right max-[899px]:hidden tb:flex">
        {heroData.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-serif text-5xl leading-none text-gold">{stat.value}</div>
            <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
