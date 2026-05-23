import type { Alert, AskResponse, DeviceStatus } from "./types";
import { getDeviceId } from "./storage";

const PROXY = "/api/proxy";

async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${PROXY}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Сервер вернул ошибку ${res.status}: ${text || res.statusText}`
    );
  }

  return res.json();
}

// Статус часов
export async function fetchDeviceStatus(): Promise<DeviceStatus> {
  const deviceId = getDeviceId();
  return http<DeviceStatus>(`/api/parent/device/${deviceId}/status`);
}

// Лента тревог
export async function fetchAlerts(): Promise<Alert[]> {
  const deviceId = getDeviceId();
  const data = await http<{ alerts: Alert[] }>(
    `/api/parent/device/${deviceId}/alerts?limit=20`
  );
  return data.alerts;
}

// Запрос "Что у ребёнка?"
export async function askWhatsHappening(): Promise<AskResponse> {
  const deviceId = getDeviceId();
  return http<AskResponse>(`/api/parent/device/${deviceId}/ask`, {
    method: "POST",
    // Бэк ожидает form-data, но question необязателен — шлём пустое тело
    body: "",
    headers: {}, // переопределяем дефолтные application/json
  });
}

// Подписка на push
export async function subscribePush(
  subscription: PushSubscription
): Promise<void> {
  await http("/api/parent/push/subscribe", {
    method: "POST",
    body: JSON.stringify({ subscription: subscription.toJSON() }),
  });
}

// Публичный URL аудио
export function getAudioUrl(audioPath: string): string {
  // audio_url приходит вида "/api/parent/audio/evt_xxx.wav"
  return `${PROXY}${audioPath}`;
}