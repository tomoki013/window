import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * Quiet shell for the non-immersive pages (archive, settings, about). Uses the
 * browser's full width on desktop with comfortable side margins — not a narrow
 * mobile column.
 */
export function PageShell({
  title,
  subtitle,
  children,
  width = "wide",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: "wide" | "narrow";
}) {
  return (
    <div className="relative min-h-[100dvh] w-full">
      {/* subtle ambient backdrop so these pages still feel part of the world */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 80% -10%, #1a2244 0%, #0a0e1d 45%, #05070f 100%)",
        }}
      />
      <div
        className={`relative z-10 mx-auto px-6 py-8 sm:px-10 lg:py-12 ${
          width === "wide" ? "max-w-[1180px]" : "max-w-[720px]"
        }`}
      >
        <header className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft size={16} />
            窓へ戻る
          </Link>
          <BrandMark className="!text-[16px]" />
        </header>

        <div className="mb-8">
          <h1 className="text-[26px] font-medium text-[var(--text-primary)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-[14px] text-[var(--text-secondary)]">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
