"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";

/**
 * Three boxes mid-stack: a wide base with two knocked-off-square boxes resting on it.
 * On hover (the link is the `group`) the top two hop and tilt with a springy overshoot.
 */
function BrandMark() {
  const spring = "transition-transform duration-500 ease-[cubic-bezier(0.34,1.7,0.5,1)] motion-reduce:transition-none";
  return (
    <span aria-hidden className="relative h-7 w-7 shrink-0">
      <span className={cn("absolute bottom-0 left-0 h-3 w-7 rounded-[3px] bg-block-violet", spring, "motion-safe:group-hover:scale-x-110")} />
      <span
        className={cn(
          "absolute bottom-3 left-0 h-3.5 w-3.5 -rotate-6 rounded-[3px] bg-block-amber",
          spring,
          "motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:-rotate-[16deg]",
        )}
      />
      <span
        className={cn(
          "absolute bottom-3 right-0 h-2.5 w-3 rotate-[8deg] rounded-[3px] bg-block-coral",
          spring,
          "motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:rotate-[20deg]",
        )}
      />
    </span>
  );
}

export function SiteNav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-background/0",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-8"
      >
        <a
          href="#top"
          aria-label="Tristan Ko, back to the top"
          className="group flex shrink-0 items-center gap-3 rounded-lg"
        >
          <BrandMark />
          <span className="hidden font-display text-xl font-bold tracking-tight sm:inline">Tristan Ko</span>
        </a>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map(({ id, label }) => {
            const current = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "bubbly relative rounded-full px-2.5 py-2 text-sm font-medium sm:px-4",
                  current ? "text-foreground" : "text-foreground/60 hover:text-foreground",
                )}
              >
                {label}
                {current && (
                  <motion.span
                    layoutId="nav-box"
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-1.5 rounded-[3px] bg-block-violet sm:inset-x-5"
                    transition={{ type: "spring", stiffness: 520, damping: 16 }}
                  />
                )}
              </a>
            );
          })}
          <ThemeToggle className="ml-1 text-foreground/70 hover:bg-foreground/10 hover:text-foreground" />
        </div>
      </nav>
    </header>
  );
}
