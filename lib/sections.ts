/** In page order. `top` is the hero and has no nav link of its own. */
export const SECTION_IDS = ["top", "experience", "projects", "connect"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const NAV_LINKS: readonly { id: Exclude<SectionId, "top">; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
];
