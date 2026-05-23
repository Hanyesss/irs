"use client";

import { Battery, Signal, MapPin, WifiOff } from "lucide-react";
import type { DeviceStatus as DeviceStatusType } from "@/lib/types";
import { formatAgo } from "@/lib/format";
import { useMounted } from "@/hooks/useMounted";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  status: DeviceStatusType | null;
  loading?: boolean;
}

export function DeviceStatus({ status, loading }: Props) {
  const { t } = useI18n();
  const mounted = useMounted();

  if (loading || !status) {
    return (
      <div className="rounded-2xl border bg-card p-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4 mb-2" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    );
  }

  const batteryColor =
    status.battery < 20 ? "text-red-500" : "text-foreground";

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm mb-3">
        <div className={`flex items-center gap-1 ${batteryColor}`}>
          <Battery className="w-4 h-4" />
          <span className="font-medium">{status.battery}%</span>
        </div>
        <div className="flex items-center gap-1">
          {status.online ? (
            <Signal className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span>{status.online ? status.signal : t("offline")}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{status.gps_fix ? t("gpsOk") : t("gpsMissing")}</span>
        </div>
      </div>
      <div className="text-base font-semibold">{status.child_name}</div>
      <div className="text-xs text-muted-foreground mt-1">
        {t("lastActivity")}: {mounted && status.last_seen ? formatAgo(status.last_seen) : "..."}
      </div>
    </div>
  );
}