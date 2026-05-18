"use client";

import useSWR from "swr";
import { fetchAlerts } from "@/lib/api";

export function useAlerts() {
  const { data, error, isLoading, mutate } = useSWR("alerts", fetchAlerts, {
    refreshInterval: 60000,
    keepPreviousData: true, // не обнулять данные во время перезагрузки
  });

  return {
    alerts: Array.isArray(data) ? data : [],
    error,
    loading: isLoading,
    refresh: () => mutate(),
  };
}