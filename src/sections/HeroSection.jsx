import site from "../content/site.json";
import ShowcasePanel from "../shared/Showcase/ShowcasePanel.jsx";

export default function HeroSection() {
  const name = site.author?.name || "Your Name";
  const role = site.author?.role || "Backend Developer";
  const tagline = site.tagline || "Backend developer building reliable systems.";

  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-stroke bg-surface">
          <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3">
            <div className="text-xs text-muted font-mono">portfolio.terminal</div>
            <div className="text-xs text-muted font-mono">
              {typeof window === "undefined" ? "…" : "ready"}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <p className="text-xs text-muted font-mono">$ whoami</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg md:text-5xl">
              {name}
            </h1>
            <p className="mt-2 text-base text-muted font-mono">{role}</p>

            <p className="mt-7 text-xs text-muted font-mono">$ mission</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-fg/80">
              {tagline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accentFg hover:opacity-90 transition"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-stroke bg-bg px-4 py-2.5 text-sm font-medium text-fg hover:bg-surface transition"
              >
                Contact
              </a>
              <span className="text-[11px] leading-relaxed text-muted font-mono sm:ml-auto sm:max-w-none max-w-[28ch]">
                Tip:{" "}
                {typeof navigator !== "undefined" &&
                /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
                  ? "⌘K"
                  : "Ctrl K"}{" "}
                to open command palette
              </span>
            </div>
          </div>
        </div>

        <ShowcasePanel />
      </div>
    </section>
  );
}

