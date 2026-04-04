"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SmoothScrollProvider({ children }: Props) {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      syncTouch: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    const syncProgress = () => {
      if (!progressRef.current) return;

      const max = document.body.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progressRef.current.style.width = `${ratio * 100}%`;
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("scroll", syncProgress, { passive: true });
    syncProgress();

    return () => {
      window.removeEventListener("scroll", syncProgress);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] w-full bg-transparent">
        <div ref={progressRef} className="h-full w-0 bg-gradient-to-r from-purple-500 to-cyan-400" />
      </div>
      {children}
    </>
  );
}
