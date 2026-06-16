"use client";
import { useEffect, useRef } from "react";

export type ParallaxValue = { x: number; y: number };

/**
 * Pointer-driven parallax with damping. Returns a ref whose `.current` holds a
 * normalized offset in [-1, 1] on each axis, updated on a single rAF loop that
 * eases toward the pointer target — so motion is slow and never snaps.
 *
 * Disabled (held at 0) when `enabled` is false (mobile / reduced-motion / low).
 */
export function useParallax(enabled: boolean) {
  const value = useRef<ParallaxValue>({ x: 0, y: 0 });
  const target = useRef<ParallaxValue>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      value.current = { x: 0, y: 0 };
      target.current = { x: 0, y: 0 };
      return;
    }
    const onMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    const onLeave = () => {
      target.current = { x: 0, y: 0 };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const loop = () => {
      // critically-damped easing toward target
      value.current.x += (target.current.x - value.current.x) * 0.045;
      value.current.y += (target.current.y - value.current.y) * 0.045;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return value;
}
