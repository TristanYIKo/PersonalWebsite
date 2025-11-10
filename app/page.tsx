import { IntroSection } from "@/components/sections/intro-section";
import { WorkSection } from "@/components/sections/work-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ConnectSection } from "@/components/sections/connect-section";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Global background container with grid - inherited by all sections */}
      <div className="relative">
        <IntroSection />
        <WorkSection />
        <ProjectsSection />
        <ConnectSection />
      </div>
    </main>
  );
}
