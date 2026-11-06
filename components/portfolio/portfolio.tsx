"use client";

import { useEffect } from "react";
import { IntroProvider } from "@/components/motion/intro-controller";
import { Connect } from "./connect";
import { Experience } from "./experience";
import { Hero } from "./hero";
import { Projects } from "./projects";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

/**
 * In-page links (the nav, "View projects", "Back to top") scroll to their section without
 * writing `#section` into the address. A refresh would otherwise jump straight back to that
 * section instead of the top. Modified clicks (new tab) keep the normal link behaviour.
 */
function useCleanAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      // `auto` follows the page's CSS: smooth, unless the visitor asked for reduced motion.
      target.scrollIntoView({ behavior: "auto", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

export function Portfolio({ year }: { year: number }) {
  useCleanAnchors();

  return (
    <IntroProvider>
      <SiteNav />
      <main className="overflow-x-clip">
        <Hero />
        <Experience />
        <Projects />
        <Connect />
      </main>
      <SiteFooter year={year} />
    </IntroProvider>
  );
}
