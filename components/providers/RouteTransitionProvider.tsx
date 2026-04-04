"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function RouteTransitionProvider({ children }: Props) {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const bar = progressRef.current;
    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.style.opacity = "1";

    requestAnimationFrame(() => {
      bar.style.transition = "width 340ms ease, opacity 240ms ease 260ms";
      bar.style.width = "100%";
      window.setTimeout(() => {
        bar.style.opacity = "0";
      }, 420);
    });
  }, [pathname]);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] w-full bg-transparent">
        <div ref={progressRef} className="h-full w-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-0" />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
