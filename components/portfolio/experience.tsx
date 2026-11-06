"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { FadeOnScroll } from "@/components/motion/fade-on-scroll";
import { ScrollFx } from "@/components/motion/scroll-fx";
import { experiences } from "@/lib/data";
import { toneClass } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { LogoBlock } from "./logo-block";

/** Opens on the role you are in right now, falling back to the newest. */
const DEFAULT_ROLE = (experiences.find((e) => e.current) ?? experiences[0]).id;

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(DEFAULT_ROLE);
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Arrow keys / Home / End move between roles, as in any tab list.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = experiences.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % experiences.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + experiences.length) % experiences.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    const id = experiences[next].id;
    setSelected(id);
    tabs.current[id]?.focus();
  };

  return (
    <section ref={sectionRef} id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
        {/* The whole left side drops in from the top, and leaves to the right. */}
        <ScrollFx target={sectionRef} from="top" distance={120} className="space-y-6">
          <FadeOnScroll
            as="h2"
            className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight md:text-7xl"
          >
            Experience
          </FadeOnScroll>
          <FadeOnScroll as="p" className="max-w-xs text-lg leading-relaxed text-muted-foreground">
            Roles across product analytics, software, and supply chain.
          </FadeOnScroll>

          {/* One block per role, each showing its company's logo. Pressing one swaps the panel beside it. */}
          <FadeOnScroll>
          <div
            role="tablist"
            aria-label="Roles"
            className="mt-4 grid grid-cols-3 gap-3 lg:flex lg:flex-col lg:gap-1"
          >
            {experiences.map((exp, i) => {
              const active = exp.id === selected;
              return (
                <button
                  key={exp.id}
                  ref={(el) => {
                    tabs.current[exp.id] = el;
                  }}
                  id={`tab-${exp.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`panel-${exp.id}`}
                  tabIndex={active ? 0 : -1}
                  data-active={active}
                  onClick={() => setSelected(exp.id)}
                  onKeyDown={(event) => onKeyDown(event, i)}
                  className="group flex flex-col items-start gap-3 rounded-xl py-2 text-left text-foreground/45 transition-colors duration-500 hover:text-foreground data-[active=true]:text-foreground lg:flex-row lg:items-center lg:gap-4 lg:py-3"
                >
                  <LogoBlock
                    logo={exp.logo}
                    className={cn(
                      "h-12 w-12 scale-75 opacity-50 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none lg:h-11 lg:w-11",
                      "group-hover:opacity-100 group-data-[active=true]:-translate-y-1 group-data-[active=true]:scale-110 group-data-[active=true]:opacity-100",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold leading-tight lg:text-xl">
                      {exp.indexLabel}
                    </span>
                    <span className="hidden text-sm lg:block">
                      {exp.role} <span aria-hidden>·</span> {exp.period}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          </FadeOnScroll>
        </ScrollFx>

        {/* The role panel slides in from the right, and leaves to the right. All panels share
            one grid cell, so the section never changes height when you switch. The old text
            fades out, then the new text fades in. */}
        <ScrollFx target={sectionRef} from="right" distance={140} className="grid">
          {experiences.map((exp) => {
            const active = exp.id === selected;
            return (
              <div
                key={exp.id}
                id={`panel-${exp.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${exp.id}`}
                data-active={active}
                className="role-panel col-start-1 row-start-1 min-w-0 space-y-4"
              >
                <FadeOnScroll className="flex items-start gap-5">
                  <LogoBlock logo={exp.logo} className="role-cube mt-1 h-12 w-12 sm:h-14 sm:w-14" />
                  <div className="min-w-0 space-y-1.5">
                    <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {exp.current && (
                        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", toneClass[exp.tone])}>
                          Current
                        </span>
                      )}
                      <p className="text-sm font-semibold text-muted-foreground">{exp.period}</p>
                    </div>
                  </div>
                </FadeOnScroll>

                <FadeOnScroll as="p" className="text-lg font-semibold">
                  {exp.company} <span className="text-muted-foreground">·</span> {exp.location}
                </FadeOnScroll>
                {exp.description && (
                  <FadeOnScroll as="p" className="leading-relaxed text-muted-foreground">
                    {exp.description}
                  </FadeOnScroll>
                )}
                {/* Each bullet fades on its own, so they cascade in and out as you scroll. */}
                <ul className="space-y-2.5 text-[0.95rem] leading-relaxed">
                  {exp.achievements.map((achievement) => (
                    <FadeOnScroll as="li" key={achievement} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-foreground" />
                      <span>{achievement}</span>
                    </FadeOnScroll>
                  ))}
                </ul>
              </div>
            );
          })}
        </ScrollFx>
      </div>
    </section>
  );
}
