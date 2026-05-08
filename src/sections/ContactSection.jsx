import site from "../content/site.json";

export default function ContactSection() {
  const email = site.author?.email || "you@example.com";
  const github = site.author?.links?.github;
  const facebook = site.author?.links?.facebook;

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-2xl border border-stroke bg-surface p-8">
        <h2 className="text-xl font-semibold tracking-tight text-fg">Contact</h2>
        <p className="mt-2 text-sm text-muted">
          Have a question or want to discuss an opportunity? Feel free to reach out.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accentFg hover:opacity-90 transition"
            href={`mailto:${email}`}
          >
            Email me
          </a>
          {github ? (
            <a className="text-sm text-accent hover:underline" href={github}>
              GitHub
            </a>
          ) : null}
          {facebook ? (
            <a className="text-sm text-accent hover:underline" href={facebook}>
              Facebook
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

