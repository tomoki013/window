import { create } from "zustand";

type AudioState = {
  isPlaying: boolean;
  masterVolume: number;
  /** Per-layer volumes for the advanced mixer, keyed by layer id. */
  layerVolumes: Record<string, number>;
  /** Label of the primary ambience layer, shown in the transport. */
  currentLabel: string;
  ready: boolean;

  setPlaying: (v: boolean) => void;
  setMasterVolume: (v: number) => void;
  setLayerVolume: (id: string, v: number) => void;
  setCurrentLabel: (label: string) => void;
  setReady: (v: boolean) => void;
  initLayerVolumes: (vols: Record<string, number>) => void;
};

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  masterVolume: 0.7,
  layerVolumes: {},
  currentLabel: "",
  ready: false,

  setPlaying: (v) => set({ isPlaying: v }),
  setMasterVolume: (v) => set({ masterVolume: v }),
  setLayerVolume: (id, v) =>
    set((s) => ({ layerVolumes: { ...s.layerVolumes, [id]: v } })),
  setCurrentLabel: (label) => set({ currentLabel: label }),
  setReady: (v) => set({ ready: v }),
  initLayerVolumes: (vols) => set({ layerVolumes: vols }),
}));
