import { forwardRef, type HTMLAttributes } from "react";

type Variant = "panel" | "strong" | "soft";

const variantClass: Record<Variant, string> = {
  panel: "glass-panel",
  strong: "glass-strong",
  soft: "glass-soft",
};

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
};

export const GlassPanel = forwardRef<HTMLDivElement, Props>(function GlassPanel(
  { variant = "panel", className = "", style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`${variantClass[variant]} rounded-[var(--radius-large)] ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});
