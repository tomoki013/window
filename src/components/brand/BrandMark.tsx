import { brandConfig } from "@/config/brand";

type Props = {
  className?: string;
};

/** The wordmark. Reads its text from brandConfig so renaming is one change. */
export function BrandMark({ className = "" }: Props) {
  return (
    <span
      className={`select-none text-[20px] font-medium tracking-[0.18em] text-[var(--text-primary)] ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {brandConfig.displayName}
    </span>
  );
}
