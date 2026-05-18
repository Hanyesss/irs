"use client";

import type { Alert } from "@/lib/types";
import { AlertCard } from "./AlertCard";
import { RefreshCw } from "lucide-react";

interface Props {
  alerts: Alert[];
  loading: boolean;
  onAlertClick: (alert: Alert) => void;
  onRefresh: () => void;
}

export function AlertsList({ alerts, loading, onAlertClick, onRefresh }: Props) {
  // Защита от undefined во время ревалидации SWR
  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  // Состояние загрузки (первый раз)
  if (loading && safeAlerts.length === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border bg-card p-4 h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Пусто
  if (safeAlerts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-card p-8 text-center">
        <div className="text-4xl mb-2">😊</div>
        <div className="font-medium mb-1">Пока тихо</div>
        <div className="text-sm text-muted-foreground">
          Тревог не было. Это хорошо.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
        >
          <RefreshCw className="w-3 h-3" />
          Обновить
        </button>
      </div>
      {safeAlerts.map((alert) => (
        <AlertCard
          key={alert.id}
          alert={alert}
          onClick={() => onAlertClick(alert)}
        />
      ))}
    </div>
  );
}