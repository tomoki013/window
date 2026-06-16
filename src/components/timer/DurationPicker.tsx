"use client";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useTimerStore } from "@/stores/timer-store";

const OPTIONS = [
  { value: 15, label: "15分" },
  { value: 25, label: "25分" },
  { value: 45, label: "45分" },
  { value: 0, label: "指定なし" },
];

/** Choose a quiet duration. 0 maps to "no limit" (null). */
export function DurationPicker() {
  const durationMinutes = useTimerStore((s) => s.durationMinutes);
  const setDuration = useTimerStore((s) => s.setDuration);

  return (
    <SegmentedControl
      ariaLabel="眺める時間"
      size="sm"
      options={OPTIONS}
      value={durationMinutes ?? 0}
      onChange={(v) => setDuration(v === 0 ? null : v)}
    />
  );
}
