"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#about");
  const [open, setOpen] = useState(false);

  const hashItems = useMemo(() => navItems.filter((item) => item.href.startsWith("#")), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    hashItems.forEach((item) => {
      const id = item.href.slice(1);
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) setActive(item.href);
        },
        { threshold: 0.35 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [hashItems]);

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 px-6 py-5 transition-all duration-300 tb:px-12 ${
        scrolled
          ? "border-b border-border backdrop-blur-md bg-black/40"
          : "border-b border-transparent bg-transparent"
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Link href="#hero" className="font-mono text-xs uppercase tracking-[0.12em] text-gold" data-cursor="hover">
          M. Mani
        </Link>

        <button
          type="button"
          className="hidden max-[599px]:inline-flex h-10 w-10 items-center justify-center border border-border text-gold"
          onClick={() => setOpen((value) => !value)}
          data-cursor="hover"
          aria-label="Toggle menu"
        >
          <span className="font-mono text-xs">{open ? "X" : "≡"}</span>
        </button>

        <ul className="flex list-none items-center gap-10 max-[599px]:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-cursor="hover"
                className={`relative font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted transition-all duration-200 hover:text-text hover:tracking-[0.05em] ${
                  item.href.startsWith("#") ? (active === item.href ? "text-text" : "") : pathname === item.href ? "text-text" : ""
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    item.href.startsWith("#")
                      ? active === item.href
                        ? "w-full"
                        : "w-0"
                      : pathname === item.href
                        ? "w-full"
                        : "w-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {open ? (
        <div className="mt-4 hidden max-[599px]:block">
          <ul className="space-y-2 border border-border bg-surface/90 p-3 backdrop-blur-md">
            {navItems.map((item, index) => (
              <motion.li
                key={`mobile-${item.href}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.24, delay: index * 0.06 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  data-cursor="hover"
                  className="block px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.nav>
  );
}
