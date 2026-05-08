import site from "../content/site.json";
import skills from "../content/skills.json";

const ascii = `
┌──────┐
│ >_<  │
│ ───  │
└──────┘
`.trim();

const allTech = skills.groups.flatMap((g) => g.items).slice(0, 8);

export default function TerminalFetcher() {
  const name = site.author?.name || "user";
  const email = site.author?.email || "";
  const role = site.author?.role || "";

  const info = [
    { key: "USER", val: name },
    { key: "OS", val: "Portfolio v1.0" },
    { key: "HOST", val: "localhost" },
    { key: "ROLE", val: role },
    { key: "SHELL", val: "zsh 5.9" },
    { key: "EDITOR", val: "VS Code" },
  ];

  return (
    <div className="font-mono text-sm" style={{ lineHeight: "1.6" }}>
      <div className="flex gap-3 items-start">
        <pre className="text-accent hidden sm:block select-none" style={{ lineHeight: "1.6", margin: 0 }}>
          {ascii}
        </pre>

        <div className="flex-1 min-w-0" style={{ lineHeight: "1.6" }}>
          <div className="text-fg font-semibold mb-1">
            {name.toLocaleLowerCase()}@portfolio
          </div>
          <div className="text-muted">
            {info.map((i) => (
              <div key={i.key} className="flex gap-2">
                <span className="text-accent shrink-0">{i.key}</span>
                <span className="text-muted">:</span>
                <span className={`truncate ${i.key === "USER" || i.key === "ROLE" ? "text-fg font-semibold" : "text-fg"}`}>{i.val}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <span className="text-accent shrink-0">STACK</span>
              <span className="text-muted">:</span>
              <span className="text-fg truncate">{allTech.join(", ")}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-accent shrink-0">EMAIL</span>
              <span className="text-muted">:</span>
              <span className="text-fg font-semibold truncate">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
