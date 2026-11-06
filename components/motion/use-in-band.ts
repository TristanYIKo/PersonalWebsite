"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while the element is inside a band of the screen. `margin` trims the screen like a CSS
 * margin (negative values shrink it), so "-80px 0px -10% 0px" means: clear of the nav at the
 * top and 10% up from the bottom. Unlike a once-only trigger it turns false again when the
 * element leaves, so reveals that key off it replay each time you scroll back over them.
 *
 * `initial` is the value before the first measurement, for elements that should not flash.
 */
export function useInBand(ref: RefObject<Element | null>, margin: string, initial = false) {
  const [inBand, setInBand] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => setInBand(entries[entries.length - 1].isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin]);

  return inBand;
}
