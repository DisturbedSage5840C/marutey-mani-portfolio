"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function RevealOnScroll({
  children,
  variant,
  delay = 0,
}: {
  children: React.ReactNode;
  variant: "clip" | "fade";
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      gsap.set(ref.current, { clearProps: "all", opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" });
      return;
    }

    const tween =
      variant === "clip"
        ? gsap.fromTo(
            ref.current,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.9,
              ease: "power4.inOut",
              delay,
              scrollTrigger: { trigger: ref.current, start: "top 85%" },
            }
          )
        : gsap.fromTo(
            ref.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              delay,
              scrollTrigger: { trigger: ref.current, start: "top 88%" },
            }
          );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, reducedMotion, variant]);

  return <div ref={ref}>{children}</div>;
}
