import content from "../content/skills.json";

function Card({ title, children, right }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-surface">
      <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3">
        <div className="text-xs text-muted font-mono">{title}</div>
        {right ? <div className="text-xs text-muted font-mono">{right}</div> : null}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-fg">{content.title}</h2>
          <p className="mt-2 text-sm text-muted">{content.description}</p>
        </div>
        <div className="hidden text-xs text-muted font-mono md:block">$ cat skills.json</div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <Card title="groups" right="tech">
          <div className="space-y-5">
            {content.groups.map((g) => (
              <div key={g.title}>
                <div className="text-xs text-muted font-mono">$ {g.title}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-fg font-mono"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

