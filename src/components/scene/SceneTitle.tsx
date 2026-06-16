"use client";
import { useEffect, useState } from "react";

/**
 * The scene title appears briefly on open, then fades back so the window itself
 * leads. Rendered as a soft glass card. The outer component remounts the inner
 * one on every scene change (via `key`), so the reveal resets cleanly without a
 * setState-in-effect cascade.
 */
export function SceneTitle({
  title,
  subtitle,
  revealKey,
}: {
  title: string;
  subtitle: string;
  revealKey: number;
}) {
  return <SceneTitleInner key={revealKey} title={title} subtitle={subtitle} />;
}

function SceneTitleInner({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const [dim, setDim] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDim(true), 3200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className="animate-title-reveal flex flex-col items-center px-6 text-center transition-opacity duration-[1200ms] ease-[var(--ease-quiet)]"
      style={{ opacity: dim ? 0.24 : 1 }}
    >
      <h1 className="glass-text text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium tracking-[0.05em]">
        {title}
      </h1>
      <p className="glass-text-sub mt-3 max-w-md text-[14px] font-light">
        {subtitle}
      </p>
    </div>
  );
}
