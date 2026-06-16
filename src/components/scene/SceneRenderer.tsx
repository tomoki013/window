"use client";
import { useEffect, useMemo, useRef } from "react";
import type { ParallaxValue } from "@/hooks/useParallax";
import type { SceneDefinition, SceneLayer } from "@/types/scene";

type Props = {
  scene: SceneDefinition;
  parallax: React.RefObject<ParallaxValue>;
  parallaxEnabled: boolean;
  twinkle: boolean;
};

// Map a layer's depth (0 = far, 1 = near) to a max pixel offset, matching the
// spec's per-layer ranges (background 2–4px … foreground 8–14px).
const maxOffsetForDepth = (depth: number) => 2 + depth * 12;

/** Paints a scene's gradient layers back-to-front and applies damped parallax. */
export function SceneRenderer({
  scene,
  parallax,
  parallaxEnabled,
  twinkle,
}: Props) {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Prepend the photo (if any) as the deepest parallax layer.
  const renderLayers: SceneLayer[] = useMemo(
    () =>
      scene.image
        ? [
            {
              css: `url('${scene.image}') center / cover no-repeat`,
              depth: 0.12,
            },
            ...scene.layers,
          ]
        : scene.layers,
    [scene],
  );

  useEffect(() => {
    if (!parallaxEnabled) {
      layerRefs.current.forEach((el) => {
        if (el) el.style.transform = "translate3d(0,0,0) scale(1.06)";
      });
      return;
    }
    let raf = 0;
    const loop = () => {
      const { x, y } = parallax.current ?? { x: 0, y: 0 };
      renderLayers.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        const max = maxOffsetForDepth(layer.depth);
        // foreground moves with pointer; nothing inverts here (reflection handled separately)
        const tx = -x * max;
        const ty = -y * max;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(1.06)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [renderLayers, parallax, parallaxEnabled]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {renderLayers.map((layer, i) => (
        <div
          key={`${scene.id}-${i}`}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className={twinkle && layer.twinkle ? "animate-light-drift" : ""}
          style={{
            position: "absolute",
            inset: "-3%",
            background: layer.css,
            opacity: layer.opacity ?? 1,
            mixBlendMode: layer.blend ?? "normal",
            transform: "translate3d(0,0,0) scale(1.06)",
            willChange: parallaxEnabled ? "transform" : "auto",
          }}
        />
      ))}
    </div>
  );
}
