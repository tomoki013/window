"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { OpenWindowAffordance } from "@/components/app-shell/OpenWindowAffordance";
import { FogLayer } from "@/components/effects/FogLayer";
import { GrainLayer } from "@/components/effects/GrainLayer";
import { MovingLights } from "@/components/effects/MovingLights";
import { RainLayer } from "@/components/effects/RainLayer";
import { ReflectionLayer } from "@/components/effects/ReflectionLayer";
import { VignetteLayer } from "@/components/effects/VignetteLayer";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useParallax } from "@/hooks/useParallax";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useSceneStore } from "@/stores/scene-store";
import { useUIStore } from "@/stores/ui-store";
import { SceneRenderer } from "./SceneRenderer";
import { SceneTitle } from "./SceneTitle";

/**
 * The window itself: a multi-layer composite (gradients + fog + rain + glass
 * reflection + grain + vignette) that crossfades between scenes. Everything
 * heavy here is gated by the resolved performance tier and reduced-motion.
 */
export function SceneStage() {
  const slug = useSceneStore((s) => s.currentSlug);
  const transitionKey = useSceneStore((s) => s.transitionKey);
  const endTransition = useSceneStore((s) => s.endTransition);
  const current = useSceneStore((s) => s.current);
  const scene = current();

  const quality = useUIStore((s) => s.quality);
  const reducedMotion = useUIStore((s) => s.reducedMotion);
  const tier = usePerformanceTier(quality, reducedMotion);
  const isDesktop = useIsDesktop();

  const parallaxEnabled = tier !== "low" && !reducedMotion && isDesktop;
  const parallax = useParallax(parallaxEnabled);

  const profile = scene.visualProfile;
  const animate = tier !== "low" && !reducedMotion;
  const transitionDuration = reducedMotion ? 0.2 : 0.9;

  useEffect(() => {
    const t = window.setTimeout(
      () => endTransition(),
      transitionDuration * 1000,
    );
    return () => window.clearTimeout(t);
  }, [transitionKey, endTransition, transitionDuration]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Poster: instant paint, always present beneath the active scene. */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: scene.poster }}
        aria-hidden
      />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={slug}
          className="absolute inset-0"
          initial={{ opacity: 0, filter: animate ? "blur(8px)" : "blur(0px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: animate ? "blur(6px)" : "blur(0px)" }}
          transition={{
            duration: transitionDuration,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <SceneRenderer
            scene={scene}
            parallax={parallax}
            parallaxEnabled={parallaxEnabled}
            twinkle={animate}
          />
          <MovingLights
            lights={scene.image ? [] : (scene.movingLights ?? [])}
            enabled={animate}
          />
        </motion.div>
      </AnimatePresence>

      {/* Effects that persist across the crossfade. */}
      <FogLayer intensity={profile.fogIntensity} enabled={animate} />
      <RainLayer
        intensity={profile.rainIntensity}
        tier={tier}
        enabled={animate}
      />
      <ReflectionLayer tint={scene.reflectionTint} />
      <GrainLayer opacity={profile.grainOpacity} />
      <VignetteLayer opacity={profile.vignetteOpacity} />

      {/* A soft scrim along the left edge so nav glass stays legible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[8] w-1/3 max-w-[420px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,11,20,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Centered title — kept light so the window itself leads. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[9] flex -translate-y-1/2 flex-col items-center px-6">
        <SceneTitle
          title={scene.title}
          subtitle={scene.subtitle}
          revealKey={transitionKey}
        />
      </div>

      {/* First-visit affordance: the whole stage is the target, with only a
          light hint drawn low so the background stays unobstructed. */}
      <OpenWindowAffordance />
    </div>
  );
}
