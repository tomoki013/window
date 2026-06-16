"use client";

/**
 * Window-glass reflection: a faint, screen-blended tint plus a soft interior
 * highlight. Moves opposite to the parallax (handled by the parent), reinforcing
 * the sense that we're looking *through* glass.
 */
export function ReflectionLayer({ tint }: { tint: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[6]">
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: `linear-gradient(125deg, ${tint} 0%, transparent 45%, transparent 70%, ${tint} 100%)`,
        }}
      />
      {/* a soft diagonal interior glare */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-60"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 42%, transparent 52%)",
        }}
      />
    </div>
  );
}
