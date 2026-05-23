"use client";

const KEYS = {
  DEVICE_ID: "irs_device_id",
  PARENT_ID: "irs_parent_id",
} as const;

function get(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(key) || fallback;
}

function set(key: string, value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

// Для MVP — используем тестовые ID, которые создаются на бэке
export function getDeviceId(): string {
  return get(
    KEYS.DEVICE_ID,
    process.env.NEXT_PUBLIC_DEVICE_ID || "watch_test_001"
  );
}

export function setDeviceId(id: string): void {
  set(KEYS.DEVICE_ID, id);
}

export function getParentId(): string {
  return get(
    KEYS.PARENT_ID,
    process.env.NEXT_PUBLIC_PARENT_ID || "parent_test_001"
  );
}