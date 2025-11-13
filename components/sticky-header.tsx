"use client";

import { useState, useEffect } from "react";
import { Linkedin, Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigation, type ActiveSection } from "@/components/navigation-wrapper";

const navItems: { label: string; value: Exclude<ActiveSection, "all"> }[] = [
  { label: "Experience", value: "experience" },
  { label: "Projects", value: "projects" },
  { label: "Connect", value: "connect" },
];

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeSection, setActiveSection } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = () => {
    setActiveSection("all");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (section: Exclude<ActiveSection, "all">) => {
    setActiveSection(section);
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
            onClick={handleHomeClick}
            className="text-xl font-bold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
          >
            Tristan Ko
          </button>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 mx-auto">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${activeSection === item.value
                    ? "bg-foreground/10 text-foreground"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>

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

        {/* Mobile Navigation - Below header on small screens */}
        <nav className="md:hidden flex items-center justify-center gap-1 mt-3 pt-3 border-t border-border/20">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`
                px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                ${activeSection === item.value
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
