"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ lerp: 0.08, duration: 1.4, smoothTouch: false } as unknown as ConstructorParameters<
      typeof Lenis
    >[0]);
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) gsap.set(progressRef.current, { scaleX: progress, transformOrigin: "left center" });
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-[9998] h-[2px] w-full bg-transparent">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]" />
      </div>
      {children}
    </>
  );
}
