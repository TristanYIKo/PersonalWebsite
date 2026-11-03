"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { revealVariants } from "@/lib/motion";

const tags = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
} as const;

/** Content that rises with a soft spring and fades in once, as it scrolls into view. */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: {
  as?: keyof typeof tags;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const Tag = tags[as] as typeof motion.div;

  return (
    <Tag
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      custom={delay}
      className={className}
    >
      {children}
    </Tag>
  );
}
