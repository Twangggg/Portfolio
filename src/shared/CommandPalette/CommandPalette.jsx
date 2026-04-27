import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import site from "../../content/site.json";

function isMac() {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform);
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

async function tryCopy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function CommandPalette({ onOpenTutorial }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useCmdK(setOpen);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    // focus after paint
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const actions = useMemo(() => {
    const email = site.author?.email;
    const github = site.author?.links?.github;
    const linkedin = site.author?.links?.linkedin;

    const list = [
      {
        id: "go-home",
        label: "Go to home",
        hint: "/",
        run: () => navigate("/"),
      },
      ...(onOpenTutorial
        ? [
            {
              id: "open-tutorial",
              label: "Tutorial: How to use this site",
              hint: "help",
              run: () => onOpenTutorial(),
            },
          ]
        : []),
      {
        id: "jump-about",
        label: "Jump: About",
        hint: "#about",
        run: () => {
          navigate("/");
          setTimeout(() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }), 0);
        },
      },
      {
        id: "jump-projects",
        label: "Jump: Projects",
        hint: "#projects",
        run: () => {
          navigate("/");
          setTimeout(() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }), 0);
        },
      },
      {
        id: "jump-skills",
        label: "Jump: Skills",
        hint: "#skills",
        run: () => {
          navigate("/");
          setTimeout(() => document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" }), 0);
        },
      },
      {
        id: "jump-contact",
        label: "Jump: Contact",
        hint: "#contact",
        run: () => {
          navigate("/");
          setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 0);
        },
      },
      {
        id: "open-faq",
        label: "Open: FAQ",
        hint: "/faq",
        run: () => navigate("/faq"),
      },
    ];

    if (email) {
      list.push({
        id: "copy-email",
        label: "Copy email",
        hint: email,
        run: async () => {
          await tryCopy(email);
        },
      });
      list.push({
        id: "email-me",
        label: "Email me",
        hint: `mailto:${email}`,
        run: () => window.location.assign(`mailto:${email}`),
      });
    }

    if (github) {
      list.push({
        id: "open-github",
        label: "Open GitHub",
        hint: "external",
        run: () => window.open(github, "_blank", "noreferrer"),
      });
    }
    if (linkedin) {
      list.push({
        id: "open-linkedin",
        label: "Open LinkedIn",
        hint: "external",
        run: () => window.open(linkedin, "_blank", "noreferrer"),
      });
    }

    if (pathname.startsWith("/projects/")) {
      list.push({
        id: "back-home",
        label: "Back to home",
        hint: "route",
        run: () => navigate("/"),
      });
    }

    return list;
  }, [navigate, pathname]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.hint}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    if (activeIndex >= filtered.length) setActiveIndex(0);
  }, [activeIndex, filtered.length]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const action = filtered[activeIndex];
        if (!action) return;
        Promise.resolve(action.run()).finally(() => setOpen(false));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIndex]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 rounded-xl border border-stroke bg-surface px-3 py-2 text-xs text-muted hover:text-fg hover:bg-bg transition"
      >
        {isMac() ? "⌘K" : "Ctrl K"} · Command
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        className="absolute inset-0 bg-bg/70"
        onClick={() => setOpen(false)}
        aria-label="Close"
      />

      <div className="relative mx-auto mt-24 w-[min(720px,calc(100%-2rem))] overflow-hidden rounded-2xl border border-stroke bg-surface">
        <div className="flex items-center gap-3 border-b border-stroke bg-bg px-4 py-3">
          <span className="text-xs text-muted font-mono">$</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command…"
            className="w-full bg-transparent text-sm text-fg placeholder:text-muted outline-none font-mono"
          />
          <span className="text-[11px] text-muted">{isMac() ? "ESC" : "Esc"}</span>
        </div>

        <ul className="max-h-[420px] overflow-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-sm text-muted font-mono">
              No matches. Try “projects”, “email”, “contact”.
            </li>
          ) : (
            filtered.map((a, idx) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => Promise.resolve(a.run()).finally(() => setOpen(false))}
                  className={[
                    "w-full px-4 py-3 text-left transition",
                    "hover:bg-bg",
                    idx === activeIndex ? "bg-bg" : "bg-transparent",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm text-fg font-mono">{a.label}</div>
                    <div className="text-xs text-muted font-mono">{a.hint}</div>
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

