import Nav from "../shared/Nav/Nav.jsx";
import CommandPalette from "../shared/CommandPalette/CommandPalette.jsx";
import TutorialModal, { useTutorialState } from "../shared/Tutorial/TutorialModal.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import SkillsSection from "../sections/SkillsSection.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import ContactSection from "../sections/ContactSection.jsx";
import SEO from "../lib/seo.jsx";

export default function HomePage() {
  const tutorial = useTutorialState();

  return (
    <>
      <SEO title="" path="/" />
      <Nav onOpenTutorial={() => tutorial.setOpen(true)} />
      <CommandPalette onOpenTutorial={() => tutorial.setOpen(true)} />
      <TutorialModal open={tutorial.open} onClose={() => tutorial.setOpen(false)} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}

