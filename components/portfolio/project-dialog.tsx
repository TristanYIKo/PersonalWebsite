"use client";

import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryTone, type Project } from "@/lib/data";
import { toneClass } from "@/lib/tones";
import { cn } from "@/lib/utils";

const chip = "rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80";

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88svh] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto rounded-3xl border-border bg-card p-6 text-card-foreground sm:rounded-3xl md:p-8">
        {project && (
          <>
            <DialogHeader className="gap-3">
              <span
                className={cn(
                  "w-fit rounded-full px-3 py-1 text-xs font-semibold",
                  toneClass[categoryTone[project.category]],
                )}
              >
                {project.category}
              </span>
              <DialogTitle className="font-display text-3xl font-bold leading-tight">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-base">{project.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              <section>
                <h4 className="mb-2 text-sm font-semibold">About this project</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.details}
                  {project.detailsLink && (
                    <a
                      href={project.detailsLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-2"
                    >
                      {project.detailsLink.text}
                    </a>
                  )}
                  {project.detailsAfter}
                </p>
                {project.note && (
                  <a
                    href={project.note.href}
                    onClick={(e) => {
                      // The dialog locks page scroll, so close it first and then follow the link.
                      e.preventDefault();
                      onOpenChange(false);
                      const href = project.note?.href;
                      if (href) setTimeout(() => (window.location.hash = href), 150);
                    }}
                    className="mt-3 block text-sm italic text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    {project.note.text}
                  </a>
                )}
              </section>

              <section>
                <h4 className="mb-3 text-sm font-semibold">Technologies</h4>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech} className={chip}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>

              {(project.link || project.github) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.link && (
                    <Button asChild className="rounded-full">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink aria-hidden className="mr-2 h-4 w-4" />
                        Live demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button asChild variant="outline" className="rounded-full">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github aria-hidden className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
