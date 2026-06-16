"use client";
import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query via useSyncExternalStore — the React-blessed way
 * to read external state without setState-in-effect cascades. Returns `false`
 * on the server so SSR/first paint is stable.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True on desktop-class widths (≥ 1024px). */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
