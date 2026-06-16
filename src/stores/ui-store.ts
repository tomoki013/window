import { create } from "zustand";
import type { QualityTier } from "@/types/record";

export type PanelKind = "memo" | "info" | "share" | null;

type UIState = {
  /** Floating contextual panel on the right / over the stage. */
  activePanel: PanelKind;
  /** Mobile scene-list drawer. */
  sceneDrawerOpen: boolean;
  /** Settings modal (URL-synced via the #settings hash). */
  settingsOpen: boolean;
  /** First-visit "open this window" affordance. */
  hasOpenedWindow: boolean;
  /** UI dims itself when the viewer is idle. */
  idle: boolean;
  quality: QualityTier;
  reducedMotion: boolean;

  openPanel: (panel: Exclude<PanelKind, null>) => void;
  closePanel: () => void;
  togglePanel: (panel: Exclude<PanelKind, null>) => void;
  setSceneDrawer: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  markWindowOpened: () => void;
  setIdle: (idle: boolean) => void;
  setQuality: (q: QualityTier) => void;
  setReducedMotion: (v: boolean) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  activePanel: null,
  sceneDrawerOpen: false,
  settingsOpen: false,
  hasOpenedWindow: false,
  idle: false,
  quality: "auto",
  reducedMotion: false,

  openPanel: (panel) => set({ activePanel: panel, idle: false }),
  closePanel: () => set({ activePanel: null }),
  togglePanel: (panel) =>
    set({
      activePanel: get().activePanel === panel ? null : panel,
      idle: false,
    }),
  setSceneDrawer: (open) => set({ sceneDrawerOpen: open }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  markWindowOpened: () => set({ hasOpenedWindow: true }),
  setIdle: (idle) => set({ idle }),
  setQuality: (q) => set({ quality: q }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
}));
