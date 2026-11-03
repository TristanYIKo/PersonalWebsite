"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const tags = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
} as const;

/** The element starts to appear when its top reaches this fraction of the screen height, and is fully in at the second. */
const IN_START = 0.97;
const IN_END = 0.8;
/** It is fully gone when its bottom reaches this many px from the top (just under the nav), and fully in at the second. */
const OUT_GONE = 72;
const OUT_FULL = 156;
/** How far (px) it rises into place while appearing. */
const DRIFT = 24;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => n * n * (3 - 2 * n);

/**
 * Fades one piece of content in as it rises into the lower part of the screen and out as it
 * nears the top, by that element's own position. Put it on every line of a block and the
 * text cascades in and out as you scroll, in either direction. Fully opaque through the
 * middle of the screen, so nothing is faded while you are reading it.
 *
 * The scroll progress goes through a spring so it eases rather than tracking each wheel
 * tick. Only opacity and a small drift change. Reduced motion removes the drift in CSS
 * (`.scroll-fx`) and keeps the fade. Never swap `style` out after load: framer would leave
 * the initial opacity behind.
 */
export function FadeOnScroll({
  as = "div",
  className,
  children,
}: {
  as?: keyof typeof tags;
  className?: string;
  children: ReactNode;
}) {
  const Tag = tags[as] as typeof motion.div;
  const ref = useRef<HTMLDivElement>(null);
  const size = useRef({ h: 0, vh: 0 });
  const measured = useMotionValue(0);

  // 0 when the element's top meets the bottom of the screen, 1 when its bottom meets the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 34, mass: 0.6 });

  const read = (p: number) => {
    const { h, vh } = size.current;
    if (!vh) return { visible: 1, drift: 0 }; // not measured yet: stay visible
    const top = vh - p * (vh + h);
    const bottom = top + h;
    const enter = smooth(clamp01((IN_START * vh - top) / ((IN_START - IN_END) * vh)));
    const leave = smooth(clamp01((bottom - OUT_GONE) / (OUT_FULL - OUT_GONE)));
    return { visible: enter * leave, drift: (1 - enter) * DRIFT };
  };
  const opacity = useTransform([progress, measured], ([p]) => read(p as number).visible);
  const y = useTransform([progress, measured], ([p]) => read(p as number).drift);

  const measure = useCallback(() => {
    size.current = { h: ref.current?.offsetHeight ?? 0, vh: window.innerHeight };
    measured.set(measured.get() + 1);
  }, [measured]);

  useEffect(() => {
    measure();
    const el = ref.current;
    const observer = new ResizeObserver(measure);
    if (el) observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <Tag ref={ref} style={{ opacity, y }} className={cn("scroll-fx", className)}>
      {children}
    </Tag>
  );
}
