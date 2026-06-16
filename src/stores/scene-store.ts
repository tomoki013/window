import { create } from "zustand";
import { defaultScene, getSceneBySlug, scenes } from "@/data/scenes";
import type { SceneDefinition } from "@/types/scene";

type SceneState = {
  currentSlug: string;
  /** Bumped each time a scene is (re)opened, to retrigger the title reveal. */
  transitionKey: number;
  isTransitioning: boolean;
  current: () => SceneDefinition;
  setScene: (slug: string) => void;
  next: () => string;
  prev: () => string;
  endTransition: () => void;
};

export const useSceneStore = create<SceneState>((set, get) => ({
  currentSlug: defaultScene.slug,
  transitionKey: 0,
  isTransitioning: false,
  current: () => getSceneBySlug(get().currentSlug) ?? defaultScene,
  setScene: (slug) => {
    if (!getSceneBySlug(slug)) return;
    if (slug === get().currentSlug && get().transitionKey !== 0) return;
    set((s) => ({
      currentSlug: slug,
      transitionKey: s.transitionKey + 1,
      isTransitioning: true,
    }));
  },
  next: () => {
    const idx = scenes.findIndex((s) => s.slug === get().currentSlug);
    const target = scenes[(idx + 1) % scenes.length];
    get().setScene(target.slug);
    return target.slug;
  },
  prev: () => {
    const idx = scenes.findIndex((s) => s.slug === get().currentSlug);
    const target = scenes[(idx - 1 + scenes.length) % scenes.length];
    get().setScene(target.slug);
    return target.slug;
  },
  endTransition: () => set({ isTransitioning: false }),
}));
