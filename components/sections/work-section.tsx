"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Supply Chain Intern",
    company: "Iovate Health Sciences International Inc.",
    period: "May 2025 – Aug 2025",
    location: "Oakville, ON",
    description: "Developing Excel and Python-based tools to streamline supply chain processes and creating a Power BI dashboard to visualize key supply chain metrics for real-time decision-making.",
    achievements: [
      "Built automated Excel and Python tools to enhance operational efficiency and reduce manual workload",
      "Designed and implemented a Power BI dashboard providing real-time insights into supply chain performance",
      "Collaborated with cross-functional teams to identify process improvement opportunities and implement data-driven solutions",
    ],
  },
  {
    role: "Firmware Developer",
    company: "UW Orbital",
    period: "Jan 2025 – May 2025",
    location: "Waterloo, ON",
    description: "Contributing to the development of firmware for a CubeSat satellite as part of the Canadian Satellite Design Challenge, focusing on embedded systems and satellite communication protocols.",
    achievements: [
      "Developed and tested firmware components for CubeSat satellite systems using embedded C and real-time operating systems",
      "Implemented communication protocols to ensure reliable data transmission between satellite subsystems",
      "Participated in code reviews and collaborative debugging sessions to maintain high-quality, mission-critical code",
    ],
  },
];

export function WorkSection() {
  return (
    <section id="work" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            My professional journey and key accomplishments
          </p>
        </div>

        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{
                duration: 0.35,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 hidden md:block">
                <div className="h-3 w-3 -ml-[5px] rounded-full bg-foreground border-2 border-background" />
              </div>

              <Card className="md:ml-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-foreground/20">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-2xl">{exp.role}</CardTitle>
                    <span className="text-sm font-medium text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <CardDescription className="text-base font-medium">
                    {exp.company}
                    {exp.location && (
                      <span className="text-sm text-muted-foreground block mt-1">
                        {exp.location}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {exp.description}
                  </p>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2 text-muted-foreground/50">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
