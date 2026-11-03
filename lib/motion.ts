import type { Variants } from "framer-motion";

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

// Quadratic ease-in / ease-out as cubic beziers: gravity pulling a box down, then
// slowing it as it hops back up.
const fallEase: [number, number, number, number] = [0.11, 0, 0.5, 0];
const riseEase: [number, number, number, number] = [0.5, 1, 0.89, 1];

/** px/s². Higher is a snappier, heavier fall. */
export const GRAVITY = 5000;

/**
 * The hero's opening drop (boxes and text) is the site's signature moment, so it plays
 * even when the OS asks for reduced motion (it is brief and plays once). Everything else
 * follows the preference. Set to false to skip the drop for those users.
 */
export const DROP_IGNORES_REDUCED_MOTION = true;

/** Default hop heights (px) after the first impact, and how far a box squashes on each. */
const HOPS = [64, 22, 8];
const SQUASH = [0.12, 0.06, 0.03];
/** How much of the start-to-rest tilt is gone at each keyframe. */
const TILT_PROGRESS = [0, 0.55, 0.7, 0.85, 0.9, 0.96, 0.98, 1];

export interface BounceOptions {
  /** Distance (px) the object falls before its first impact. */
  height: number;
  /** Resting rotation in degrees. */
  tilt?: number;
  /** Rotation in degrees while falling. */
  startTilt?: number;
  /** Three hop heights (px). Text uses small ones; boxes use the defaults. */
  hops?: number[];
  /** Three squash amounts (0.1 = 10% shorter) for the first three impacts. */
  squash?: number[];
}

/**
 * Keyframes for something dropped onto a surface: it falls under gravity, hits,
 * squashes, hops three times with shrinking height, and settles at `tilt`.
 * Segment durations come from the physics (t = sqrt(2h/g)), so a taller fall
 * takes longer and each hop is quicker than the last.
 */
export function bounceKeyframes({
  height,
  tilt = 0,
  startTilt = 0,
  hops = HOPS,
  squash: squashAmounts = SQUASH,
}: BounceOptions) {
  const fall = Math.sqrt((2 * height) / GRAVITY);
  const hopTimes = hops.map((h) => Math.sqrt((2 * h) / GRAVITY));
  const segments = [fall, ...hopTimes.flatMap((t) => [t, t])];
  const duration = segments.reduce((sum, s) => sum + s, 0);

  let elapsed = 0;
  const times = [0, ...segments.map((s) => (elapsed += s) / duration)];
  times[times.length - 1] = 1;

  // start, impact, then (apex, impact) per hop
  const y = [-height, 0, ...hops.flatMap((h) => [-h, 0])];
  // The last keyframe is the resting state, so it keeps its full size.
  const squash = [0, squashAmounts[0], 0, squashAmounts[1], 0, squashAmounts[2], 0, 0];
  const rotate = TILT_PROGRESS.map((p) => startTilt + (tilt - startTilt) * p);

  return {
    fall,
    duration,
    times,
    ease: [fallEase, riseEase, fallEase, riseEase, fallEase, riseEase, fallEase],
    values: {
      y,
      scaleY: squash.map((s) => 1 - s),
      scaleX: squash.map((s) => 1 + s * 0.6),
      rotate,
    },
  };
}

/** Turns bounce keyframes into Web Animations API frames (a `transform` per frame, easing per segment). */
export function bounceToFrames(kf: ReturnType<typeof bounceKeyframes>): Keyframe[] {
  return kf.values.y.map((y, i) => ({
    offset: kf.times[i],
    transform: `translateY(${y}px) rotate(${kf.values.rotate[i]}deg) scale(${kf.values.scaleX[i]}, ${kf.values.scaleY[i]})`,
    easing: i < kf.ease.length ? `cubic-bezier(${kf.ease[i].join(",")})` : "linear",
  }));
}

/**
 * Text rises with a soft spring (a little overshoot as it settles) while its opacity
 * follows a plain ease, so the fade stays clean and only the movement is bubbly.
 */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.6, ease: easeOutExpo, delay },
      y: { type: "spring", stiffness: 150, damping: 15, mass: 0.9, delay },
    },
  }),
};
