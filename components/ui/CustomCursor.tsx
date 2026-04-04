"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Point = {
  x: number;
  y: number;
};

export default function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const targetRef = useRef<Point>({ x: -100, y: -100 });
  const ringRefPos = useRef<Point>({ x: -100, y: -100 });

  const hoverMode = useRef<"default" | "hover" | "text">("default");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const markInteractive = () => {
      const nodes = document.querySelectorAll<HTMLElement>("a, button, .proj-card");
      nodes.forEach((node) => {
        if (!node.dataset.cursor) node.dataset.cursor = "hover";
      });
    };

    markInteractive();
    const observer = new MutationObserver(markInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    const updateMode = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        hoverMode.current = "default";
        return;
      }
      const textEl = target.closest("[data-cursor='text']");
      const hoverEl = target.closest("[data-cursor='hover']");
      if (textEl) {
        hoverMode.current = "text";
      } else if (hoverEl) {
        hoverMode.current = "hover";
      } else {
        hoverMode.current = "default";
      }
    };

    const onMove = (event: MouseEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      targetRef.current = point;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${point.x - 4}px, ${point.y - 4}px, 0)`;
      }

      updateMode(event.target);
    };

    const onDown = () => {
      if (!dotRef.current) return;
      dotRef.current.style.transition = "transform 120ms ease";
      const p = targetRef.current;
      dotRef.current.style.transform = `translate3d(${p.x - 4}px, ${p.y - 4}px, 0) scale(0.5)`;
      window.setTimeout(() => {
        if (!dotRef.current) return;
        dotRef.current.style.transform = `translate3d(${p.x - 4}px, ${p.y - 4}px, 0) scale(1)`;
      }, 120);
    };

    const animate = () => {
      const target = targetRef.current;
      const ring = ringRefPos.current;

      ring.x += (target.x - ring.x) * 0.12;
      ring.y += (target.y - ring.y) * 0.12;

      if (ringRef.current) {
        let transform = `translate3d(${ring.x - 18}px, ${ring.y - 18}px, 0)`;
        let opacity = 1;

        if (hoverMode.current === "hover") {
          transform += " scale(2.2)";
          opacity = 0.6;
        }

        if (hoverMode.current === "text") {
          transform += " scaleX(0.3) scaleY(1.5)";
        }

        ringRef.current.style.transform = transform;
        ringRef.current.style.opacity = String(opacity);
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-9 w-9 rounded-full border-[1.5px] border-white/60 mix-blend-difference transition-opacity"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
