import { createContext, useContext, useReducer, useCallback, useRef } from "react";

const TerminalContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "SPAWN": {
      const newId = state.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      const offset = state.length * 30;
      return [
        ...state,
        {
          id: newId,
          x: 60 + offset,
          y: 80 + offset,
          zIndex: state.length + 10,
          width: 620,
          height: 420,
        },
      ];
    }
    case "CLOSE":
      return state.filter((t) => t.id !== action.id);
    case "FOCUS": {
      const maxZ = Math.max(...state.map((t) => t.zIndex), 9);
      return state.map((t) =>
        t.id === action.id ? { ...t, zIndex: maxZ + 1 } : t
      );
    }
    case "MOVE":
      return state.map((t) =>
        t.id === action.id ? { ...t, x: action.x, y: action.y } : t
      );
    case "RESIZE":
      return state.map((t) =>
        t.id === action.id ? { ...t, width: action.width, height: action.height } : t
      );
    default:
      return state;
  }
}

function areThereListeners(listeners) {
  for (const k in listeners) if (listeners[k]) return true;
  return false;
}

function lastListener(listeners) {
  const keys = Object.keys(listeners);
  for (let i = keys.length - 1; i >= 0; i--) {
    if (listeners[keys[i]]) return listeners[keys[i]];
  }
  return null;
}

export function TerminalProvider({ children }) {
  const [terminals, dispatch] = useReducer(reducer, []);

  const listenerRef = useRef({});
  const pendingRef = useRef([]);

  const spawn = useCallback(() => dispatch({ type: "SPAWN" }), []);

  const registerListener = useCallback((id, fn) => {
    listenerRef.current[id] = fn;
    const queue = pendingRef.current;
    pendingRef.current = [];
    queue.forEach((cmd) => fn(cmd));
  }, []);

  const unregisterListener = useCallback((id) => {
    delete listenerRef.current[id];
  }, []);

  const sendToTerminal = useCallback((cmd) => {
    const fn = lastListener(listenerRef.current);
    if (fn) {
      fn(cmd);
      return;
    }
    if (!areThereListeners(listenerRef.current)) {
      dispatch({ type: "SPAWN" });
    }
    pendingRef.current.push(cmd);
  }, []);

  const close = useCallback((id) => dispatch({ type: "CLOSE", id }), []);
  const focus = useCallback((id) => dispatch({ type: "FOCUS", id }), []);
  const move = useCallback((id, x, y) => dispatch({ type: "MOVE", id, x, y }), []);
  const resize = useCallback((id, width, height) => dispatch({ type: "RESIZE", id, width, height }), []);

  return (
    <TerminalContext.Provider value={{ terminals, spawn, close, focus, move, resize, registerListener, unregisterListener, sendToTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminals() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminals must be used within TerminalProvider");
  return ctx;
}
