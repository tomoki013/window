"use client";
import { useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";

/**
 * Dims the UI after a period of inactivity so the window itself takes focus.
 * Suspended while a panel or the scene drawer is open (i.e. the viewer is
 * actively interacting).
 */
export function useIdleUi(delay = 5000) {
  const setIdle = useUIStore((s) => s.setIdle);
  const activePanel = useUIStore((s) => s.activePanel);
  const drawerOpen = useUIStore((s) => s.sceneDrawerOpen);
  const settingsOpen = useUIStore((s) => s.settingsOpen);

  useEffect(() => {
    const suspended = activePanel !== null || drawerOpen || settingsOpen;
    if (suspended) {
      setIdle(false);
      return;
    }
    let timer: number;
    const reset = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), delay);
    };
    const events = [
      "pointermove",
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
    ];
    for (const e of events) {
      window.addEventListener(e, reset, { passive: true });
    }
    reset();
    return () => {
      window.clearTimeout(timer);
      for (const e of events) {
        window.removeEventListener(e, reset);
      }
    };
  }, [delay, setIdle, activePanel, drawerOpen, settingsOpen]);
}
