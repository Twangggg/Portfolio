import { useEffect } from "react";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-stroke bg-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-muted font-mono">$ cat {title.toLowerCase()}.md</div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-muted hover:text-fg font-mono"
          >
            [x]
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
