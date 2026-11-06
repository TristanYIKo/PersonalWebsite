"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Where an element stands as the page scrolls:
 *   "below"  not yet reached (or scrolled back down past it): hidden, ready to arrive;
 *   "in"     on screen and settled in its place;
 *   "above"  scrolled up past it: it has left.
 * Motion keys off the state (`data-state`), so each change plays an arrival or a departure.
 */
export type ScrollState = "below" | "in" | "above";

export interface ScrollBands {
  /** % of the screen height, measured from the top, an element must stay below to remain "in". Above it, the element leaves. */
  exit?: number;
  /** % from the top it must come back down past before it returns from "above". Deeper than `exit`, so a wobble in scroll cannot make it flip. */
  reenter?: number;
  /** % up from the bottom an element must rise past before it arrives from "below". */
  arrive?: number;
}

/**
 * Tracks an element's {@link ScrollState} with four IntersectionObservers. The arrive and
 * return lines are set apart from the leave lines, so a visitor pausing right on a line, or
 * nudging the scroll back and forth over it, never makes the motion restart. "below" is only
 * set once the element is fully off the bottom of the screen, so an element that has arrived
 * stays put while you scroll back up past it, and plays again when you next come to it.
 */
export function useScrollState(
  ref: RefObject<Element | null>,
  { exit = 30, reenter = 46, arrive = 22 }: ScrollBands = {},
  initial: ScrollState = "below",
) {
  const [state, setState] = useState<ScrollState>(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observe = (margin: string, onEntry: (entry: IntersectionObserverEntry) => void) => {
      const observer = new IntersectionObserver((entries) => onEntry(entries[entries.length - 1]), {
        rootMargin: margin,
      });
      observer.observe(el);
      return observer;
    };

    const observers = [
      // Wholly above the exit line: it has left through the top.
      observe(`-${exit}% 0px 0px 0px`, (entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0)) {
          setState("above");
        }
      }),
      // Back below the (deeper) return line: it comes back in from above.
      observe(`-${reenter}% 0px 0px 0px`, (entry) => {
        if (entry.isIntersecting) setState((s) => (s === "above" ? "in" : s));
      }),
      // Risen past the arrive line: it arrives from below (unless it is already above the exit line).
      observe(`0px 0px -${arrive}% 0px`, (entry) => {
        if (entry.isIntersecting && entry.boundingClientRect.bottom > (window.innerHeight * exit) / 100) {
          setState((s) => (s === "below" ? "in" : s));
        }
      }),
      // Fully off the bottom of the screen: reset, ready to arrive again.
      observe("0px", (entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) setState("below");
      }),
    ];

    return () => observers.forEach((observer) => observer.disconnect());
  }, [ref, exit, reenter, arrive]);

  return state;
}
