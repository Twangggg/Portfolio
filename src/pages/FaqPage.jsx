import SEO from "../lib/seo.jsx";
import Nav from "../shared/Nav/Nav.jsx";
import CommandPalette from "../shared/CommandPalette/CommandPalette.jsx";
import TutorialModal, { useTutorialState } from "../shared/Tutorial/TutorialModal.jsx";
import content from "../content/faq.json";

function QA({ q, a }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-surface">
      <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3">
        <div className="text-xs text-muted font-mono">$ faq</div>
        <div className="text-xs text-muted font-mono">q&a</div>
      </div>
      <div className="p-6">
        <div className="text-sm text-fg font-mono">Q: {q}</div>
        <div className="mt-3 text-sm leading-relaxed text-fg/80 font-mono">A: {a}</div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const tutorial = useTutorialState();

  return (
    <>
      <SEO title={content.title} description={content.description} path="/faq" />
      <Nav onOpenTutorial={() => tutorial.setOpen(true)} />
      <CommandPalette onOpenTutorial={() => tutorial.setOpen(true)} />
      <TutorialModal open={tutorial.open} onClose={() => tutorial.setOpen(false)} />

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-xs text-muted font-mono">$ cat faq.md</div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg">{content.title}</h1>
        <p className="mt-3 text-lg text-muted">{content.description}</p>

        <div className="mt-10 grid grid-cols-1 gap-4">
          {content.items.map((it) => (
            <QA key={it.q} q={it.q} a={it.a} />
          ))}
        </div>
      </main>
    </>
  );
}

