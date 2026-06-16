"use client";
import type { MovingLight } from "@/types/scene";

/**
 * A handful of slow point-lights drifting across the scene (distant cars, a
 * passing train's windows). Kept to a few elements with long durations.
 */
export function MovingLights({
  lights,
  enabled,
}: {
  lights: MovingLight[];
  enabled: boolean;
}) {
  if (!enabled || lights.length === 0) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
    >
      {lights.map((l, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${l.y * 100}%`,
            left: "-5%",
            width: l.size,
            height: l.size,
            background: l.color,
            boxShadow: `0 0 ${l.size * 4}px ${l.size}px ${l.color}`,
            filter: "blur(0.5px)",
            animation: `lightTraverse ${l.duration}s linear ${l.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes lightTraverse {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(115vw); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="lightTraverse"] { animation: none !important; opacity: 0.5 !important; }
        }
      `}</style>
    </div>
  );
}
