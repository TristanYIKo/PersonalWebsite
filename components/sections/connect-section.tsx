import { Linkedin, Github, Instagram, Mail } from "lucide-react";

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
    href: "mailto:Tristanko1116@gmail.com",
    icon: Mail,
    label: "Send an email",
  },
];

export function ConnectSection() {
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

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="group flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-foreground/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Icon className="h-8 w-8 text-foreground/60 group-hover:text-foreground transition-colors" />
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
