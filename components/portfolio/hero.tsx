"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { IntroItem } from "@/components/motion/intro-item";
import { Pile } from "@/components/motion/pile";
import { ScrollExit } from "@/components/motion/scroll-fx";
import { heroPile } from "./piles";

/**
 * The opening, in order (seconds after the page is ready; the boxes are falling from 0):
 *   the eyebrow and the name drop in from the top, like the boxes;
 *   the paragraph slides in from the left;
 *   a deliberate pause, so the buttons land with some emphasis;
 *   the buttons fade in.
 * That opening plays once, when the page opens. Scrolling never replays it; the whole hero only
 * drifts away and fades as you scroll past it, and comes back as you scroll up (`ScrollExit`).
 */
const AT = {
  eyebrow: 0.8,
  name: 0.95,
  paragraph: 1.5,
  buttons: 3.1,
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-12 px-4 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8"
    >
      <ScrollExit target={sectionRef} to="right" distance={90} className="space-y-6">
        <IntroItem
          as="p"
          effect="drop"
          at={AT.eyebrow}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
        >
          Management Engineering · University of Waterloo
        </IntroItem>

        <IntroItem
          as="h1"
          effect="drop"
          at={AT.name}
          className="font-display text-7xl font-extrabold leading-[0.85] tracking-tighter sm:text-8xl lg:text-[8rem]"
        >
          Tristan
          <br />
          Ko
        </IntroItem>

        <IntroItem as="p" effect="slide" at={AT.paragraph} className="max-w-xl text-xl leading-relaxed md:text-2xl">
          Management Engineering student at the University of Waterloo, passionate about data and
          problem-solving through analytics.
        </IntroItem>

        <IntroItem effect="fade" at={AT.buttons} className="flex flex-wrap gap-3 pt-2">
          <a
            href="#projects"
            className="bubbly group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
          >
            View projects
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </IntroItem>
      </ScrollExit>

      <ScrollExit target={sectionRef} to="right" distance={130}>
        <Pile
          boxes={heroPile}
          className="mx-auto grid aspect-[6/7] w-full max-w-[26rem] grid-cols-6 grid-rows-7 gap-1 lg:max-w-none"
        />
      </ScrollExit>
    </section>
  );
}
