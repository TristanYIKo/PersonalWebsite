"use client";

import type { ReactNode } from "react";
import type { Tone } from "@/lib/tones";
import { DropBox } from "./drop-box";

export interface PileBox {
  id: string;
  tone: Tone;
  /** Grid placement and size, e.g. "col-[1/5] row-[6/8]". */
  className: string;
  /** Seconds at which this box first hits (DropBox) or falls onto the stack (StackPile). Order bottom-first. */
  land: number;
  tilt?: number;
  boxClassName?: string;
  children?: ReactNode;
}

/** The hero pile: boxes drop on load and stack on one another. Lower boxes land first. */
export function Pile({ boxes, className }: { boxes: PileBox[]; className?: string }) {
  return (
    <div className={className}>
      {boxes.map((box) => (
        <DropBox
          key={box.id}
          tone={box.tone}
          className={box.className}
          boxClassName={box.boxClassName}
          land={box.land}
          tilt={box.tilt}
        >
          {box.children}
        </DropBox>
      ))}
    </div>
  );
}
