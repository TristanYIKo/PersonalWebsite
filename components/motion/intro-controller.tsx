"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

interface IntroContextValue {
  /** True once fonts and the hero photo are ready, so the opening can start on a stable page. */
  ready: boolean;
}

const IntroContext = createContext<IntroContextValue | null>(null);

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used within IntroProvider");
  return ctx;
}

/** Never hold the intro longer than this waiting on fonts or images. */
const READY_TIMEOUT_MS = 2500;

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Owns the start of the hero's opening. `ready` flips once fonts have loaded and the
 * hero photo has decoded, so nothing reflows or pops in mid-fall. Every opening piece
 * (the boxes and the hero text) starts from that same moment with its own delay, so they
 * share one clock. `reducedMotion="user"` applies to everything outside the hero opening.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const stable = async () => {
      await document.fonts.ready;
      const images = document.querySelectorAll<HTMLImageElement>("img[data-intro-image]");
      await Promise.all(Array.from(images, (img) => img.decode().catch(() => {})));
      // Two frames so layout from the font swap has been painted before anything moves.
      await nextFrame();
      await nextFrame();
    };

    const timeout = new Promise<void>((resolve) => setTimeout(resolve, READY_TIMEOUT_MS));
    Promise.race([stable(), timeout]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ ready }), [ready]);

  return (
    <IntroContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </IntroContext.Provider>
  );
}
