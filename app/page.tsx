import { IntroSection } from "@/components/sections/intro-section";
import { WorkSection } from "@/components/sections/work-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ConnectSection } from "@/components/sections/connect-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <IntroSection />
      <WorkSection />
      <ProjectsSection />
      <ConnectSection />
    </main>
  );
}
