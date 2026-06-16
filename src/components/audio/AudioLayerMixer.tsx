"use client";
import { useAudioControls } from "@/hooks/useAudioControls";
import { useAudioStore } from "@/stores/audio-store";
import { useSceneStore } from "@/stores/scene-store";
import { VolumeControl } from "./VolumeControl";

/** Advanced per-layer mixer, shown only inside the expanded audio settings. */
export function AudioLayerMixer() {
  const scene = useSceneStore((s) => s.current)();
  const layerVolumes = useAudioStore((s) => s.layerVolumes);
  const { setLayerVolume } = useAudioControls();

  return (
    <div className="space-y-3">
      {scene.audio.map((layer) => (
        <div key={layer.id} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-[13px] text-[var(--text-secondary)]">
            {layer.label}
          </span>
          <VolumeControl
            label={`${layer.label}の音量`}
            value={layerVolumes[layer.id] ?? layer.defaultVolume}
            onChange={(v) => setLayerVolume(layer.id, v)}
          />
        </div>
      ))}
    </div>
  );
}
