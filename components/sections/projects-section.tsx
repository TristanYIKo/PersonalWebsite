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
  detailsLink?: { text: string; url: string }; // Optional inline link in details
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Toronto Housing Price Predictor",
    description: "AI-driven housing market forecasting model using macroeconomic data, financial indicators, and machine learning.",
    image: "/projects/TorontoHousingPricePredictor.png",
    tech: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Supabase (Postgres)"],
    details: "Built a predictive analytics system that forecasts Toronto housing prices using over 5.782 million rows of historical data from Statistics Canada and the Bank of Canada Valet API. A Python ETL pipeline cleaned, merged, and transformed all datasets into a unified Supabase table. Using this data, I trained seven XGBoost regression models (1–36 month horizons) to analyze long-term market trends. The project includes percent-change forecasts, future price predictions, and structured outputs for visualization.",
    link: "https://toronto-housing-price-predictor.vercel.app/",
    github: "https://github.com/TristanYIKo/TorontoHousingPricePredictor",
  },
  {
    title: "Resonate – Music Rec",
    description: "AI-powered music recommendation app with personalized insights and playlists.",
    image: "/projects/Resonate1.png",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "PostgreSQL", "Spotify Web API", "Recharts"],
    details: "Developed a music recommendation platform using Spotify OAuth and Supabase for secure user data storage. The website analyzes listening history to deliver tailored suggestions, including general recommendations, playlist-based picks, and artist-specific tracks. A dynamic dashboard visualizes listening habits, highlighting peak activity times, favorite artists, songs, and genres.",
    detailsLink: { text: "(Currently in development mode — to request access, please send your full name and email through the contact section at the bottom of this website.)", url: "#connect" },
    link: "https://resonate-song-rec.vercel.app/",
    github: "https://github.com/TristanYIKo/Resonate-SongRec",
  },
  {
    title: "Focusly – Study Tracker",
    description: "Desktop productivity app for managing study sessions and visualizing learning progress.",
    image: "/projects/Focusly.png",
    tech: ["Python", "PySide6", "SQL", "pandas", "matplotlib"],
    details: "Built a multi-mode study tracker featuring ad hoc and Pomodoro timers that record study sessions in an SQL database. The app tracks session duration, study frequency, and overall productivity, while matplotlib visualizes study trends over time. It also includes a built-in to-do list for organizing daily tasks and maintaining focus.",
    github: "https://github.com/TristanYIKo/Focusly-StudyTracker",
  },
  {
    title: "Factor Five",
    description: "Financial analytics platform with industry-based stock analysis and real-time market insights.",
    image: "/projects/FactorFive.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Finnhub API", "NewsAPI"],
    details: "Built a financial analytics platform that evaluates U.S. and select international stocks through industry benchmarking and competitor comparisons. The system analyzes valuation trends, analyst data, and historical performance to generate in-depth company insights. It also includes a live news section that aggregates major and minor market catalysts for real-time awareness.",
    link: "https://factor-five.vercel.app/",
    github: "https://github.com/TristanYIKo/FactorFive",
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
    description: "Top-down 2D RPG featuring combat, exploration, and progression systems.",
    image: "/projects/Shroud.png",
    tech: ["Python", "Pygame"],
    details: "Developed a story-driven RPG using Pygame with visual assets from ",
    detailsLink: { text: "Cute Fantasy RPG", url: "https://kenmi-art.itch.io/cute-fantasy-rpg" },
    github: "https://github.com/TristanYIKo/DungeonCrawlerGamePython",
  },
  {
    title: "Imposter Game",
    description: "Interactive multiplayer game built for fast, in-person group play.",
    image: "/projects/imposterGame.png",
    tech: [ "React", "Next.js", "CSS", "TypeScript", "Framer Motion"],
    details: "Developed a mobile-friendly pass & play Imposter game that allows players to enter names, dynamically assign roles, and reveal them one at a time in a controlled flow. Built a responsive UI with custom sliders for player and imposter count, interactive category selection, and a spinning wheel to determine who speaks first. Implemented smooth transitions, clean state handling, and a visual result screen to enhance the in-person gameplay experience.",
    link: "https://imposter-game-omega.vercel.app/",
    github: "https://github.com/TristanYIKo/ImposterGame",
  },
  {
    title: "Orbit – Retro 2D Game",
    description: "Space-themed infinite runner with custom pixel art and original audio.",
    image: "/projects/Orbit.png",
    tech: ["Java", "AWT", "Swing", "Graphics2D", "ImageIO", "Custom Pixel Art"],
    details: "Developed a 2D infinite runner using Java with fully custom pixel art and sound design. Players navigate through space, avoiding planets while collecting coins that can be spent on special skins in the in-game shop. The game features collision detection, enemy and obstacle generation, progressive difficulty scaling, and a smooth retro arcade aesthetic.",
    github: "https://github.com/TristanYIKo/Orbit-2DRunner",
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section Title - Centered */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16">
          Projects
        </h2>

        {/* Projects Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                {selectedProject?.detailsLink && (
                  <>
                    {selectedProject.title === "Shroud – Python Game" ? (
                      <>
                        <a 
                          href={selectedProject.detailsLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground underline hover:text-foreground/80 transition-colors"
                        >
                          {selectedProject.detailsLink.text}
                        </a>
                        . Players explore open areas, battle monsters, and progress toward defeating the Shroud, an evil legion that has taken over the lands. The game features HP, stamina, and experience systems, smooth combat mechanics, sprite animations, and map transitions. Currently in active development with plans for new areas, abilities, and storyline expansion.
                      </>
                    ) : (
                      <>
                        {" "}
                        <a 
                          href={selectedProject.detailsLink.url}
                          className="italic text-muted-foreground/80 hover:text-muted-foreground transition-colors"
                        >
                          {selectedProject.detailsLink.text}
                        </a>
                      </>
                    )}
                  </>
                )}
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
