"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Stage } from "@/components/motion/stage";
import { experiences } from "@/lib/data";
import { toneClass } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { LogoBlock } from "./logo-block";

/** Opens on the role you are in right now, falling back to the newest. */
const DEFAULT_ROLE = (experiences.find((e) => e.current) ?? experiences[0]).id;

/**
 * The load order, in seconds after the section comes into view (see `.sx` in globals.css). It
 * plays in two stages, each piece arriving with its own side of the screen: the left column first
 * (from the left border), then the role panel follows (from the right border), its details a
 * moment before its bullets.
 *   1. the left column: the "Experience" title, the line under it and the role blocks;
 *   2. the right side, first its header: role title, date, company and location, description;
 *   3. then the bullets, all together, last.
 */
const STEP = { left: "0s", header: "0.22s", bullets: "0.46s" } as const;
const at = (base: string) => ({ "--base": base }) as CSSProperties;

export function Experience() {
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
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
        <Stage className="space-y-6">
          <h2
            style={at(STEP.left)}
            className="sx sx-left font-display text-6xl font-extrabold leading-[0.9] tracking-tight md:text-7xl"
          >
            Experience
          </h2>
          <p style={at(STEP.left)} className="sx sx-left max-w-xs text-lg leading-relaxed text-muted-foreground">
            Roles across product analytics, software, and supply chain.
          </p>

          {/* One block per role, each showing its company's logo. Pressing one swaps the panel beside it. */}
          <div role="tablist" aria-label="Roles" className="mt-4 grid grid-cols-3 gap-3 lg:flex lg:flex-col lg:gap-1">
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
                  style={at(STEP.left)}
                  className="sx sx-left group flex flex-col items-start gap-3 rounded-xl py-2 text-left text-foreground/45 transition-colors duration-500 hover:text-foreground data-[active=true]:text-foreground lg:flex-row lg:items-center lg:gap-4 lg:py-3"
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
        </Stage>

        {/* All role panels share one grid cell, so the section never changes height when you
            switch. Selecting a role fades the old one out and brings the new one in from the
            right edge, the same way it arrives when you scroll to it. */}
        <div className="grid">
          {experiences.map((exp) => {
            const active = exp.id === selected;
            return (
              <div
                key={exp.id}
                id={`panel-${exp.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${exp.id}`}
                data-active={active}
                inert={!active}
                className="role-panel col-start-1 row-start-1 min-w-0"
              >
                <Stage active={active} className="space-y-4">
                  <div className="flex items-start gap-5">
                    <LogoBlock
                      logo={exp.logo}
                      style={at(STEP.header)}
                      className="sx sx-right mt-1 h-12 w-12 sm:h-14 sm:w-14"
                    />
                    <div className="min-w-0 space-y-1.5">
                      <h3
                        style={at(STEP.header)}
                        className="sx sx-right font-display text-3xl font-bold leading-tight md:text-4xl"
                      >
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        {exp.current && (
                          <span
                            style={at(STEP.header)}
                            className={cn(
                              "sx sx-right inline-block rounded-full px-2.5 py-0.5 text-xs font-bold",
                              toneClass[exp.tone],
                            )}
                          >
                            Current
                          </span>
                        )}
                        <p style={at(STEP.header)} className="sx sx-right text-sm font-semibold text-muted-foreground">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p style={at(STEP.header)} className="sx sx-right text-lg font-semibold">
                    {exp.company} <span className="text-muted-foreground">·</span> {exp.location}
                  </p>
                  {exp.description && (
                    <p style={at(STEP.header)} className="sx sx-right leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                  )}
                  <ul className="space-y-2.5 text-[0.95rem] leading-relaxed">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} style={at(STEP.bullets)} className="sx sx-right flex gap-3">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-foreground" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Stage>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
