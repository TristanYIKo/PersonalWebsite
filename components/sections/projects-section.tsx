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
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management and payment processing.",
    image: "/assets/projects/ecommerce-platform.jpg",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    details: "Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, secure checkout with Stripe integration, and an admin dashboard for inventory management. Implemented real-time stock updates and order tracking.",
    link: "https://example.com/ecommerce",
    github: "https://github.com/tristanko/ecommerce",
  },
  {
    title: "Task Management App",
    description: "Collaborative task manager with team workspaces, real-time updates, and drag-and-drop interface.",
    image: "/assets/projects/task-manager.jpg",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    details: "Developed a real-time collaborative task management application with WebSocket integration for instant updates. Features include team workspaces, drag-and-drop task organization, deadline tracking, and activity notifications.",
    link: "https://example.com/taskmanager",
    github: "https://github.com/tristanko/taskmanager",
  },
  {
    title: "Portfolio Generator",
    description: "AI-powered tool that generates personalized portfolio websites from user data and preferences.",
    image: "/assets/projects/portfolio-generator.jpg",
    tech: ["Python", "FastAPI", "OpenAI API", "React"],
    details: "Created an AI-powered portfolio generator that uses OpenAI's GPT models to create customized portfolio content. Users input their experience and preferences, and the system generates a fully functional website with tailored content and design.",
    github: "https://github.com/tristanko/portfolio-gen",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with customizable widgets and data visualization tools.",
    image: "/assets/projects/analytics-dashboard.jpg",
    tech: ["Vue.js", "D3.js", "Firebase", "Tailwind CSS"],
    details: "Built an interactive analytics dashboard with real-time data visualization using D3.js. Features customizable widget layouts, multiple chart types, data filtering, and Firebase real-time database integration for live updates.",
    link: "https://example.com/analytics",
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-20 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            A selection of recent work and side projects
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-foreground/20 overflow-hidden group"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground text-sm font-medium">
                      {project.title}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {project.image}
                    </p>
                    <p className="text-xs text-muted-foreground/40 mt-4">
                      Add image here
                    </p>
                  </div>
                </div>
              </div>

              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/70 border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-base pt-2">
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
                    className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground/70 border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {selectedProject?.link && (
                <Button asChild variant="default">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </a>
                </Button>
              )}
              {selectedProject?.github && (
                <Button asChild variant="outline">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
