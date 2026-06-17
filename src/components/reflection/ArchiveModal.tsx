"use client";
import { OverlayModal } from "@/components/ui/OverlayModal";
import { useUIStore } from "@/stores/ui-store";
import { ReflectionList } from "./ReflectionList";

/**
 * The reflection archive as a modal layered over the immersive screen.
 * URL-synced via the `#records` hash (handled in AppShell), so browser-back
 * closes it.
 */
export function ArchiveModal({ onClose }: { onClose: () => void }) {
  const open = useUIStore((s) => s.archiveOpen);
  return (
    <OverlayModal
      open={open}
      onClose={onClose}
      title="記録"
      subtitle="あなたが見た窓の記憶。"
    >
      <ReflectionList />
    </OverlayModal>
  );
}
