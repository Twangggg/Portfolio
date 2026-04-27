import { Link } from "react-router-dom";
import projects from "../content/projects.json";

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-fg">Projects</h2>
          <p className="mt-2 text-sm text-muted">
            Selected work. Each project has a dedicated detail page.
          </p>
        </div>
        <div className="hidden text-xs text-muted font-mono md:block">
          $ ls -la ./projects
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="group rounded-2xl border border-stroke bg-surface p-0 hover:bg-bg transition overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3">
              <div className="text-xs text-muted font-mono">{p.slug}.md</div>
              <div className="text-xs text-muted font-mono">{p.year}</div>
            </div>

            <div className="p-6">
              <div className="text-xs text-muted font-mono">$ open</div>
              <div className="mt-2 text-base font-medium text-fg">{p.name}</div>
              <div className="mt-2 text-sm leading-relaxed text-muted">
                {p.summary}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-fg font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 text-sm text-accent font-mono transition-transform group-hover:translate-x-1">
                view → /projects/{p.slug}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

