"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  details: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Resonate – Music Rec",
    description: "AI-powered music recommendation platform with personalized playlists and insights.",
    image: "/projects/Resonate1.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "PostgreSQL", "Spotify Web API", "Recharts"],
    details: "Built a music recommendation platform that leverages the Spotify Web API to provide personalized music suggestions. Features include user authentication, playlist creation, listening analytics with interactive charts, and real-time data visualization.",
    link: "https://resonate-song-rec.vercel.app/",
    github: "https://github.com/TristanYIKo/Resonate-SongRec",
  },
  {
    title: "Factor Five",
    description: "Financial analytics platform with real-time market data and news integration.",
    image: "/projects/FactorFive.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Finnhub API", "NewsAPI"],
    details: "Developed a comprehensive financial analytics dashboard that aggregates real-time market data and news. Features interactive charts, stock tracking, market trends analysis, and personalized news feeds for informed investment decisions.",
    link: "https://factor-five.vercel.app/",
    github: "https://github.com/TristanYIKo/FactorFive",
  },
  {
    title: "Focusly – Study Tracker",
    description: "Desktop productivity application for tracking study sessions and analyzing learning patterns.",
    image: "",
    tech: ["Python", "PySide6", "SQL", "pandas", "matplotlib"],
    details: "Created a desktop study tracking application with session management, time analytics, and visual progress reports. Includes SQLite database for data persistence, pandas for data analysis, and matplotlib for generating insightful productivity charts.",
    github: "https://github.com/TristanYIKo/Focusly-StudyTracker",
  },
  {
    title: "Excel Calendar",
    description: "Automated calendar system with dynamic event management and scheduling features.",
    image: "/projects/ExcelCalendar.png",
    tech: ["Excel", "VBA"],
    details: "Built an interactive Excel-based calendar system using VBA macros for automated date calculations, event scheduling, and recurring task management. Features include color-coded events, monthly/yearly views, and custom reminder system.",
    github: "https://github.com/TristanYIKo/ExcelCalendar",
  },
  {
    title: "Excel Financial Tracker",
    description: "Personal finance management tool with budgeting, expense tracking, and forecasting.",
    image: "/projects/ExcelFinancialTracker.png",
    tech: ["Excel", "VBA"],
    details: "Developed a comprehensive financial tracking spreadsheet with automated expense categorization, budget monitoring, and trend analysis. Includes custom VBA functions for transaction importing, data validation, and generating monthly financial reports.",
    github: "https://github.com/TristanYIKo/FinancialPlanner-Excel",
  },
  {
    title: "Shroud – Python Game",
    description: "Mystery adventure game with puzzle-solving mechanics and atmospheric storytelling.",
    image: "",
    tech: ["Python", "Pygame"],
    details: "Created an immersive adventure game using Pygame with custom sprite animations, collision detection, inventory system, and puzzle mechanics. Features include save/load functionality, dynamic soundscapes, and multiple ending paths based on player choices.",
    github: "https://github.com/TristanYIKo/DungeonCrawlerGamePython",
  },
  {
    title: "Orbit – Retro 2D Game",
    description: "Space-themed arcade game with custom pixel art and classic gameplay mechanics.",
    image: "/projects/Orbit.png",
    tech: ["Java", "AWT", "Swing", "Graphics2D", "ImageIO", "Custom Pixel Art"],
    details: "Built a retro-style arcade game with hand-crafted pixel art assets and smooth 2D animations. Implemented game physics, collision systems, enemy AI, power-ups, and progressive difficulty scaling. Features custom graphics rendering and sprite management.",
    github: "https://github.com/TristanYIKo/Orbit-2DRunner",
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-20 bg-background">
      <div className="mx-auto max-w-5xl">
        {/* Section Title - Centered */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16">
          Projects
        </h2>

        {/* Projects Grid - 2 columns on desktop, 1 on mobile, tight gaps */}
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="h-full"
            >
              <div
                className="cursor-pointer bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border h-full flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden bg-muted/20">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                      style={{ objectPosition: 'top left' }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-muted-foreground text-sm font-medium">
                          {project.title}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-2">
                          Image coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Title */}
                <div className="px-6 pt-6 pb-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                </div>

                {/* Tech Stack Badges */}
                <div className="px-6 pb-6 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-medium text-foreground/70 bg-muted/50 rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-base pt-2 text-muted-foreground">
              {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">About this project</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedProject?.details}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-medium text-foreground/70 bg-muted/50 rounded-full border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(selectedProject?.link || selectedProject?.github) && (
              <div className="flex gap-3 pt-4">
                {selectedProject?.link && (
                  <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {selectedProject?.github && (
                  <Button asChild variant="outline" className="border-border text-foreground hover:bg-muted/50 rounded-lg">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
