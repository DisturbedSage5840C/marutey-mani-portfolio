"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { aboutData, heroData } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CounterState = {
  one: number;
  two: number;
  three: number;
};

const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - 2 ** (-10 * x));

export default function About() {
  const reducedMotion = useReducedMotion();

  const photoWrapRef = useRef<HTMLDivElement | null>(null);
  const photoInnerRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);

  const statsRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState<CounterState>({ one: 0, two: 0, three: 0 });
  const [counterDone, setCounterDone] = useState(false);

  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  const targets = useMemo(() => {
    const one = Number.parseFloat(heroData.stats[0]?.value.replace("+", "") ?? "9");
    const two = Number.parseFloat(heroData.stats[1]?.value ?? "2");
    const three = Number.parseFloat(heroData.stats[2]?.value.replace("%", "") ?? "96.75");
    return { one, two, three };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setCounter(targets);
      setCounterDone(true);
      return;
    }

    const node = statsRef.current;
    if (!node) return;

    let raf = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting || started) return;
        started = true;

        const start = performance.now();
        const duration = 1200;

        const tick = (time: number) => {
          const progress = Math.min(1, (time - start) / duration);
          const eased = easeOutExpo(progress);

          setCounter({
            one: targets.one * eased,
            two: targets.two * eased,
            three: targets.three * eased,
          });

          if (progress < 1) {
            raf = window.requestAnimationFrame(tick);
          } else {
            setCounterDone(true);
          }
        };

        raf = window.requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
    };
  }, [reducedMotion, targets]);

  useEffect(() => {
    const node = skillsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) setSkillsVisible(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const onPhotoMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !photoWrapRef.current || !photoInnerRef.current || !shineRef.current) return;

    const rect = photoWrapRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const ry = ((x - cx) / cx) * 12;
    const rx = -((y - cy) / cy) * 12;

    photoInnerRef.current.style.transition = "transform 0.1s linear";
    photoInnerRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    shineRef.current.style.backgroundPositionX = `${(x / rect.width) * 100}%`;
  };

  const onPhotoLeave = () => {
    if (!photoInnerRef.current) return;
    photoInnerRef.current.style.transition = "transform 0.5s ease";
    photoInnerRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const photoCard = (
    <div className="relative" style={{ perspective: "1000px" }} ref={photoWrapRef} onMouseMove={onPhotoMove} onMouseLeave={onPhotoLeave}>
      <div ref={photoInnerRef} className="relative aspect-[3/4] overflow-hidden will-change-transform">
        <Image src="/images/marutey_photo.jpg" alt="Marutey Mani" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
        <div ref={shineRef} className="pointer-events-none absolute inset-0" style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
          backgroundPositionX: "50%",
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>
      <p className="mt-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#888680]">Plaksha University · 2026</p>
    </div>
  );

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

        <div className="relative mb-8 mt-8 hidden max-[599px]:block">{photoCard}</div>

        <div className="mt-8 space-y-6 text-[1.05rem] leading-[1.85] text-muted">
          {aboutData.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div ref={statsRef} className="mt-10 grid grid-cols-3 gap-4 max-[599px]:grid-cols-1">
          <div className="border border-border p-4">
            <div className="font-serif text-4xl text-gold">
              {Math.round(counter.one)}
              <span
                className="inline-block"
                style={{
                  transformOrigin: "left center",
                  transform: counterDone ? "scale(1.15)" : "scale(0)",
                  transition: "transform 320ms ease",
                }}
              >
                +
              </span>
            </div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">Organizations</p>
          </div>
          <div className="border border-border p-4">
            <div className="font-serif text-4xl text-gold">{Math.round(counter.two)}</div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">Ventures Founded</p>
          </div>
          <div className="border border-border p-4">
            <div className="font-serif text-4xl text-gold">
              {counter.three.toFixed(2)}
              <span
                className="inline-block"
                style={{
                  transformOrigin: "left center",
                  transform: counterDone ? "scale(1.15)" : "scale(0)",
                  transition: "transform 320ms ease",
                }}
              >
                %
              </span>
            </div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">Class XII Score</p>
          </div>
        </div>

        <div ref={skillsRef} className="mt-12 grid grid-cols-2 gap-px bg-border max-[599px]:grid-cols-1">
          {aboutData.skills.map((skill, index) => (
            <div
              key={skill.label}
              className="bg-bg p-5 transition-all duration-300"
              style={{
                opacity: skillsVisible ? 1 : 0,
                transform: skillsVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-gold">{skill.label}</div>
              <div className="flex flex-wrap gap-2 text-sm text-muted">
                {skill.items.split("·").map((item) => (
                  <span
                    key={`${skill.label}-${item.trim()}`}
                    className="rounded-sm border border-border px-2 py-1 transition duration-200 hover:scale-[1.08] hover:bg-white/5"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden max-[599px]:hidden max-[899px]:block">{photoCard}</div>

      <div className="relative max-[899px]:hidden">{photoCard}</div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="pt-14 max-[899px]:pt-0">
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
                  data-cursor="hover"
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
