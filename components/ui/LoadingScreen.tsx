"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function LoadingScreen() {
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const letterRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!overlayRef.current || !letterRef.current || !lineRef.current) return;

    if (reducedMotion) {
      overlayRef.current.style.display = "none";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = "none";
      },
    });

    tl.fromTo(letterRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" })
      .to(letterRef.current, { scale: 1.4, filter: "blur(8px)", duration: 0.6, ease: "power2.inOut" })
      .to(letterRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: "power3.inOut" }, "<")
      .to(overlayRef.current, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.inOut" }, "<");

    gsap.fromTo(lineRef.current, { width: "0%" }, { width: "100%", duration: 1.2, ease: "none" });

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#080808]">
      <h1
        ref={letterRef}
        className="select-none text-[clamp(120px,20vw,240px)] font-bold"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        M
      </h1>
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent">
        <div ref={lineRef} className="h-full w-0 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]" />
      </div>
    </div>
  );
}
