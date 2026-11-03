import { ArrowUp } from "lucide-react";

export function SiteFooter({ year }: { year: number }) {
  return (
    // It sits inside <main> (as part of the last snap screen), so give it its landmark role explicitly.
    <footer role="contentinfo" className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-8">
      <div className="flex items-center justify-between border-t-2 border-foreground pt-5 text-sm text-muted-foreground">
        <p>© {year} Tristan Ko</p>
        <a href="#top" className="bubbly inline-flex items-center gap-1.5 font-medium hover:text-foreground">
          Back to top
          <ArrowUp aria-hidden className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
