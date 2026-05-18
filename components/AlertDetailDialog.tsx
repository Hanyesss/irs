"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Alert } from "@/lib/types";
import { ANXIETY_STYLES, SOURCE_ICONS } from "@/lib/anxiety";
import { formatRelativeTime } from "@/lib/format";
import { MapPin, Phone, Play } from "lucide-react";

interface Props {
  alert: Alert | null;
  onClose: () => void;
}

export function AlertDetailDialog({ alert, onClose }: Props) {
  // Если alert null — диалог закрыт
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
              {formatRelativeTime(alert.timestamp)}
            </div>

            <div
              className={`
                flex items-center gap-2 rounded-lg px-3 py-2
                ${ANXIETY_STYLES[alert.anxiety_level].bg}
                ${ANXIETY_STYLES[alert.anxiety_level].text}
              `}
            >
              <span>{SOURCE_ICONS[alert.source]}</span>
              <span className="font-semibold">
                Тревожность: {alert.anxiety_level}/5
              </span>
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Анализ AI
              </div>
              <p className="text-sm leading-relaxed">{alert.ai_analysis}</p>
            </div>

            {alert.location && (
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Местоположение
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{alert.location.address}</span>
                </div>
              </div>
            )}

            {alert.audio_url && (
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600">
                <Play className="w-4 h-4" />
                Послушать запись 30 сек
              </button>
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