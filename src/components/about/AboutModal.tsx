"use client";
import { OverlayModal } from "@/components/ui/OverlayModal";
import { brandConfig } from "@/config/brand";
import { useUIStore } from "@/stores/ui-store";
import { AboutView } from "./AboutView";

/**
 * About panel as a modal layered over the immersive screen. URL-synced via the
 * `#about` hash (handled in AppShell), so browser-back closes it.
 */
export function AboutModal({ onClose }: { onClose: () => void }) {
  const open = useUIStore((s) => s.aboutOpen);
  return (
    <OverlayModal
      open={open}
      onClose={onClose}
      title={brandConfig.displayName}
      subtitle={brandConfig.tagline}
      ariaLabel="このアプリについて"
    >
      <AboutView />
    </OverlayModal>
  );
}
