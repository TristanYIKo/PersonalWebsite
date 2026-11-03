"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { boxShadow, toneClass } from "@/lib/tones";
import type { PileBox } from "./pile";

/**
 * A group of boxes that grow up from their base, bottom-first, as it scrolls into view.
 * The calm counterpart to the hero's drop: same boxes, no falling. Pure CSS transitions
 * (see `.grow-box`), triggered once by `data-in`.
 */
export function GrowPile({ boxes, className }: { boxes: PileBox[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div ref={ref} data-in={inView} className={className}>
      {boxes.map((box) => (
        <div key={box.id} className={box.className}>
          <div
            className={cn("grow-box h-full w-full rounded-lg", boxShadow, toneClass[box.tone])}
            style={
              {
                "--tilt": `${box.tilt ?? 0}deg`,
                "--delay": `${Math.max(0, box.land - 0.45)}s`,
              } as CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}
