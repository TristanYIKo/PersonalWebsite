"use client";

import { useRef, type CSSProperties } from "react";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { ScrollFx } from "@/components/motion/scroll-fx";
import { Stage } from "@/components/motion/stage";
import { useInBand } from "@/components/motion/use-in-band";
import { socialLinks } from "@/lib/data";
import { boxShadow, toneClass } from "@/lib/tones";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram,
  Email: Mail,
};

/**
 * Starts an icon's boing and lets it run to the end even if the pointer moves on straight away
 * (a brush across the row still plays the whole thing). Ignored while it is already playing, so
 * coming back mid-way cannot restart it; the icon clears the flag when the animation ends.
 */
function boing(row: HTMLElement) {
  const icon = row.querySelector<SVGElement>(".icon-boing");
  if (icon && icon.dataset.boing !== "on") icon.dataset.boing = "on";
}

export function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // Turns false when the list leaves the screen, so the rows rise in again each time you come back.
  const inView = useInBand(listRef, "-60px 0px -10% 0px");

  return (
    <section ref={sectionRef} id="connect" className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* The title and the line under it fade in together, sliding in from the left border, and
            leave the way they came (see `.sx` in globals.css). The list slides in from the right. */}
        <Stage className="space-y-6">
          <h2 className="sx sx-left font-display text-6xl font-extrabold leading-[0.9] tracking-tight md:text-7xl">
            Let&rsquo;s
            <br />
            connect
          </h2>
          <p className="sx sx-left max-w-md text-lg leading-relaxed text-muted-foreground">
            Interested in working together or just want to say hi? Reach out through any of these.
          </p>
        </Stage>

        <ScrollFx target={sectionRef} from="right" distance={120} className="self-center">
        <ul ref={listRef} data-in={inView}>
          {socialLinks.map((link, i) => {
            const Icon = icons[link.name];
            const external = !link.href.startsWith("mailto:");
            return (
              <li
                key={link.name}
                className="rise border-t border-border last:border-b"
                style={{ "--delay": `${i * 0.13}s` } as CSSProperties}
              >
                <a
                  href={link.href}
                  aria-label={link.label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onPointerEnter={(event) => boing(event.currentTarget)}
                  onFocus={(event) => event.currentTarget.matches(":focus-visible") && boing(event.currentTarget)}
                  className="group relative -mx-4 flex items-center gap-5 overflow-hidden px-4 py-6"
                >
                  {/* On hover a block of the row's colour sweeps across from the left. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none",
                      toneClass[link.tone],
                    )}
                  />
                  <span
                    className={cn(
                      "relative grid h-12 w-12 shrink-0 place-items-center rounded-lg transition-colors duration-500",
                      boxShadow,
                      toneClass[link.tone],
                      "group-hover:!bg-block-ink group-hover:!text-white group-focus-visible:!bg-block-ink group-focus-visible:!text-white",
                    )}
                  >
                    {/* Boings once, after a beat, when the row is hovered (see `.icon-boing`). */}
                    <Icon
                      aria-hidden
                      className="icon-boing h-6 w-6"
                      onAnimationEnd={(event) => delete event.currentTarget.dataset.boing}
                    />
                  </span>
                  <span className="relative min-w-0 flex-1 transition-colors duration-500 group-hover:text-block-ink group-focus-visible:text-block-ink">
                    <span className="block font-display text-2xl font-bold md:text-4xl">{link.name}</span>
                    <span className="block break-all text-sm opacity-70">{link.handle}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="relative h-6 w-6 shrink-0 transition-[transform,color] duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-block-ink motion-reduce:transition-none"
                  />
                </a>
              </li>
            );
          })}
        </ul>
        </ScrollFx>
      </div>
    </section>
  );
}
