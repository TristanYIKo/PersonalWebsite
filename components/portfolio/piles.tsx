import Image from "next/image";
import type { PileBox } from "@/components/motion/pile";

/**
 * Pile layouts. Each box is placed on a grid and rests on the ones below it, so
 * `land` times run bottom-first: a box only falls once what it lands on has landed.
 */

/** The hero pile: 6 columns x 7 rows. Boxes hold only a photo, no words. */
export const heroPile: PileBox[] = [
  { id: "base-violet", tone: "violet", className: "col-[1/5] row-[6/8]", land: 0.5, tilt: -0.6 },
  { id: "base-mint", tone: "mint", className: "col-[5/7] row-[6/8]", land: 0.62, tilt: 0.8 },
  {
    id: "photo",
    tone: "coral",
    className: "col-[1/4] row-[3/6]",
    land: 0.95,
    // Boxes holding an image rest level: a rotated bitmap is resampled and looks soft.
    tilt: 0,
    boxClassName: "p-2",
    children: (
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <Image
          src="/assets/carousel/portfolioPic1.png"
          alt="Tristan Ko"
          fill
          priority
          data-intro-image
          sizes="(min-width: 1024px) 22vw, 60vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  { id: "sky", tone: "sky", className: "col-[4/6] row-[4/6]", land: 1.03, tilt: 0.7 },
  { id: "amber-tall", tone: "amber", className: "col-[6/7] row-[4/6]", land: 1.1, tilt: -1 },
  { id: "pink-wide", tone: "pink", className: "col-[4/7] row-[2/4]", land: 1.35, tilt: 0.5 },
  { id: "ink", tone: "ink", className: "col-[1/3] row-[1/3]", land: 1.43, tilt: -0.8 },
  { id: "violet-small", tone: "violet", className: "col-[3/4] row-[2/3]", land: 1.5, tilt: 1.2 },
];

/** The small pile beside the Projects heading. 4 columns x 3 rows. */
export const projectsPile: PileBox[] = [
  { id: "a", tone: "sky", className: "col-[1/3] row-[3/4]", land: 0.5, tilt: 0.7 },
  { id: "b", tone: "coral", className: "col-[3/5] row-[3/4]", land: 0.6, tilt: -0.8 },
  { id: "c", tone: "mint", className: "col-[2/4] row-[1/3]", land: 0.95, tilt: 0.6 },
  { id: "d", tone: "violet", className: "col-[4/5] row-[2/3]", land: 1.1, tilt: -1.2 },
];

/** Grid for the 4x3 pile. */
export const MINI_PILE = "grid aspect-[4/3] w-44 grid-cols-4 grid-rows-3 gap-[3px] sm:w-52";
