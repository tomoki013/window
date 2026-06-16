"use client";
import { useMemo } from "react";

/**
 * Slow-drifting fog built from a low-resolution noise texture that is gently
 * translated/scaled via CSS animation — cheap, no canvas, no per-frame JS.
 */
export function FogLayer({
  intensity,
  enabled,
}: {
  intensity: number;
  enabled: boolean;
}) {
  const dataUri = useMemo(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' seed='7'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#f)' opacity='0.6'/></svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  }, []);

  if (intensity <= 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[4] overflow-hidden"
      style={{ opacity: Math.min(0.5, intensity * 0.5) }}
    >
      <div
        className="absolute -inset-[40%]"
        style={{
          backgroundImage: dataUri,
          backgroundSize: "70% 70%",
          mixBlendMode: "screen",
          animation: enabled ? "fogDrift 60s linear infinite" : "none",
          filter: "blur(6px)",
        }}
      />
      <style>{`
        @keyframes fogDrift {
          0% { transform: translate3d(-4%, 2%, 0) scale(1.05); }
          50% { transform: translate3d(4%, -3%, 0) scale(1.12); }
          100% { transform: translate3d(-4%, 2%, 0) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
