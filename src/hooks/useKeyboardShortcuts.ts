"use client";
import { useEffect } from "react";

type Handlers = {
  onNext: () => void;
  onPrev: () => void;
  onTogglePlay: () => void;
  onMemo: () => void;
  onShare: () => void;
  onEscape: () => void;
};

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/**
 * Global keyboard shortcuts. Never fire while the viewer is typing in a field.
 * ← / → scenes · Space play/pause · M memo · S share · Esc close.
 */
export function useKeyboardShortcuts(handlers: Handlers) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlers.onEscape();
        return;
      }
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          handlers.onNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlers.onPrev();
          break;
        case " ":
          e.preventDefault();
          handlers.onTogglePlay();
          break;
        case "m":
        case "M":
          handlers.onMemo();
          break;
        case "s":
        case "S":
          handlers.onShare();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlers]);
}
