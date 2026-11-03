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
const STOPS = [0, 0.2, 0.78, 0.98];

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
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 20, mass: 0.8 });

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
