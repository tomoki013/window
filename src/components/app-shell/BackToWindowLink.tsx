"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSceneBySlug } from "@/data/scenes";
import { loadPreferences } from "@/db/preferences";

/**
 * "Back to the window" link for the standalone pages. Resolves to the last
 * scene the viewer had open (persisted in preferences) so leaving a page lands
 * you back where you were, rather than replaying the root overture.
 */
export function BackToWindowLink() {
  const [href, setHref] = useState("/");

  useEffect(() => {
    let active = true;
    loadPreferences().then((p) => {
      if (!active) return;
      const slug = p.lastSceneSlug;
      if (slug && getSceneBySlug(slug)) setHref(`/scene/${slug}`);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[13px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
    >
      <ArrowLeft size={16} />
      シーンへ戻る
    </Link>
  );
}
