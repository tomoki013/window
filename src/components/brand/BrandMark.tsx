import { brandConfig } from "@/config/brand";

type Props = {
  className?: string;
};

/**
 * The wordmark. An elegant high-contrast serif set in lowercase with airy
 * tracking — quiet and atmospheric. Reads its text from brandConfig so
 * renaming is one change.
 */
export function BrandMark({ className = "" }: Props) {
  return (
    <span
      className={`brand-wordmark select-none text-[26px] leading-none tracking-[0.14em] text-[var(--text-primary)] ${className}`}
      style={{ fontFamily: "var(--font-brand)" }}
    >
      {brandConfig.displayName}
    </span>
  );
}
