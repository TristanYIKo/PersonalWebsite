"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { bounceKeyframes, bounceToFrames, DROP_IGNORES_REDUCED_MOTION } from "@/lib/motion";
import { boxShadow, toneClass, type Tone } from "@/lib/tones";
import { useIntro } from "./intro-controller";

interface DropBoxProps {
  tone: Tone;
  /** Size and placement (e.g. grid area). Applied to the wrapper, which never moves. */
  className?: string;
  /** Extra classes for the visible box (padding, layout of whatever it holds). */
  boxClassName?: string;
  /** Seconds after the intro starts at which the box first hits. */
  land?: number;
  /** Resting rotation in degrees, so stacked boxes don't look machine-placed. Use 0 for boxes holding images. */
  tilt?: number;
  children?: ReactNode;
}

const MAX_FALL = 900;

/**
 * A hero box: on load it falls from the top of the viewport, squashes on impact and hops
 * into place. Used only in the hero pile.
 *
 * The wrapper stays put; only the inner box moves. The motion is a Web Animations API
 * animation on `transform`, so it runs on the compositor thread and stays smooth while
 * the main thread is busy. It waits for `ready` (fonts + hero photo) so nothing reflows
 * mid-fall, and every box is created in the same task with its own delay so the cascade
 * shares one clock instead of a chain of timers.
 */
export function DropBox({ tone, className, boxClassName, land = 0.7, tilt = 0, children }: DropBoxProps) {
  const { ready } = useIntro();
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const box = boxRef.current;
    if (!ready || !wrap || !box) return;

    let finished = false;
    let animation: Animation | undefined;
    const rest = `rotate(${tilt}deg)`;
    const reduce =
      !DROP_IGNORES_REDUCED_MOTION && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      box.style.transform = rest;
      box.style.opacity = "1";
      animation = box.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 350, easing: "ease-out" });
      animation.finished.then(() => (finished = true)).catch(() => {});
    } else {
      // Fall from just above the top of the viewport.
      const height = Math.min(Math.max(wrap.getBoundingClientRect().bottom + 24, 240), MAX_FALL);
      const kf = bounceKeyframes({ height, tilt, startTilt: tilt < 0 ? -9 : 9 });

      // Start so the first impact lands at `land` seconds. `fill: both` holds the first
      // keyframe (off-screen) through the delay, so the box never flashes at its resting spot.
      box.style.willChange = "transform";
      box.style.opacity = "1";
      animation = box.animate(bounceToFrames(kf), {
        duration: kf.duration * 1000,
        delay: Math.max(0, land - kf.fall) * 1000,
        fill: "both",
      });

      animation.finished
        .then(() => {
          // Commit the resting pose before releasing the animation so nothing jumps.
          box.style.transform = rest;
          animation?.cancel();
          box.style.willChange = "";
          finished = true;
        })
        .catch(() => {});
    }

    return () => {
      animation?.cancel();
      if (!finished) {
        box.style.opacity = "0";
        box.style.transform = "";
        box.style.willChange = "";
      }
    };
  }, [ready, land, tilt]);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div
        ref={boxRef}
        className={cn("h-full w-full rounded-lg", boxShadow, toneClass[tone], boxClassName)}
        // Hidden until the drop starts, with its compositor layer ready. The squash is
        // anchored to the base so the box stays "on the ground".
        style={{ opacity: 0, transformOrigin: "50% 100%", willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
