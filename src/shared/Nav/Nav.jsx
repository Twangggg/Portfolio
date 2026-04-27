import { Link } from "react-router-dom";
import site from "../../content/site.json";

const items = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQ", href: "/faq" }
];

export default function Nav({ onOpenTutorial }) {
  return (
    <header className="sticky top-0 z-30 border-b border-stroke bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-sm font-medium tracking-tight text-fg">
          {site.author?.name || "Your Name"}
        </Link>
        <nav className="flex items-center gap-3 text-sm text-muted">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((i) => (
              <a
                key={i.label}
                href={i.href}
                className="hover:text-fg transition-colors"
              >
                {i.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpenTutorial}
            className="shrink-0 rounded-lg border border-stroke bg-surface px-2.5 py-1 text-xs text-muted hover:text-fg hover:bg-bg transition font-mono"
          >
            Help
          </button>
        </nav>
      </div>
    </header>
  );
}

