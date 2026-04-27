export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold tracking-tight text-fg">About</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A short, client-friendly bio. Focus on outcomes: reliability, delivery
            speed, and maintainability.
          </p>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-stroke bg-surface p-6">
          <p className="text-base leading-relaxed text-fg/80">
            I build backend systems for SaaS and internal tools: APIs, data
            pipelines, integrations, and infrastructure that stays boring in
            production.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["APIs", "PostgreSQL", "Caching", "Observability", "Docker"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-fg"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

