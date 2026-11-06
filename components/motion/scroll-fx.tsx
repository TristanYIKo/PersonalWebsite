"use client";

import type { ReactNode, RefObject } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Edge = "top" | "right" | "left" | "bottom";

/** Where an element starts (or ends up) relative to its resting spot, for each edge. */
const vector: Record<Edge, { x: number; y: number }> = {
  top: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  bottom: { x: 0, y: 1 },
};

/** Progress stops: fully hidden, fully in, start of the exit, fully out. Exit starts late so tall screens aren't caught mid-fade. */
const STOPS = [0, 0.24, 0.76, 0.98];

/** Slightly soft and slow, so the motion is easy to follow. Settles without overshoot. */
const SPRING = { stiffness: 85, damping: 19, mass: 0.9 };

/**
 * Scroll-linked entrance and exit. As `target` rises into view the content slides in from
 * `from` while fading up; as `target` scrolls away it drifts off toward `to` while fading out.
 * Because it follows scroll position it reverses perfectly when you scroll back, and the
 * progress is run through a spring so it eases rather than tracking every wheel tick.
 *
 * Only transform and opacity change, so it stays on the compositor. Reduced motion removes
 * the sliding in CSS (`.scroll-fx`) and keeps the fade. Never swap `style` out after load:
 * framer would leave the initial opacity behind.
 */
export function ScrollFx({
  target,
  from,
  to = "right",
  distance = 90,
  className,
  children,
}: {
  /** The element whose position drives the animation (usually the whole section). */
  target: RefObject<HTMLElement | null>;
  from: Edge;
  to?: Edge;
  distance?: number;
  className?: string;
  children: ReactNode;
}) {
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, SPRING);

  const enter = vector[from];
  const exit = vector[to];
  const opacity = useTransform(progress, STOPS, [0, 1, 1, 0]);
  const x = useTransform(progress, STOPS, [enter.x * distance, 0, 0, exit.x * distance]);
  const y = useTransform(progress, STOPS, [enter.y * distance, 0, 0, exit.y * distance]);

  return (
    <motion.div style={{ opacity, x, y }} className={cn("scroll-fx will-change-transform", className)}>
      {children}
    </motion.div>
  );
}

/**
 * Exit only, for content that is already on screen when the page opens (the hero). It is fully
 * visible at the top of the page, then drifts toward `to` and fades as you scroll past it, and
 * comes straight back when you scroll up. Because it starts fully visible, nothing flashes in
 * before the opening animation plays, and the opening itself is never replayed by scrolling.
 */
export function ScrollExit({
  target,
  to = "right",
  distance = 90,
  className,
  children,
}: {
  /** The element whose position drives the animation (the hero section). */
  target: RefObject<HTMLElement | null>;
  to?: Edge;
  distance?: number;
  className?: string;
  children: ReactNode;
}) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, SPRING);

  const exit = vector[to];
  const opacity = useTransform(progress, [0.3, 0.88], [1, 0]);
  const x = useTransform(progress, [0.3, 0.88], [0, exit.x * distance]);
  const y = useTransform(progress, [0.3, 0.88], [0, exit.y * distance]);

  return (
    <motion.div style={{ opacity, x, y }} className={cn("scroll-fx will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
