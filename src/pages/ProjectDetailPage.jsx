import { Link, useParams } from "react-router-dom";
import projects from "../content/projects.json";
import SEO from "../lib/seo.jsx";
import CommandPalette from "../shared/CommandPalette/CommandPalette.jsx";
import TutorialModal, { useTutorialState } from "../shared/Tutorial/TutorialModal.jsx";
import Nav from "../shared/Nav/Nav.jsx";

function findProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProject(slug);
  const tutorial = useTutorialState();

  if (!project) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <SEO title="Project not found" path={`/projects/${slug}`} />
        <div className="text-sm text-muted">404</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg">
          Project not found
        </h1>
        <p className="mt-4 text-muted">
          The project you’re looking for doesn’t exist (yet).
        </p>
        <Link className="mt-8 inline-block text-accent hover:underline" to="/">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={project.name}
        description={project.summary}
        path={`/projects/${project.slug}`}
      />
      <Nav onOpenTutorial={() => tutorial.setOpen(true)} />
      <CommandPalette onOpenTutorial={() => tutorial.setOpen(true)} />
      <TutorialModal open={tutorial.open} onClose={() => tutorial.setOpen(false)} />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link className="text-sm text-accent hover:underline" to="/">
          ← Home
        </Link>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg">
        {project.name}
      </h1>
      <p className="mt-3 text-lg text-muted">{project.summary}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-stroke bg-surface p-5">
          <div className="text-[11px] uppercase tracking-wide text-muted font-mono">
            role
          </div>
          <div className="mt-2 text-fg font-mono">{project.role}</div>
        </div>
        <div className="rounded-2xl border border-stroke bg-surface p-5">
          <div className="text-[11px] uppercase tracking-wide text-muted font-mono">
            year
          </div>
          <div className="mt-2 text-fg font-mono">{project.year}</div>
        </div>
        <div className="rounded-2xl border border-stroke bg-surface p-5">
          <div className="text-[11px] uppercase tracking-wide text-muted font-mono">
            tech
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-fg font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-stroke bg-surface">
        <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3">
          <div className="text-xs text-muted font-mono">case-study.log</div>
          <div className="text-xs text-muted font-mono">{project.slug}</div>
        </div>

        <div className="p-6">
          <div className="text-xs text-muted font-mono">$ cat highlights.txt</div>
          <ul className="mt-4 space-y-2 text-muted">
            {project.highlights.map((h) => (
              <li key={h} className="leading-relaxed font-mono">
                - {h}
              </li>
            ))}
          </ul>

          {project.caseStudy ? (
            <div className="mt-8 space-y-6">
              <div>
                <div className="text-xs text-muted font-mono">$ problem</div>
                <div className="mt-2 text-sm leading-relaxed text-fg/80 font-mono">
                  {project.caseStudy.problem}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted font-mono">$ approach</div>
                <div className="mt-2 text-sm leading-relaxed text-fg/80 font-mono">
                  {project.caseStudy.approach}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted font-mono">$ outcome</div>
                <div className="mt-2 text-sm leading-relaxed text-fg/80 font-mono">
                  {project.caseStudy.outcome}
                </div>
              </div>

              {Array.isArray(project.caseStudy.metrics) &&
              project.caseStudy.metrics.length ? (
                <div>
                  <div className="text-xs text-muted font-mono">$ metrics</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.caseStudy.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-fg font-mono"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        </div>
      </div>
    </>
  );
}

