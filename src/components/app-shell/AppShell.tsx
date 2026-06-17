"use client";
import { useCallback, useEffect } from "react";
import { RootIntro } from "@/components/app-shell/RootIntro";
import { AudioController } from "@/components/audio/AudioController";
import { SceneStage } from "@/components/scene/SceneStage";
import { QuietTimer } from "@/components/timer/QuietTimer";
import { TimerCompletion } from "@/components/timer/TimerCompletion";
import { defaultScene, getSceneBySlug } from "@/data/scenes";
import { loadPreferences, savePreferences } from "@/db/preferences";
import { useAudioControls } from "@/hooks/useAudioControls";
import { useIdleUi } from "@/hooks/useIdleUi";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { usePreferences } from "@/hooks/usePreferences";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useSceneStore } from "@/stores/scene-store";
import { useTimerStore } from "@/stores/timer-store";
import { useUIStore } from "@/stores/ui-store";
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

type Props = {
  initialSlug: string;
  /** Optional duration (minutes) from a shared link's query string. */
  initialDuration?: number;
  /**
   * When mounted at the bare root `/`, play a short brand intro and then settle
   * the address bar onto the scene's own URL (`/scene/<slug>`).
   */
  intro?: boolean;
};

/**
 * The single mounted client root. Scene ↔ URL syncing uses the History API
 * directly (not router navigation) so the audio engine and effects are never
 * torn down when the address bar changes.
 */
export function AppShell({ initialSlug, initialDuration, intro }: Props) {
  const setScene = useSceneStore((s) => s.setScene);
  const currentSlug = useSceneStore((s) => s.currentSlug);
  const next = useSceneStore((s) => s.next);
  const prev = useSceneStore((s) => s.prev);

  const togglePanel = useUIStore((s) => s.togglePanel);
  const closePanel = useUIStore((s) => s.closePanel);
  const setDrawer = useUIStore((s) => s.setSceneDrawer);
  const reducedMotion = useReducedMotionPreference();
  const setReducedMotion = useUIStore((s) => s.setReducedMotion);
  const isDesktop = useIsDesktop();

  const { toggle } = useAudioControls();
  usePreferences();
  useIdleUi(5000);

  // OS reduced-motion always wins as a baseline.
  useEffect(() => {
    if (reducedMotion) setReducedMotion(true);
  }, [reducedMotion, setReducedMotion]);

  // Initialize from the route on first mount.
  useEffect(() => {
    const slug = getSceneBySlug(initialSlug) ? initialSlug : defaultScene.slug;
    setScene(slug);
  }, []);

  // Remember the last scene so a return visit reopens it.
  useEffect(() => {
    loadPreferences().then((p) => {
      void savePreferences({ ...p, lastSceneSlug: currentSlug });
    });
  }, [currentSlug]);

  // Push scene → URL via History (no Next navigation, no remount).
  const selectScene = useCallback(
    (slug: string) => {
      if (slug === currentSlug) {
        setDrawer(false);
        return;
      }
      setScene(slug);
      window.history.pushState({ slug }, "", `/scene/${slug}`);
    },
    [currentSlug, setScene, setDrawer],
  );

  // URL → scene on back/forward.
  useEffect(() => {
    const onPop = () => {
      const match = window.location.pathname.match(/\/scene\/([^/?#]+)/);
      const slug = match?.[1];
      if (slug && getSceneBySlug(slug)) {
        setScene(slug);
      } else if (window.location.pathname === "/") {
        // Returning to the root restores the recommended scene.
        setScene(defaultScene.slug);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [setScene]);

  // Apply a shared-link duration once.
  const setTimerDuration = useTimerStore((s) => s.setDuration);
  useEffect(() => {
    if (initialDuration) setTimerDuration(initialDuration);
  }, [initialDuration, setTimerDuration]);

  const goNext = useCallback(() => {
    const slug = next();
    window.history.pushState({ slug }, "", `/scene/${slug}`);
  }, [next]);
  const goPrev = useCallback(() => {
    const slug = prev();
    window.history.pushState({ slug }, "", `/scene/${slug}`);
  }, [prev]);

  useKeyboardShortcuts({
    onNext: goNext,
    onPrev: goPrev,
    onTogglePlay: toggle,
    onMemo: () => togglePanel("memo"),
    onShare: () => togglePanel("share"),
    onEscape: () => {
      closePanel();
      setDrawer(false);
    },
  });

  // Keep keyboard `S` for share but let nothing else fight the modal's own Esc.

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[var(--background-deep)]">
      <SceneStage />
      <AudioController />
      <QuietTimer />
      <TimerCompletion />

      {isDesktop ? (
        <DesktopLayout onSelectScene={selectScene} />
      ) : (
        <MobileLayout onSelectScene={selectScene} />
      )}

      {intro && (
        <RootIntro
          onArrive={() => {
            // Settle the address bar onto the scene's own URL without a
            // navigation/remount, so the experience continues seamlessly.
            window.history.replaceState(
              { slug: currentSlug },
              "",
              `/scene/${currentSlug}`,
            );
          }}
        />
      )}
    </main>
  );
}
