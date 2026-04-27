import { useEffect, useMemo, useState } from "react";

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform);
}

const STORAGE_KEY = "portfolio_tutorial_seen_v1";

export default function TutorialModal({ open, onClose }) {
  const shortcut = useMemo(() => (isMac() ? "⌘K" : "Ctrl K"), []);

  // lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const markSeen = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  const close = () => {
    markSeen();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Quick tutorial">
      <button
        type="button"
        className="absolute inset-0 bg-bg/75"
        onClick={close}
        aria-label="Close tutorial"
      />

      <div className="relative mx-auto mt-16 w-[min(860px,calc(100%-2rem))] overflow-hidden rounded-2xl border border-stroke bg-surface">
        <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3">
          <div className="text-xs text-muted font-mono">quickstart.txt</div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg border border-stroke bg-surface px-2.5 py-1 text-xs text-muted hover:text-fg hover:bg-bg transition font-mono"
          >
            ESC / Close
          </button>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-fg">
            This site looks like a terminal — but you don’t need terminal knowledge.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Think of it as a clean navigation style. Everything is still clickable like any normal website.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-stroke bg-bg p-5">
              <div className="text-xs text-muted font-mono">$ 1. Open the command menu</div>
              <div className="mt-3 text-sm text-fg/80">
                Press <span className="font-mono text-fg">{shortcut}</span> or click the{" "}
                <span className="font-mono text-fg">Command</span> button at the bottom-right.
              </div>
              <div className="mt-3 text-xs text-muted font-mono">
                Tip: type “projects” or “email”, then press Enter.
              </div>
            </div>

            <div className="rounded-2xl border border-stroke bg-bg p-5">
              <div className="text-xs text-muted font-mono">$ 2. Navigate normally</div>
              <div className="mt-3 text-sm text-fg/80">
                Use the top navigation (About / Projects / Contact). It works like a regular page —
                the terminal text is just the visual style.
              </div>
              <div className="mt-3 text-xs text-muted font-mono">
                You can always scroll as usual.
              </div>
            </div>

            <div className="rounded-2xl border border-stroke bg-bg p-5">
              <div className="text-xs text-muted font-mono">$ 3. Open a project</div>
              <div className="mt-3 text-sm text-fg/80">
                Each project card opens a dedicated detail page. On that page, you’ll see a case-study
                format: <span className="font-mono text-fg">$ problem</span>,{" "}
                <span className="font-mono text-fg">$ approach</span>,{" "}
                <span className="font-mono text-fg">$ outcome</span>.
              </div>
            </div>

            <div className="rounded-2xl border border-stroke bg-bg p-5">
              <div className="text-xs text-muted font-mono">$ 4. Contact in one click</div>
              <div className="mt-3 text-sm text-fg/80">
                Use the command menu to copy the email or open GitHub/LinkedIn. No “terminal commands”
                needed — it’s just a quick launcher.
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted font-mono">
              You can reopen this any time via <span className="text-fg">{shortcut}</span> → “Tutorial”.
            </div>
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accentFg hover:opacity-90 transition"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useTutorialState() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY) === "1";
      if (!seen) setOpen(true);
    } catch {
      setOpen(false);
    }
  }, []);

  return {
    open,
    setOpen,
  };
}

