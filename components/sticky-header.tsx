"use client";

import { useState, useEffect } from "react";
import { Linkedin, Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`
        sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
        ${isScrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm" 
          : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <button
            onClick={scrollToTop}
            className="text-xl font-bold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
          >
            Tristan Ko
          </button>

          {/* Theme Toggle and Social Links */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://www.linkedin.com/in/tristan-ko/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/TristanYIKo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
