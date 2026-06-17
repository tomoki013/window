"use client";
import { OverlayModal } from "@/components/ui/OverlayModal";
import { useUIStore } from "@/stores/ui-store";
import { SettingsView } from "./SettingsView";

/**
 * Settings as a modal layered over the immersive screen. URL-synced via the
 * `#settings` hash (handled in AppShell), so the address bar reads like
 * `/scene/...#settings` and browser-back closes it.
 */
export function SettingsModal({ onClose }: { onClose: () => void }) {
  const open = useUIStore((s) => s.settingsOpen);
  return (
    <OverlayModal
      open={open}
      onClose={onClose}
      title="設定"
      subtitle="音・描画・データの管理。"
    >
      <SettingsView />
    </OverlayModal>
  );
}
