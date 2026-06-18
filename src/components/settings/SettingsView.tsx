"use client";
import { Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { VolumeControl } from "@/components/audio/VolumeControl";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { brandConfig } from "@/config/brand";
import { deleteAllReflections, exportData } from "@/db/reflections";
import { usePreferences } from "@/hooks/usePreferences";
import type { QualityTier } from "@/types/record";

function Row({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] py-5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-sm">
        <p className="text-[14px] text-[var(--text-primary)]">{title}</p>
        {hint && (
          <p className="mt-0.5 text-[12px] text-[var(--text-muted)]">{hint}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function SettingsView() {
  const { prefs, update } = usePreferences();
  const [exported, setExported] = useState(false);

  const onExport = async () => {
    const json = await exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${brandConfig.id}-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    window.setTimeout(() => setExported(false), 2000);
  };

  const onDeleteAll = async () => {
    if (
      !window.confirm(
        "すべての記録を削除します。この操作は取り消せません。よろしいですか？",
      )
    )
      return;
    await deleteAllReflections();
    window.alert("すべての記録を削除しました。");
  };

  return (
    <div className="space-y-6">
      <GlassPanel variant="soft" className="px-6 py-2">
        <Row title="全体の音量">
          <div className="w-48">
            <VolumeControl
              label="全体の音量"
              value={prefs.masterVolume}
              onChange={(v) => update({ masterVolume: v })}
            />
          </div>
        </Row>
        <Row title="音を有効にする" hint="オフにすると環境音を再生しません。">
          <SegmentedControl
            ariaLabel="音の有効・無効"
            size="sm"
            options={[
              { value: "on", label: "オン" },
              { value: "off", label: "オフ" },
            ]}
            value={prefs.soundEnabled ? "on" : "off"}
            onChange={(v) => update({ soundEnabled: v === "on" })}
          />
        </Row>
      </GlassPanel>

      <GlassPanel variant="soft" className="px-6 py-2">
        <Row
          title="描画品質"
          hint="自動では、端末や画面に合わせて開始品質を選びます。"
        >
          <SegmentedControl<QualityTier>
            ariaLabel="描画品質"
            size="sm"
            options={[
              { value: "auto", label: "自動" },
              { value: "high", label: "高" },
              { value: "balanced", label: "標準" },
              { value: "low", label: "軽量" },
            ]}
            value={prefs.quality}
            onChange={(v) => update({ quality: v })}
          />
        </Row>
        <Row
          title="動きを抑える"
          hint="視差や雨などの動きを弱め、静止に近い表示にします。"
        >
          <SegmentedControl
            ariaLabel="動きを抑える"
            size="sm"
            options={[
              { value: "off", label: "通常" },
              { value: "on", label: "抑える" },
            ]}
            value={prefs.reducedVisualEffects ? "on" : "off"}
            onChange={(v) => update({ reducedVisualEffects: v === "on" })}
          />
        </Row>
        <Row title="既定のそばに置く時間">
          <SegmentedControl
            ariaLabel="既定のそばに置く時間"
            size="sm"
            options={[
              { value: 0, label: "なし" },
              { value: 15, label: "15分" },
              { value: 25, label: "25分" },
              { value: 45, label: "45分" },
            ]}
            value={prefs.defaultDuration ?? 0}
            onChange={(v) =>
              update({ defaultDuration: v === 0 ? null : (v as number) })
            }
          />
        </Row>
      </GlassPanel>

      <GlassPanel variant="soft" className="px-6 py-2">
        <Row
          title="データの書き出し"
          hint="記録をJSONファイルとして保存します。"
        >
          <GlassButton variant="secondary" onClick={onExport}>
            <Download size={15} />
            {exported ? "書き出しました" : "エクスポート"}
          </GlassButton>
        </Row>
        <Row
          title="すべての記録を削除"
          hint="この端末に保存された記録をすべて消去します。"
        >
          <GlassButton variant="ghost" onClick={onDeleteAll}>
            <Trash2 size={15} />
            削除する
          </GlassButton>
        </Row>
      </GlassPanel>

      <p className="px-2 text-[12px] leading-relaxed text-[var(--text-muted)]">
        記録と設定は、この端末のブラウザ内（IndexedDB）にのみ保存されます。
        サーバーへは送信されません。
      </p>
    </div>
  );
}
