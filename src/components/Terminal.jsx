import { forwardRef, useState, useRef, useEffect, useCallback, useImperativeHandle } from "react";
import site from "../content/site.json";
import skills from "../content/skills.json";
import projects from "../content/projects.json";
import TerminalFetcher from "./TerminalFetcher.jsx";

const asciiBanner = `
 ████████╗██╗    ██╗ █████╗ ███╗   ██╗ ██████╗
 ╚══██╔══╝██║    ██║██╔══██╗████╗  ██║██╔════╝
    ██║   ██║ █╗ ██║███████║██╔██╗ ██║██║  ███╗
    ██║   ██║███╗██║██╔══██║██║╚██╗██║██║   ██║
    ██║   ╚███╔███╔╝██║  ██║██║ ╚████║╚██████╔╝
    ╚═╝    ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝
`.trim();

const cmds = {
  help: {
    desc: "Show available commands",
    fn: () => [
      "",
      "Available commands:",
      ...Object.entries(cmds)
        .map(([name, cmd]) => `  ${name.padEnd(14)} ${cmd.desc}`),
      "",
    ],
  },
  neofetch: {
    desc: "Display system information",
    fn: () => [<TerminalFetcher key="fetch" />],
  },
  whoami: {
    desc: "Display current user",
    fn: () => [<span key="w" className="font-semibold">{site.author?.name || "Unknown"}</span>],
  },
  about: {
    desc: "About me",
    fn: () => [
      "",
      <div key="a1" className="text-sm text-fg">
        <span className="font-semibold">{site.author?.name}</span><span className="text-muted"> — </span>{site.author?.role}
      </div>,
      <div key="a2" className="text-sm text-muted">
        <span className="font-semibold text-fg">"{site.tagline}"</span>
      </div>,
      "",
    ],
  },
  skills: {
    desc: "List technical skills",
    fn: () => [
      "",
      ...skills.groups.flatMap((g) => [
        <div key={g.title} className="flex items-baseline gap-2 text-sm text-fg">
          <span className="text-accent shrink-0">▸</span>
          <span className="font-semibold">{g.title}</span>
        </div>,
        <div key={`${g.title}-s`} className="pl-6 text-sm text-muted leading-relaxed">
          {g.items.join(", ")}
        </div>,
      ]),
      "",
    ],
  },
  projects: {
    desc: "List projects",
    fn: () => [
      "",
      ...projects.flatMap((p) => [
        <div key={p.slug} className="flex items-baseline gap-2 text-sm text-fg">
          <span className="text-accent shrink-0 font-bold">◆</span>
          <span className="font-semibold">{p.name}</span>
          <span className="text-muted text-xs">({p.year})</span>
        </div>,
        <div key={`${p.slug}-r`} className="flex items-baseline gap-2 pl-6 text-sm leading-relaxed">
          <span className="text-accent/70 text-xs">role</span>
          <span className="text-fg">{p.role}</span>
        </div>,
        <div key={`${p.slug}-t`} className="flex items-baseline gap-2 pl-6 text-sm leading-relaxed">
          <span className="text-accent/70 text-xs">tech</span>
          <span className="text-fg">{p.tech.join(", ")}</span>
        </div>,
        <div key={`${p.slug}-s`} className="flex items-baseline gap-2 pl-6 text-sm leading-relaxed">
          <span className="text-accent/70 text-xs">desc</span>
          <span className="text-muted">{p.summary}</span>
        </div>,
        <div key={`${p.slug}-gap`} className="h-1" />,
      ]),
      "",
    ],
  },
  contact: {
    desc: "Show contact information",
    fn: () => [
      "",
      <div key="c1" className="flex items-baseline gap-2 text-sm">
        <span className="text-accent">email</span>
        <span className="text-fg font-semibold">{site.author?.email || "N/A"}</span>
      </div>,
      <div key="c2" className="flex items-baseline gap-2 text-sm">
        <span className="text-accent">github</span>
        <span className="text-fg font-semibold">{site.author?.links?.github || "N/A"}</span>
      </div>,
      <div key="c3" className="flex items-baseline gap-2 text-sm">
        <span className="text-accent">facebook</span>
        <span className="text-fg font-semibold">{site.author?.links?.facebook || "N/A"}</span>
      </div>,
      "",
    ],
  },
  ls: {
    desc: "List available sections",
    fn: () => ["", "  about   projects   skills   contact", ""],
  },
  date: {
    desc: "Show current date and time",
    fn: () => [`  ${new Date().toLocaleString()}`],
  },
  echo: {
    desc: "Echo input back",
    fn: (args) => [`  ${args.join(" ")}`],
  },
  clear: {
    desc: "Clear the terminal",
    fn: () => "CLEAR",
  },
  banner: {
    desc: "Show ASCII banner",
    fn: () => ["", asciiBanner, ""],
  },
  repo: {
    desc: "Show GitHub repository",
    fn: () => [<span key="r" className="font-semibold">{site.author?.links?.github || "N/A"}</span>],
  },
  email: {
    desc: "Show email address",
    fn: () => [<span key="e" className="font-semibold">{site.author?.email || "N/A"}</span>],
  },
};

