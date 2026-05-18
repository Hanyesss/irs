"use client";

import useSWR from "swr";
import { fetchDeviceStatus } from "@/lib/api";

export function useDeviceStatus() {
  const { data, error, isLoading } = useSWR(
    "device-status",
    fetchDeviceStatus,
    {
      refreshInterval: 30000, // обновлять каждые 30 сек (по ТЗ)
    }
  );

  return { status: data ?? null, error, loading: isLoading };
}