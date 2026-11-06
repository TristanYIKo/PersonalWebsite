"use client";

import { useEffect, useRef } from "react";
import { bounceKeyframes, bounceToFrames } from "@/lib/motion";
import { boxShadow, toneClass } from "@/lib/tones";
import { cn } from "@/lib/utils";
import type { PileBox } from "./pile";
import { useScrollState, type ScrollState } from "./use-scroll-state";

/** How far (px) a box drops into place. Short, so the boxes fade in near their spot rather than falling across the screen. */
const DROP = 130;
/** Landing times from the pile data were written for the hero's longer fall; this brings them in. */
const PACE = 0.7;
const FADE_OUT_MS = 1400;
const REDUCED = "(prefers-reduced-motion: reduce)";

function StackBox({ box, state }: { box: PileBox; state: ScrollState }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const tilt = box.tilt ?? 0;

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    if (state === "below") {
      el.style.opacity = "0";
      el.style.transform = "";
      return;
    }

    const animations: Animation[] = [];

    if (state === "in") {
      // Fade in while dropping a short way, squash on impact and hop into place, bottom boxes
      // first. Reduced motion keeps a gentler version: one small hop, no squash or tilt.
      const reduce = window.matchMedia(REDUCED).matches;
      const kf = bounceKeyframes({
        height: reduce ? 60 : DROP,
        tilt,
        startTilt: reduce ? 0 : tilt < 0 ? -6 : 6,
        hops: reduce ? [8, 3, 1] : [26, 9, 3],
        ...(reduce ? { squash: [0, 0, 0] } : {}),
      });
      const delay = Math.max(0, box.land * PACE - kf.fall) * 1000;

      el.style.opacity = "1";
      const drop = el.animate(bounceToFrames(kf), { duration: kf.duration * 1000, delay, fill: "both" });
      // The fade runs on its own clock so the box is fully visible before it lands.
      const fade = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: kf.fall * 1000 + 220,
        delay,
        easing: "ease-out",
        fill: "both",
      });
      animations.push(drop, fade);
      drop.finished
        .then(() => {
          // Commit the resting pose before releasing the animations so nothing jumps.
          el.style.transform = `rotate(${tilt}deg)`;
          animations.forEach((a) => a.cancel());
        })
        .catch(() => {});
    } else {
      // Scrolled past: a slow fade where it stands. No movement.
      el.style.opacity = "1";
      el.style.transform = `rotate(${tilt}deg)`;
      animations.push(el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_OUT_MS, easing: "ease-in-out", fill: "both" }));
    }

    return () => animations.forEach((a) => a.cancel());
  }, [state, box.land, tilt]);

  return (
    <div className={cn("relative", box.className)}>
      <div
        ref={boxRef}
        className={cn("h-full w-full rounded-lg", boxShadow, toneClass[box.tone])}
        style={{ opacity: 0, transformOrigin: "50% 100%" }}
      />
    </div>
  );
}

/**
 * A small pile that fades in and drops onto the page, stacking bottom boxes first, as it scrolls
 * into view, and fades slowly away when you scroll past it. It plays again each time you come
 * back. The same physics as the hero's drop, on the compositor (Web Animations API), but a short
 * drop with a fade instead of a fall from the top of the screen.
 */
export function StackPile({ boxes, className }: { boxes: PileBox[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useScrollState(ref, { exit: 30, reenter: 46, arrive: 22 });

  return (
    <div ref={ref} className={className}>
      {boxes.map((box) => (
        <StackBox key={box.id} box={box} state={state} />
      ))}
    </div>
  );
}
