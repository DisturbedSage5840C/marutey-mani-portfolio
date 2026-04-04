"use client";

import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function Nav() {
  const reducedMotion = useReducedMotion();
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 60) {
        navRef.current.style.background = "rgba(8, 8, 8, 0.85)";
        navRef.current.style.backdropFilter = "blur(20px) saturate(180%)";
        navRef.current.style.borderBottom = "1px solid rgba(255,255,255,0.06)";
      } else {
        navRef.current.style.background = "transparent";
        navRef.current.style.backdropFilter = "none";
        navRef.current.style.borderBottom = "none";
      }
    };

    const observers: IntersectionObserver[] = [];
    navItems
      .filter((item) => item.href.startsWith("#"))
      .forEach((item) => {
        const section = document.querySelector(item.href);
        if (!section) return;
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) setActive(item.href);
          },
          { threshold: 0.4 }
        );
        observer.observe(section);
        observers.push(observer);
      });

    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", onScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const runGlitch = () => {
    if (reducedMotion) return;
    if (!logoRef.current) return;
    const original = "M. Mani";
    let ticks = 0;

    const interval = window.setInterval(() => {
      if (!logoRef.current) return;
      logoRef.current.textContent = original
        .split("")
        .map((char, index) => {
          if (char === " " || char === ".") return char;
          if (index < ticks / 2) return original[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      ticks += 1;
      if (ticks > 7) {
        window.clearInterval(interval);
        if (logoRef.current) logoRef.current.textContent = original;
      }
    }, 40);
  };

  return (
    <nav ref={navRef} className="fixed inset-x-0 top-0 z-50 px-6 py-5 transition-all duration-300 tb:px-12">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Link
          href="#hero"
          ref={logoRef}
          data-hover="true"
          onMouseEnter={runGlitch}
          className="font-mono text-xs uppercase tracking-[0.12em] text-[#a855f7]"
        >
          M. Mani
        </Link>
        <ul className="flex list-none items-center gap-10 max-[599px]:hidden">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-hover="true"
                onMouseEnter={(event) => {
                  if (reducedMotion) return;
                  gsap.to(event.currentTarget, { letterSpacing: "0.05em", duration: 0.25 });
                }}
                onMouseLeave={(event) => {
                  if (reducedMotion) return;
                  gsap.to(event.currentTarget, { letterSpacing: "0em", duration: 0.25 });
                }}
                className={`relative font-mono text-[0.72rem] uppercase text-muted transition-colors duration-200 hover:text-text ${
                  active === item.href ? "text-[#a855f7]" : ""
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px origin-left bg-[#a855f7] transition-transform duration-300 ${
                    active === item.href ? "w-full scale-x-100" : "w-full scale-x-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
