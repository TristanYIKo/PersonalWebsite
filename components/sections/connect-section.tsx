"use client";

import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tristan-ko/",
    icon: Linkedin,
    label: "Connect on LinkedIn",
  },
  {
    name: "GitHub",
    href: "https://github.com/TristanYIKo",
    icon: Github,
    label: "View GitHub profile",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/tristan__ko/",
    icon: Instagram,
    label: "Follow on Instagram",
  },
  {
    name: "Email",
    href: "mailto:tristanko1116@gmail.com",
    icon: Mail,
    label: "Send an email",
  },
];

// Container animation for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Individual card animation
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 10,
    },
  },
};

export function ConnectSection() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open("mailto:tristanko1116@gmail.com", "_blank", "noreferrer");
  };

  return (
    <section id="connect" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in working together or just want to say hi? Feel free to reach out through any of these platforms.
            </p>
          </div>

          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            {socialLinks.map((link) => {
              const Icon = link.icon;
              const isEmail = link.name === "Email";
              
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={isEmail ? handleEmailClick : undefined}
                  aria-label={link.label}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.08,
                    transition: {
                      type: "spring",
                      stiffness: 160,
                      damping: 12,
                    }
                  }}
                  className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-foreground/20 hover:shadow-2xl transition-colors duration-300"
                >
                  <Icon className="h-8 w-8 text-foreground/60 group-hover:text-foreground transition-colors" />
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
