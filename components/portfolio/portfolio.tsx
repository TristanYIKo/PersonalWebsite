"use client";

import { IntroProvider } from "@/components/motion/intro-controller";
import { Connect } from "./connect";
import { Experience } from "./experience";
import { Hero } from "./hero";
import { Projects } from "./projects";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

export function Portfolio({ year }: { year: number }) {
  return (
    <IntroProvider>
      <SiteNav />
      <main className="overflow-x-clip">
        <Hero />
        <Experience />
        <Projects />
        {/* Connect and the footer are the last snap screen together. Snapping to Connect alone
            would hide the footer and keep pulling you back off the bottom of the page. */}
        <div className="snap-screen flex flex-col">
          <Connect />
          <SiteFooter year={year} />
        </div>
      </main>
    </IntroProvider>
  );
}
