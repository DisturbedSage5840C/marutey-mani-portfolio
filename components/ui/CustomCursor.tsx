"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorPoint = {
  x: number;
  y: number;
};

type TrailPoint = {
  x: number;
  y: number;
  opacity: number;
  scale: number;
};

const TRAIL_COUNT = 12;

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  const mouse = useRef<CursorPoint>({ x: 0, y: 0 });
  const ring = useRef<CursorPoint>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const trailPoints = useRef<TrailPoint[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0, opacity: 0, scale: 1 }))
  );

  const trailNodes = useMemo(
    () => Array.from({ length: TRAIL_COUNT }, (_, i) => i),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined" || "ontouchstart" in window || reducedMotion) return;

    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const onMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const hovered = target?.closest("a, button, [data-hover]");
      if (!dotRef.current || !ringRef.current) return;

      if (hovered) {
        ringRef.current.style.width = "64px";
        ringRef.current.style.height = "64px";
        ringRef.current.style.borderColor = "#22d3ee";
        dotRef.current.style.opacity = "0";
      } else {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = "rgba(168, 85, 247, 0.6)";
        dotRef.current.style.opacity = "1";
      }
    };

    const onDown = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.5, duration: 0.12, ease: "power2.out" });
    };

    const onUp = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.18, ease: "power2.out" });
    };

    const frame = () => {
      if (!dotRef.current || !ringRef.current) return;

      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;

      dotRef.current.style.left = `${mouse.current.x}px`;
      dotRef.current.style.top = `${mouse.current.y}px`;
      ringRef.current.style.left = `${ring.current.x}px`;
      ringRef.current.style.top = `${ring.current.y}px`;

      trailPoints.current.unshift({ x: mouse.current.x, y: mouse.current.y, opacity: 0.5, scale: 1 });
      trailPoints.current.pop();

      for (let i = 0; i < trailPoints.current.length; i += 1) {
        const p = trailPoints.current[i];
        p.opacity *= 0.85;
        p.scale *= 0.98;

        const node = trailRefs.current[i];
        if (!node) continue;
        node.style.left = `${p.x}px`;
        node.style.top = `${p.y}px`;
        node.style.opacity = `${p.opacity}`;
        node.style.transform = `translate(-50%, -50%) scale(${p.scale})`;
      }

      rafId.current = window.requestAnimationFrame(frame);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    rafId.current = window.requestAnimationFrame(frame);

    return () => {
      document.body.style.cursor = previousCursor;
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || reducedMotion)) {
    return null;
  }

  return (
    <>
      {trailNodes.map((index) => (
        <div
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          aria-hidden="true"
          className="pointer-events-none fixed z-[9997] h-1 w-1 rounded-full bg-purple-500/50"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      ))}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9997] h-2 w-2 rounded-full bg-[#a855f7]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9997] h-10 w-10 rounded-full border-[1.5px] border-[rgba(168,85,247,0.6)]"
        style={{ transform: "translate(-50%, -50%)", transition: "width 0.3s, height 0.3s" }}
      />
    </>
  );
}
