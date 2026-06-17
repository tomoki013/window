"use client";
import { Archive, Info, Settings } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { scenes } from "@/data/scenes";
import { useSceneStore } from "@/stores/scene-store";
import { useUIStore } from "@/stores/ui-store";
import { SceneListItem } from "./SceneListItem";

type Props = {
  onSelectScene: (slug: string) => void;
};

/** Shared content for the left rail (desktop) and the mobile drawer. */
export function SceneNavigation({ onSelectScene }: Props) {
  const currentSlug = useSceneStore((s) => s.currentSlug);
  const setDrawer = useUIStore((s) => s.setSceneDrawer);

  // The footer items are real pages now (`/archive`, `/settings`, `/about`).
  // Navigating closes the mobile drawer.
  const closeDrawer = () => setDrawer(false);

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 pb-5 pt-1">
        <Link href="/" aria-label="ホーム" className="inline-block">
          <BrandMark />
        </Link>
      </div>

      <p className="px-3 pb-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        シーン
      </p>

      <nav
        aria-label="シーン一覧"
        className="flex-1 space-y-1 overflow-y-auto px-1 pb-2"
      >
        {scenes.map((scene) => (
          <SceneListItem
            key={scene.id}
            scene={scene}
            active={scene.slug === currentSlug}
            onSelect={() => onSelectScene(scene.slug)}
          />
        ))}
      </nav>

      <div className="mt-2 space-y-0.5 border-t border-[var(--border-subtle)] px-1 pt-3">
        <FooterLink
          href="/archive"
          onClick={closeDrawer}
          icon={<Archive size={16} />}
        >
          記録
        </FooterLink>
        <FooterLink
          href="/settings"
          onClick={closeDrawer}
          icon={<Settings size={16} />}
        >
          設定
        </FooterLink>
        <FooterLink
          href="/about"
          onClick={closeDrawer}
          icon={<Info size={16} />}
        >
          このアプリについて
        </FooterLink>
      </div>
    </div>
  );
}

const footerItemClass =
  "flex w-full items-center gap-2.5 rounded-[var(--radius-medium)] px-2.5 py-2 text-left text-[13px] text-[var(--text-secondary)] transition-colors duration-200 hover:bg-white/[0.04] hover:text-[var(--text-primary)]";

function FooterLink({
  href,
  onClick,
  icon,
  children,
}: {
  href: string;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={onClick} className={footerItemClass}>
      <span className="text-[var(--text-muted)]">{icon}</span>
      {children}
    </Link>
  );
}
