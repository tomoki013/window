"use client";

type Props = {
  value: number;
  onChange: (v: number) => void;
  label: string;
};

/** A slim range slider styled for the dark glass UI. */
export function VolumeControl({ value, onChange, label }: Props) {
  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">{label}</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="quiet-range h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15"
        style={{
          background: `linear-gradient(to right, var(--accent-secondary) ${
            value * 100
          }%, rgba(255,255,255,0.15) ${value * 100}%)`,
        }}
      />
      <style>{`
        .quiet-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px; width: 14px; border-radius: 50%;
          background: var(--text-primary);
          box-shadow: 0 0 8px rgba(169,139,250,0.6);
          cursor: pointer;
        }
        .quiet-range::-moz-range-thumb {
          height: 14px; width: 14px; border-radius: 50%; border: none;
          background: var(--text-primary);
          box-shadow: 0 0 8px rgba(169,139,250,0.6);
          cursor: pointer;
        }
      `}</style>
    </label>
  );
}
