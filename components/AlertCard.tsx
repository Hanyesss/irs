"use client";

import type { Alert } from "@/lib/types";
import { ANXIETY_STYLES, getSourceIcon, getSourceLabel } from "@/lib/anxiety";
import { formatRelativeTime } from "@/lib/format";
import { useMounted } from "@/hooks/useMounted";
import { Play } from "lucide-react";

interface Props {
  alert: Alert;
  onClick: () => void;
}

export function AlertCard({ alert, onClick }: Props) {
  const mounted = useMounted();
  const style = ANXIETY_STYLES[alert.alert_level];
  const icon = getSourceIcon(alert.type);
  const label = getSourceLabel(alert.type);

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
          {mounted ? formatRelativeTime(alert.timestamp) : ""}
        </div>
      </div>

      <div className="text-sm mb-2">{alert.summary}</div>

      <div className="flex items-center justify-between">
        <div className="text-xs">
          Уровень:{" "}
          <span className="font-semibold">{alert.alert_level}/5</span>
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