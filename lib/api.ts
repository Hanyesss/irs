import type { Alert, AnalysisResult, DeviceStatus } from "./types";

// Пока используем mock-данные. В Шаге 5 подключим реальный сервер.
const USE_MOCK = true;

// Имитация задержки сети
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// === Mock-данные ===

const mockAlerts: Alert[] = [
  {
    id: "alrt_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    source: "watch",
    anxiety_level: 4,
    summary: "Маша плачет, рядом громкие голоса",
    ai_analysis:
      "Маша плачет громко, рядом слышен мужской голос на повышенных тонах. Рекомендую связаться с местом нахождения ребёнка.",
    audio_url: null,
    location: { lat: 55.751, lng: 37.617, address: "ул. Ленина, 25" },
  },
  {
    id: "alrt_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    source: "parent",
    anxiety_level: 1,
    summary: "Спокойные голоса, детская речь",
    ai_analysis: "Ребёнок в безопасности, рядом взрослая женщина.",
    audio_url: null,
  },
  {
    id: "alrt_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    source: "watch",
    anxiety_level: 2,
    summary: "Лёгкое беспокойство в голосе ребёнка",
    ai_analysis: "Маша немного капризничает, но обстановка спокойная.",
    audio_url: null,
  },
];

const mockDeviceStatus: DeviceStatus = {
  child_name: "Маша",
  battery_percent: 87,
  signal: "excellent",
  signal_type: "4G",
  gps_ok: true,
  last_activity: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
};

// === API-функции ===

export async function fetchAlerts(): Promise<Alert[]> {
  if (USE_MOCK) {
    await delay(400);
    return mockAlerts;
  }
  const res = await fetch("/api/parent/alerts");
  if (!res.ok) throw new Error("Не удалось загрузить тревоги");
  return res.json();
}

export async function fetchDeviceStatus(): Promise<DeviceStatus> {
  if (USE_MOCK) {
    await delay(300);
    return mockDeviceStatus;
  }
  const res = await fetch("/api/parent/device-status");
  if (!res.ok) throw new Error("Не удалось получить статус часов");
  return res.json();
}

export async function askWhatsHappening(): Promise<AnalysisResult> {
  if (USE_MOCK) {
    await delay(2500); // имитируем ожидание AI
    return {
      id: "anlz_" + Date.now(),
      timestamp: new Date().toISOString(),
      sounds: "спокойные голоса, детская речь",
      voices: "ребёнок и взрослая женщина (вероятно мама или воспитатель)",
      context: "спокойная обстановка",
      anxiety_level: 1,
      conclusion: "ребёнок в безопасности",
      audio_url: null,
    };
  }
  const res = await fetch("/api/parent/ask", { method: "POST" });
  if (!res.ok) throw new Error("Часы не отвечают");
  return res.json();
}