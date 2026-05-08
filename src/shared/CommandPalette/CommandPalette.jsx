import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import site from "../../content/site.json";
import { useTerminals } from "../../lib/useTerminalStore.jsx";

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform);
}

function Kbd({ children }) {
  return (
    <kbd className="px-1.5 py-0.5 rounded border border-stroke bg-bg text-xs text-muted font-mono leading-none">
      {children}
    </kbd>
  );
}

function useCmdK(setOpen) {
  useEffect(() => {
    const onKeyDown = (e) => {
      const cmdOrCtrl = isMac() ? e.metaKey : e.ctrlKey;
      if (cmdOrCtrl && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);
}

const shortcutLabel = (mac, win) => (isMac() ? mac : win);

export default function CommandPalette() {
  const navigate = useNavigate();
  const { sendToTerminal } = useTerminals();
  const [open, setOpen] = useState(false);

  useCmdK(setOpen);

  const email = site.author?.email;
  const github = site.author?.links?.github;
  const facebook = site.author?.links?.facebook;

  const shortcuts = [
    { keys: [shortcutLabel("⌘K", "Ctrl+K")], label: "Open commands" },
    { keys: [shortcutLabel("⌘T", "Win+T")], label: "Open a new terminal" },
    { keys: ["Esc"], label: "Close / go back" },
    { keys: ["↑", "↓"], label: "Navigate items" },
    { keys: ["Enter"], label: "Confirm selection" },
  ];

  const actions = [
    { id: "home", label: "Go to home", run: () => navigate("/") },
    { id: "about", label: "About", run: () => sendToTerminal("about") },
    { id: "skills", label: "Skills", run: () => sendToTerminal("skills") },
    { id: "projects", label: "Projects", run: () => sendToTerminal("projects") },
    { id: "contact", label: "Contact", run: () => sendToTerminal("contact") },
    ...(email
      ? [
          { id: "copy-email", label: "Copy email", run: () => navigator.clipboard.writeText(email) },
          { id: "email-me", label: "Email me", run: () => window.location.assign(`mailto:${email}`) },
        ]
      : []),
    ...(github
      ? [{ id: "github", label: "Open GitHub", run: () => window.open(github, "_blank", "noreferrer") }]
      : []),
    ...(facebook
      ? [{ id: "facebook", label: "Open Facebook", run: () => window.open(facebook, "_blank", "noreferrer") }]
      : []),
  ];

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-xl border border-stroke bg-surface px-3 py-2 text-xs text-muted hover:text-fg hover:bg-bg transition"
      >
        {isMac() ? "⌘K" : "Ctrl K"} · Commands
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Command keys"
    >
      <button
        type="button"
        className="absolute inset-0 bg-bg/70"
        onClick={() => setOpen(false)}
        aria-label="Close"
      />

      <div className="relative w-[min(520px,calc(100%-2rem))] max-h-[80vh] overflow-y-auto rounded-2xl border border-stroke bg-surface p-0">
        <div className="flex items-center justify-between border-b border-stroke bg-bg px-5 py-3 rounded-t-2xl">
          <div className="text-xs text-muted font-mono">$ command keys</div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs text-muted hover:text-fg font-mono"
          >
            [x]
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Keyboard Shortcuts */}
          <section>
            <h3 className="text-[11px] text-muted font-mono tracking-wider uppercase mb-3">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-1">
              {shortcuts.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-bg transition"
                >
                  <span className="text-sm text-fg font-mono">{s.label}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((k, j) => (
                      <span key={j}>
                        <Kbd>{k}</Kbd>
                        {j < s.keys.length - 1 && (
                          <span className="text-muted mx-0.5 text-xs">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h3 className="text-[11px] text-muted font-mono tracking-wider uppercase mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {actions.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => {
                    Promise.resolve(a.run()).finally(() => setOpen(false));
                  }}
                  className="text-left py-2 px-3 rounded-lg text-sm text-fg font-mono hover:bg-bg transition"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
