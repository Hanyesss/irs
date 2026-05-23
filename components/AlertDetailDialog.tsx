"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Alert } from "@/lib/types";
import { ANXIETY_STYLES, getSourceIcon } from "@/lib/anxiety";
import { formatRelativeTime } from "@/lib/format";
import { useMounted } from "@/hooks/useMounted";
import { getAudioUrl } from "@/lib/api";
import { MapPin, Phone, Play } from "lucide-react";

interface Props {
  alert: Alert | null;
  onClose: () => void;
}

export function AlertDetailDialog({ alert, onClose }: Props) {
  const mounted = useMounted();
  const open = alert !== null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Деталь события</DialogTitle>
        </DialogHeader>

        {alert && (
          <div className="space-y-4 mt-2">
            <div className="text-sm text-muted-foreground">
              {mounted ? formatRelativeTime(alert.timestamp) : ""}
            </div>

            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${ANXIETY_STYLES[alert.alert_level].bg} ${ANXIETY_STYLES[alert.alert_level].text}`}>
              <span>{getSourceIcon(alert.type)}</span>
              <span className="font-semibold">
                Уровень: {alert.alert_level}/5
              </span>
            </div>

            <div className="space-y-2 text-sm">
              {alert.heard && (
                <div>
                  <span className="font-medium">Слышно:</span> {alert.heard}
                </div>
              )}
              {alert.voices && (
                <div>
                  <span className="font-medium">Голоса:</span> {alert.voices}
                </div>
              )}
              {alert.context && (
                <div>
                  <span className="font-medium">Контекст:</span> {alert.context}
                </div>
              )}
              <div className="pt-2 border-t">
                <span className="font-medium">Анализ AI:</span>
                <p className="leading-relaxed mt-1">{alert.summary}</p>
              </div>
            </div>

            {alert.location && (
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Местоположение
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <a href={`https://www.google.com/maps?q=${alert.location.lat},${alert.location.lng}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Открыть на карте
                  </a>
                </div>
              </div>
            )}

            {alert.audio_url && (
              <a href={getAudioUrl(alert.audio_url)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600">
                <Play className="w-4 h-4" />
                Послушать запись
              </a>
            )}

            <div className="flex gap-2 pt-2">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border hover:bg-gray-50">
                <Phone className="w-4 h-4" />
                Позвонить
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-lg border hover:bg-gray-50"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}