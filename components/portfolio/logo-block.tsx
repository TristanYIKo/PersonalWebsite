import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A company's logo as a box. The logo fills the face and the raised bottom edge is drawn on
 * top of it, so it still reads as one of the site's blocks. Decorative: the company name is
 * always printed beside it.
 */
export function LogoBlock({ logo, className }: { logo: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-lg bg-white shadow-[0_12px_20px_-10px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {/* Pixel-exact crops, so skip the optimizer; the browser scales them. */}
      <Image src={logo} alt="" fill sizes="56px" unoptimized className="object-cover" />
      <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0_-5px_0_rgba(0,0,0,0.14)]" />
    </span>
  );
}
