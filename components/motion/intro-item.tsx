"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import { bounceKeyframes, bounceToFrames, DROP_IGNORES_REDUCED_MOTION } from "@/lib/motion";
import { useIntro } from "./intro-controller";

type Effect = "drop" | "slide" | "fade";

/** Hops and squash for text: the same fall-and-bounce as the boxes, just much softer. */
const TEXT_HOPS = [16, 6, 2];
const TEXT_SQUASH = [0.045, 0.02, 0.01];

const SLIDE_FROM = -110;

/**
 * A piece of hero text in the opening sequence. Everything starts from the same moment as
 * the boxes (`ready`), each with its own time `at` (seconds):
 *   drop  falls from the top of the screen, squashes on impact and hops into place;
 *         `at` is when it first hits.
 *   slide comes in from the left with a small overshoot; `at` is when it starts.
 *   fade  fades up gently; `at` is when it starts.
 * Hidden until its turn, so there is no flash before it moves. Transform and opacity only,
 * on the compositor, like the boxes.
 */
export function IntroItem({
  as = "div",
  effect,
  at,
  className,
  children,
}: {
  as?: "div" | "p" | "h1";
  effect: Effect;
  at: number;
  className?: string;
  children: ReactNode;
}) {
  const { ready } = useIntro();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!ready || !el) return;

    let finished = false;
    let animation: Animation | undefined;
    const reduce =
      !DROP_IGNORES_REDUCED_MOTION && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.style.willChange = "transform, opacity";
    el.style.opacity = "1";

    if (reduce) {
      animation = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: at * 1000, fill: "both" });
    } else if (effect === "drop") {
      const height = Math.min(Math.max(el.getBoundingClientRect().bottom + 24, 160), 700);
      const kf = bounceKeyframes({ height, hops: TEXT_HOPS, squash: TEXT_SQUASH });
      animation = el.animate(bounceToFrames(kf), {
        duration: kf.duration * 1000,
        delay: Math.max(0, at - kf.fall) * 1000,
        fill: "both",
      });
    } else if (effect === "slide") {
      animation = el.animate(
        [
          { transform: `translateX(${SLIDE_FROM}px)`, opacity: 0, offset: 0, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          { transform: "translateX(9px)", opacity: 1, offset: 0.62, easing: "ease-in-out" },
          { transform: "translateX(-3px)", opacity: 1, offset: 0.82, easing: "ease-in-out" },
          { transform: "translateX(0)", opacity: 1, offset: 1 },
        ],
        { duration: 950, delay: at * 1000, fill: "both" },
      );
    } else {
      animation = el.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 800, delay: at * 1000, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
      );
    }

    animation.finished
      .then(() => {
        // Commit the resting state before releasing the animation so nothing jumps.
        el.style.opacity = "1";
        el.style.transform = "";
        animation?.cancel();
        el.style.willChange = "";
        finished = true;
      })
      .catch(() => {});

    return () => {
      animation?.cancel();
      if (!finished) {
        el.style.opacity = "0";
        el.style.transform = "";
        el.style.willChange = "";
      }
    };
  }, [ready, effect, at]);

  return createElement(
    as,
    // Hidden until its turn; text squashes from its bottom-left corner so it stays anchored.
    { ref, className, style: { opacity: 0, transformOrigin: "0% 100%" } },
    children,
  );
}
