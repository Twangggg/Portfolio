import { Link } from "react-router-dom";
import site from "../../content/site.json";
import { useTerminals } from "../../lib/useTerminalStore.jsx";

const items = ["About", "Skills", "Projects", "Contact"];

export default function Nav() {
  const { sendToTerminal } = useTerminals();

  return (
    <header className="sticky top-0 z-30 border-b border-stroke bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-sm font-medium tracking-tight text-fg">
          {site.author?.name || "Your Name"}
        </Link>
        <nav className="flex items-center gap-3 text-sm text-muted">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => sendToTerminal(label.toLowerCase())}
                className="hover:text-fg transition-colors"
              >
                {label}
              </button>
            ))}

          </div>
        </nav>
      </div>
    </header>
  );
}
