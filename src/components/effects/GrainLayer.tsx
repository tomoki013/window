"use client";
import { useMemo } from "react";

/**
 * Film grain via an inline SVG fractal-noise data URI — a single static layer,
 * no per-frame work. Opacity is driven by the scene's visual profile.
 */
export function GrainLayer({ opacity }: { opacity: number }) {
  const dataUri = useMemo(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[7] mix-blend-overlay"
      style={{
        backgroundImage: dataUri,
        backgroundSize: "160px 160px",
        opacity,
      }}
    />
  );
}
