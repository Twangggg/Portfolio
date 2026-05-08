import { useEffect } from "react";
import Nav from "../shared/Nav/Nav.jsx";
import CommandPalette from "../shared/CommandPalette/CommandPalette.jsx";
import TutorialModal, { useTutorialState } from "../shared/Tutorial/TutorialModal.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import TerminalWindow from "../components/TerminalWindow.jsx";
import { TerminalProvider, useTerminals } from "../lib/useTerminalStore.jsx";
import SEO from "../lib/seo.jsx";

function HomePageInner() {
  const tutorial = useTutorialState();
  const { terminals, spawn } = useTerminals();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey && e.key === "t") {
        e.preventDefault();
        spawn();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [spawn]);

  return (
    <>
      <SEO title="" path="/" />
      <Nav />
      <CommandPalette />
      <TutorialModal open={tutorial.open} onClose={() => tutorial.setOpen(false)} />
      <main className="h-full flex items-start justify-center pt-28">
        <HeroSection />
      </main>
      {terminals.map((t) => (
        <TerminalWindow key={t.id} id={t.id} x={t.x} y={t.y} zIndex={t.zIndex} width={t.width} height={t.height} />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <TerminalProvider>
      <HomePageInner />
    </TerminalProvider>
  );
}
