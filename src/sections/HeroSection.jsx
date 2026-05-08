import { useEffect, useState } from "react";
import { useTerminals } from "../lib/useTerminalStore.jsx";

export default function HeroSection() {
  const { spawn } = useTerminals();
  const [welcomeText, setWelcomeText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const message = "Welcome to my portfolio.";
    const firstStop = "Welcome to my personal space.";
    const correctionStop = "Welcome to my ";
    let timeoutId;
    let cancelled = false;

    const wait = (delay) =>
      new Promise((resolve) => {
        timeoutId = window.setTimeout(resolve, delay);
      });

    async function blinkPause(duration) {
      const blinkSpeed = 260;
      const endAt = Date.now() + duration;

      while (Date.now() < endAt && !cancelled) {
        setCursorVisible((visible) => !visible);
        await wait(blinkSpeed);
      }

      setCursorVisible(true);
    }

    async function typeTo(target, speed) {
      while (!cancelled && welcomeTextRef.current.length < target.length) {
        const nextLength = welcomeTextRef.current.length + 1;
        const nextText = target.slice(0, nextLength);
        welcomeTextRef.current = nextText;
        setWelcomeText(nextText);
        setCursorVisible(true);
        await wait(speed);
      }
    }

    async function deleteTo(targetLength, speed) {
      while (!cancelled && welcomeTextRef.current.length > targetLength) {
        const nextText = welcomeTextRef.current.slice(0, -1);
        welcomeTextRef.current = nextText;
        setWelcomeText(nextText);
        setCursorVisible(true);
        await wait(speed);
      }
    }

    const welcomeTextRef = { current: "" };

    async function loopText() {
      while (!cancelled) {
        await typeTo(firstStop, 74);
        await blinkPause(560);
        await deleteTo(correctionStop.length, 44);
        await blinkPause(280);
        await typeTo(message, 64);
        await blinkPause(900);
        await deleteTo(0, 34);
        await blinkPause(360);
      }
    }

    loopText();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="text-center space-y-4">
      <p className="min-h-10 font-mono text-3xl font-semibold text-fg md:min-h-14 md:text-5xl">
        {welcomeText}
        <span className={`inline-block text-accent ${cursorVisible ? "opacity-100" : "opacity-0"}`}>|</span>
      </p>
      <div className="text-muted text-xs font-mono">
        Press <kbd className="px-1.5 py-0.5 rounded border border-stroke bg-surface text-fg">Win</kbd> + <kbd className="px-1.5 py-0.5 rounded border border-stroke bg-surface text-fg">T</kbd> to open a terminal
      </div>
      <button
        type="button"
        onClick={spawn}
        className="group inline-flex items-center gap-3 rounded-2xl border border-stroke bg-surface/30 backdrop-blur-md px-8 py-5 hover:bg-surface/50 transition"
      >
        <span className="text-2xl text-accent font-mono">&gt;_</span>
        <span className="text-sm font-medium text-fg">Terminal</span>
      </button>
    </div>
  );
}
