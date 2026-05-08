import { useRef, useCallback, useEffect } from "react";
import Terminal from "./Terminal.jsx";
import { useTerminals } from "../lib/useTerminalStore.jsx";

export default function TerminalWindow({ id, x, y, zIndex, width, height }) {
  const { close, focus, move, resize, registerListener, unregisterListener } = useTerminals();
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });
  const resizeRef = useRef({ resizing: false, startX: 0, startY: 0, origW: 0, origH: 0 });
  const terminalRef = useRef(null);

  const focusAndRegister = useCallback(() => {
    focus(id);
    if (terminalRef.current) {
      registerListener(id, (cmd) => terminalRef.current.processCmd(cmd));
    }
  }, [id, focus, registerListener]);

  useEffect(() => {
    focusAndRegister();
    return () => unregisterListener(id);
  }, [focusAndRegister, unregisterListener, id]);

  const onMoveStart = useCallback(
    (e) => {
      if (e.target.closest(".close-btn") || e.target.closest(".resize-handle")) return;
      focusAndRegister();
      dragRef.current.dragging = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.origX = x;
      dragRef.current.origY = y;
    },
    [x, y, focusAndRegister]
  );

  const onResizeStart = useCallback(
    (e) => {
      e.stopPropagation();
      focusAndRegister();
      resizeRef.current.resizing = true;
      resizeRef.current.startX = e.clientX;
      resizeRef.current.startY = e.clientY;
      resizeRef.current.origW = width;
      resizeRef.current.origH = height;
    },
    [width, height, focusAndRegister]
  );

  useEffect(() => {
    const onMouseMove = (e) => {
      if (dragRef.current.dragging) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        move(id, dragRef.current.origX + dx, dragRef.current.origY + dy);
      }
      if (resizeRef.current.resizing) {
        const dw = e.clientX - resizeRef.current.startX;
        const dh = e.clientY - resizeRef.current.startY;
        resize(id, Math.max(400, resizeRef.current.origW + dw), Math.max(280, resizeRef.current.origH + dh));
      }
    };
    const onMouseUp = () => {
      dragRef.current.dragging = false;
      resizeRef.current.resizing = false;
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [id, move, resize]);

  return (
    <div
      className="fixed rounded-2xl border border-stroke bg-surface/80 backdrop-blur-md shadow-2xl overflow-hidden pointer-events-auto"
      style={{ left: x, top: y, zIndex, width, height }}
      onMouseDown={onMoveStart}
    >
      <div className="flex items-center justify-between px-4 py-2.5 cursor-grab active:cursor-grabbing select-none border-b border-stroke/50">
        <div className="flex items-center gap-2">
          <span className="text-accent font-mono text-xs">&gt;_</span>
          <span className="text-xs font-medium text-fg">Terminal #{id}</span>
        </div>
        <button
          type="button"
          className="close-btn text-xs text-muted hover:text-red-400 transition font-mono px-1"
          onClick={() => close(id)}
        >
          [x]
        </button>
      </div>
      <div className="p-4 h-[calc(100%-40px)] overflow-hidden">
        <Terminal ref={terminalRef} />
      </div>
      <div
        className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={onResizeStart}
      >
        <svg
          viewBox="0 0 8 8"
          className="w-3 h-3 absolute bottom-0.5 right-0.5 text-muted/40"
          fill="currentColor"
        >
          <path d="M0 8 L8 0 L8 8 Z" />
        </svg>
      </div>
    </div>
  );
}
