export type Tone = "violet" | "coral" | "amber" | "mint" | "sky" | "pink" | "ink";

/** Surface + text colour for each block. `ink` inverts with the theme. */
export const toneClass: Record<Tone, string> = {
  violet: "bg-block-violet text-white",
  coral: "bg-block-coral text-block-ink",
  amber: "bg-block-amber text-block-ink",
  mint: "bg-block-mint text-block-ink",
  sky: "bg-block-sky text-block-ink",
  pink: "bg-block-pink text-block-ink",
  ink: "bg-foreground text-background",
};

/** Soft glow colour for each tone (the block colours at partial opacity), used on hover. */
export const toneGlow: Record<Tone, string> = {
  violet: "rgba(98, 71, 245, 0.55)",
  coral: "rgba(255, 107, 87, 0.55)",
  amber: "rgba(255, 194, 51, 0.6)",
  mint: "rgba(61, 219, 160, 0.55)",
  sky: "rgba(77, 178, 255, 0.55)",
  pink: "rgba(255, 143, 192, 0.6)",
  ink: "rgba(21, 21, 28, 0.4)",
};

/** The raised, slightly thick look shared by every box. */
export const boxShadow = "shadow-[inset_0_-5px_0_rgba(0,0,0,0.14),0_12px_20px_-10px_rgba(0,0,0,0.45)]";
