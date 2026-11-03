"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { GrowPile } from "@/components/motion/grow-pile";
import { Reveal } from "@/components/motion/reveal";
import { ScrollFx } from "@/components/motion/scroll-fx";
import { categories, categoryTone, projects, type Category, type Project } from "@/lib/data";
import { boxShadow, toneClass, toneGlow } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { MINI_PILE, projectsPile } from "./piles";
import { ProjectDialog } from "./project-dialog";

type Filter = "All" | Category;

const filters: readonly Filter[] = ["All", ...categories];

/** Longest a card waits for its screenshot before revealing anyway. */
const IMAGE_WAIT_MS = 2500;

function techSummary(tech: string[]) {
  const shown = tech.slice(0, 4).join(" · ");
  return tech.length > 4 ? `${shown} +${tech.length - 4}` : shown;
}

function ProjectCard({
  project,
  index,
  seen,
  onOpen,
}: {
  project: Project;
  index: number;
  /** Titles that have already played their reveal; re-mounted cards (after a filter) skip it. */
  seen: Set<string>;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [instant] = useState(() => seen.has(project.title));
  // Hold the reveal until the screenshot has loaded, so the panel never uncovers a blank frame.
  const [imageReady, setImageReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setImageReady(true), IMAGE_WAIT_MS);
    return () => clearTimeout(timer);
  }, []);

  const shown = instant || (inView && imageReady);
  useEffect(() => {
    if (shown) seen.add(project.title);
  }, [shown, seen, project.title]);

  const tone = categoryTone[project.category];

  // The jiggle is driven by `data-hover` ("in" while a mouse is over the card, "out" for the
  // wobble back to rest). Set straight on the element so hovering never re-renders React.
  const hoverIn = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    event.currentTarget.dataset.hover = "in";
  };
  const hoverOut = (event: PointerEvent<HTMLElement>) => {
    if (event.currentTarget.dataset.hover === "in") event.currentTarget.dataset.hover = "out";
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={instant ? { opacity: 0, scale: 0.96 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      data-in={shown}
      onPointerEnter={hoverIn}
      onPointerLeave={hoverOut}
      style={{ "--glow": toneGlow[tone] } as CSSProperties}
      className="project-card group relative flex flex-col gap-5"
    >
      <div className="rise relative" style={{ "--delay": `${(index % 3) * 0.09}s` } as CSSProperties}>
        <div className="jelly-x">
          <div className={cn("jelly-y rounded-lg p-2", boxShadow, toneClass[tone])}>
            <div className="jelly-inner relative aspect-video overflow-hidden rounded-md bg-black/10">
              <div className="curtain-img absolute inset-0">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  onLoad={() => setImageReady(true)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              {/* Covers the screenshot, then wipes upward to uncover it. */}
              <div aria-hidden className={cn("curtain absolute inset-0", toneClass[tone])} />
              <div aria-hidden className="gloss pointer-events-none absolute inset-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span aria-hidden className={cn("h-2.5 w-2.5 rounded-[3px]", toneClass[tone])} />
          {project.category}
        </p>
        <h3 className="font-display text-2xl font-bold leading-tight">
          {/* Stretched button: the whole card opens the details. */}
          <button type="button" onClick={onOpen} className="text-left after:absolute after:inset-0">
            {project.title}
          </button>
        </h3>
        <p className="line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="text-xs text-muted-foreground/80">{techSummary(project.tech)}</p>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const seenRef = useRef(new Set<string>());
  const headerRef = useRef<HTMLDivElement>(null);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const countFor = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <section id="projects" className="snap-screen mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <div ref={headerRef} className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
        {/* Drops in from the top and leaves to the right, like the Experience title. */}
        <ScrollFx target={headerRef} from="top" distance={70} className="space-y-6">
          <h2 className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight md:text-7xl">
            Projects
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Open any project for the full story, the stack, and links.
          </p>
        </ScrollFx>
        <GrowPile boxes={projectsPile} className={MINI_PILE} />
      </div>

      <Reveal className="mt-12">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "bubbly rounded-full border px-4 py-2 text-sm font-semibold",
                filter === f
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/40",
              )}
            >
              {f} <span className="opacity-60">{countFor(f)}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              seen={seenRef.current}
              onOpen={() => {
                setActive(project);
                setOpen(true);
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <ProjectDialog project={active} open={open} onOpenChange={setOpen} />
    </section>
  );
}
