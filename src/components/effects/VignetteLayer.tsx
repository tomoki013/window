"use client";

/** Darkened edges to keep attention in the window and ease text contrast. */
export function VignetteLayer({ opacity }: { opacity: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[8]"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 42%, transparent 45%, rgba(0,0,0,0.55) 100%)",
        opacity,
      }}
    />
  );
}
