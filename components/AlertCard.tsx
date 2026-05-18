"use client";

import type { Alert } from "@/lib/types";
import { ANXIETY_STYLES, SOURCE_ICONS, SOURCE_LABELS } from "@/lib/anxiety";
import { formatRelativeTime } from "@/lib/format";
import { Play } from "lucide-react";

interface Props {
  alert: Alert;
  onClick: () => void;
}

export function AlertCard({ alert, onClick }: Props) {
  const style = ANXIETY_STYLES[alert.anxiety_level];
  const icon = SOURCE_ICONS[alert.source];
  const label = SOURCE_LABELS[alert.source];

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left
        rounded-2xl border-2 ${style.border} ${style.bg}
        p-4 transition-transform active:scale-[0.98]
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg">{icon}</span>
          <span className={style.text}>{label}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatRelativeTime(alert.timestamp)}
        </div>
      </div>

      <div className="text-sm mb-2">{alert.summary}</div>

      <div className="flex items-center justify-between">
        <div className="text-xs">
          Тревожность: <span className="font-semibold">{alert.anxiety_level}/5</span>
        </div>
        {alert.audio_url && (
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <Play className="w-3 h-3" />
            <span>Послушать</span>
          </div>
        )}
      </div>
    </button>
  );
}