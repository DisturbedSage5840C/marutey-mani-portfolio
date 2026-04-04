"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { contactData } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ContactRipple = dynamic(() => import("@/components/three/ContactRipple"), { ssr: false });

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  const ripplesRef = useRef(Array.from({ length: 8 }, () => new THREE.Vector2(-10, -10)));
  const timesRef = useRef(Array.from({ length: 8 }, () => -10));
  const rippleIdx = useRef(0);

  const headingWords = useMemo(() => `${contactData.headingStart} ${contactData.headingEmphasis}`.split(" "), []);

  useEffect(() => {
    if (!headingRef.current) return;

    if (reducedMotion) {
      wordRefs.current.forEach((word) => {
        if (word) {
          word.style.opacity = "1";
          word.style.transform = "translateY(0px)";
        }
      });
      return;
    }

    const tween = gsap.fromTo(
      wordRefs.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  const isMobile = typeof navigator !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <section
      id={contactData.id}
      ref={sectionRef}
      className="relative z-[1] mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center overflow-hidden border-t border-border px-6 py-28 tb:px-12"
      onClick={(event) => {
        if (reducedMotion || isMobile || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = 1 - (event.clientY - rect.top) / rect.height;
        const i = rippleIdx.current % 8;
        ripplesRef.current[i] = new THREE.Vector2(x, y);
        timesRef.current[i] = performance.now() / 1000;
        rippleIdx.current += 1;
      }}
    >
      {!isMobile ? <ContactRipple ripplesRef={ripplesRef} timesRef={timesRef} /> : <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/15" />}

      <div className="relative z-10 mb-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gold">
        <span>{contactData.tag}</span>
        <span className="h-px w-16 bg-border" />
      </div>

      <h2 ref={headingRef} className="relative z-10 mb-12 text-[clamp(3rem,7vw,8rem)] font-bold leading-[0.95] tracking-[-0.02em] text-[#f8f8f8]">
        {headingWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(node) => {
              wordRefs.current[index] = node;
            }}
            className="mr-3 inline-block"
          >
            {word}
          </span>
        ))}
      </h2>

      <div className="relative z-10 flex flex-wrap gap-x-6 gap-y-6">
        {contactData.links.map((link) => (
          <div key={link.label} className="-m-5 p-5">
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              data-hover="true"
              className="inline-flex h-[72px] w-[72px] flex-col items-center justify-center rounded-xl border border-white/15 bg-white/5 text-center font-mono text-[10px] uppercase tracking-[0.09em] text-[rgba(248,248,248,0.75)]"
              onMouseMove={(event) => {
                if (reducedMotion) return;
                const btn = event.currentTarget;
                const rect = btn.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (event.clientX - cx) * 0.42;
                const dy = (event.clientY - cy) * 0.42;
                gsap.to(btn, { x: dx, y: dy, scale: 1.12, duration: 0.3, ease: "power2.out" });
                const icon = btn.querySelector("svg");
                if (icon) gsap.to(icon, { rotate: dx * 0.5, duration: 0.3 });
              }}
              onMouseLeave={(event) => {
                gsap.to(event.currentTarget, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
                const icon = event.currentTarget.querySelector("svg");
                if (icon) gsap.to(icon, { rotate: 0, duration: 0.6 });
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 2l2.4 7.6H22l-6.2 4.6 2.4 7.8L12 17.4 5.8 22l2.4-7.8L2 9.6h7.6z" />
              </svg>
              <span>{link.label}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
