"use client";

import type { Alert } from "@/lib/types";
import { ANXIETY_STYLES, getSourceIcon } from "@/lib/anxiety";
import { formatRelativeTime } from "@/lib/format";
import { useMounted } from "@/hooks/useMounted";
import { useI18n } from "@/lib/i18n-context";
import { Play } from "lucide-react";

interface Props {
  alert: Alert;
  onClick: () => void;
}

function getSourceLabelKey(eventType: string): "sourceWatch" | "sourceParent" | "sourceSos" {
  if (eventType === "sos_button") return "sourceSos";
  if (eventType === "parent_request") return "sourceParent";
  return "sourceWatch";
}

export function AlertCard({ alert, onClick }: Props) {
  const { t } = useI18n();
  const mounted = useMounted();
  const style = ANXIETY_STYLES[alert.alert_level];
  const icon = getSourceIcon(alert.type);
  const label = t(getSourceLabelKey(alert.type));

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
          {t("level")}: <span className="font-semibold">{alert.alert_level}/5</span>
        </div>
        {alert.audio_url && (
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <Play className="w-3 h-3" />
            <span>{t("listenRecording")}</span>
          </div>
        )}
      </div>
    </button>
  );
}