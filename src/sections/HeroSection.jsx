import { useTerminals } from "../lib/useTerminalStore.jsx";

export default function HeroSection() {
  const { spawn } = useTerminals();

  return (
    <div className="text-center space-y-4">
      <div className="text-muted text-xs font-mono">
        Press <kbd className="px-1.5 py-0.5 rounded border border-stroke bg-surface text-fg">Win</kbd> + <kbd className="px-1.5 py-0.5 rounded border border-stroke bg-surface text-fg">T</kbd> to open a terminal
      </div>
      <button
        type="button"
        onClick={spawn}
        className="group inline-flex items-center gap-3 rounded-2xl border border-stroke bg-surface/30 backdrop-blur-md px-8 py-5 hover:bg-surface/50 transition"
      >
        <span className="text-2xl text-accent font-mono">&gt;_</span>
        <span className="text-sm font-medium text-fg">Terminal</span>
      </button>
    </div>
  );
}
