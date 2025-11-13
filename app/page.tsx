"use client";

import { IntroSection } from "@/components/sections/intro-section";
import { WorkSection } from "@/components/sections/work-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ConnectSection } from "@/components/sections/connect-section";
import { useNavigation } from "@/components/navigation-wrapper";

export default function Home() {
  const { activeSection } = useNavigation();

  return (
    <main className="min-h-screen relative">
      {/* Global background container with grid - inherited by all sections */}
      <div className="relative">
        {/* Show intro only when viewing all sections */}
        {activeSection === "all" && <IntroSection />}
        
        {/* Show work section when "all" or "experience" is active */}
        {(activeSection === "all" || activeSection === "experience") && (
          <WorkSection />
        )}
        
        {/* Show projects section when "all" or "projects" is active */}
        {(activeSection === "all" || activeSection === "projects") && (
          <ProjectsSection />
        )}
        
        {/* Show connect section when "all" or "connect" is active */}
        {(activeSection === "all" || activeSection === "connect") && (
          <ConnectSection />
        )}
      </div>
    </main>
  );
}
