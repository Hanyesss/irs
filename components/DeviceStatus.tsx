"use client";

import { Battery, Signal, MapPin } from "lucide-react";
import type { DeviceStatus as DeviceStatusType } from "@/lib/types";
import { formatAgo } from "@/lib/format";

interface Props {
  status: DeviceStatusType | null;
  loading?: boolean;
}

export function DeviceStatus({ status, loading }: Props) {
  if (loading || !status) {
    return (
      <div className="rounded-2xl border bg-card p-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4 mb-2" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    );
  }

  // Цвет батареи: красный если меньше 20%, иначе обычный
  const batteryColor =
    status.battery_percent < 20 ? "text-red-500" : "text-foreground";

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm mb-3">
        <div className={`flex items-center gap-1 ${batteryColor}`}>
          <Battery className="w-4 h-4" />
          <span className="font-medium">{status.battery_percent}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Signal className="w-4 h-4" />
          <span>{status.signal_type}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{status.gps_ok ? "GPS ✓" : "GPS —"}</span>
        </div>
      </div>
      <div className="text-base font-semibold">{status.child_name}</div>
      <div className="text-xs text-muted-foreground mt-1">
        Последняя активность: {formatAgo(status.last_activity)}
      </div>
    </div>
  );
}