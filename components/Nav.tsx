"use client";

import { motion } from "framer-motion";
import { navItems } from "@/lib/data";

export default function Nav() {
  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-[rgba(10,10,10,0.85)] px-6 py-5 backdrop-blur-md tb:px-12"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <div className="font-mono text-xs uppercase tracking-[0.12em] text-gold">M. Mani</div>
        <ul className="flex list-none items-center gap-10 max-[599px]:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted transition-colors duration-200 hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
