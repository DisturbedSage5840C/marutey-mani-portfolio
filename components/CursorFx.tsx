"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorFx() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 400, damping: 35, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 35, mass: 0.6 });

  const dotX = useSpring(mouseX, { stiffness: 700, damping: 45, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 45, mass: 0.2 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(media.matches);
    updateEnabled();
    media.addEventListener("change", updateEnabled);

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const setStateFromTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        setHovered(false);
        return;
      }
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .proj-card");
      setHovered(Boolean(interactive));
    };

    const over = (event: MouseEvent) => setStateFromTarget(event.target);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      media.removeEventListener("change", updateEnabled);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-8 w-8 rounded-full border border-gold/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovered ? 1.8 : 1, opacity: hovered ? 0.95 : 0.7 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[121] h-2.5 w-2.5 rounded-full bg-gold"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 30px rgba(200,169,110,0.75)",
        }}
        animate={{ scale: hovered ? 0.65 : 1 }}
        transition={{ type: "spring", stiffness: 650, damping: 30 }}
      />
    </>
  );
}