const cmdNames = Object.keys(cmds);

const Terminal = forwardRef(function Terminal(_props, ref) {
  const [lines, setLines] = useState([
    { text: "Type 'help' to see available commands.", type: "output" },
    { text: "", type: "output" },
    { text: <TerminalFetcher key="init" />, type: "output" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const suggestion = (() => {
    const val = input.trim().toLowerCase();
    if (!val) return "";
    const match = cmdNames.find((n) => n.startsWith(val) && n !== val);
    if (match) return { text: match.slice(val.length), found: true };
    return { text: "not found", found: false };
  })();

  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const processCmd = useCallback(
    (cmd) => {
      const parts = cmd.trim().match(/(?:[^\s"]+|"[^"]*")+/g) || [];
      const name = parts[0]?.toLowerCase();
      const args = parts.slice(1).map((a) => a.replace(/^"|"$/g, ""));

      if (!name) return;

      setLines((prev) => [...prev, { text: `$ ${cmd}`, type: "input" }]);
      setHistory((prev) => [...prev, cmd]);
      setHistoryIdx(-1);

      const cmdObj = cmds[name];
      if (!cmdObj) {
        setLines((prev) => [
          ...prev,
          { text: `  ${name}: command not found`, type: "output" },
        ]);
        return;
      }

      const result = cmdObj.fn(args);
      if (result === "CLEAR") {
        setLines([]);
      } else {
        setLines((prev) => [
          ...prev,
          ...result.map((r) => ({ text: r, type: "output" })),
        ]);
      }
    },
    []
  );

  useImperativeHandle(ref, () => ({ processCmd }), []);

  const onSubmit = (e) => {
    e.preventDefault();
    processCmd(input);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Tab" && suggestion && suggestion.found) {
      e.preventDefault();
      setInput(input.trim().toLowerCase() + suggestion.text);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
      setHistoryIdx(newIdx);
      setInput(history[history.length - 1 - newIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[history.length - 1 - newIdx] || "");
      }
    }
  };

  return (
    <div
      className="font-mono text-sm leading-relaxed"
      onClick={focusInput}
    >
      <div className="max-h-[60vh] overflow-y-auto mb-2 space-y-0.5">
        {lines.map((l, i) => (
          <div key={i} className={l.type === "input" ? "text-fg" : "text-muted"}>
            {l.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <span className="text-accent shrink-0">$</span>
        <div className="flex items-center flex-1 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="bg-transparent text-fg outline-none placeholder:text-muted/40 shrink-0 font-mono"
            style={{ width: `${Math.max(input.length || 1, 14)}ch` }}
            placeholder="type a command..."
            spellCheck={false}
            autoComplete="off"
          />
          {suggestion && (
            <span className={`pointer-events-none text-sm font-mono whitespace-nowrap ${suggestion.found ? "text-muted/40" : "text-red-400"}`}>
              {suggestion.text}
            </span>
          )}
        </div>
      </form>
    </div>
  );
});

export default Terminal;
