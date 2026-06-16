"use client";
import { useMediaQuery } from "./useMediaQuery";

/** Tracks the OS-level reduced-motion preference reactively. */
export function useReducedMotionPreference(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
