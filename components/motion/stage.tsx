"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { useScrollState, type ScrollBands } from "./use-scroll-state";

/** How long an unselected stage keeps its content showing, so the outgoing role can fade away. */
const LINGER_MS = 400;

/**
 * A group of content that plays together. It reports where it stands on the page as
 * `data-state` ("below", "in" or "above"), and the `.sx` pieces inside it arrive when it comes
 * into view and leave when it scrolls away (see globals.css). Each group is its own trigger,
 * so a block further down the page plays when you reach it, not when its neighbour does.
 *
 * `active` is for content that is swapped by a control (the role panels): a stage that is not
 * active holds "below" so its pieces wait hidden, and plays its arrival again the moment it
 * becomes active. It keeps showing for a moment after being deselected so the old content can
 * fade out instead of vanishing.
 */
export function Stage({
  as = "div",
  bands,
  active = true,
  className,
  children,
  ...rest
}: {
  as?: "div" | "h2" | "p" | "ul";
  bands?: ScrollBands;
  active?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  const scroll = useScrollState(ref, bands);

  const [lingering, setLingering] = useState(active);
  useEffect(() => {
    if (active) {
      setLingering(true);
      return;
    }
    const timer = setTimeout(() => setLingering(false), LINGER_MS);
    return () => clearTimeout(timer);
  }, [active]);

  const state = active || lingering ? scroll : "below";

  return (
    <Tag ref={ref} data-state={state} className={className} {...rest}>
      {children}
    </Tag>
  );
}
