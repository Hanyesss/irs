// Уровень тревожности от 0 (ребёнка не слышно) до 5 (срочно)
export type AlertLevel = 0 | 1 | 2 | 3 | 4 | 5;

// Тип события
export type EventType =
  | "auto_cry_detected" // часы сами обнаружили
  | "parent_request"    // родитель спросил
  | "sos_button";       // SOS-кнопка

// Карточка одного события в ленте
export interface Alert {
  alert_id: string;
  type: string;
  timestamp: string; // ISO 8601
  alert_level: AlertLevel;
  summary: string;
  heard: string | null;
  voices: string | null;
  context: string | null;
  audio_url: string | null;
  location: { lat: number; lng: number } | null;
}

// Анализ при запросе "что у ребёнка?"
export interface AnalysisResult {
  heard: string;
  voices: string;
  context: string;
  alert_level: AlertLevel;
  summary: string;
}

// Ответ /ask
export interface AskResponse {
  status: "ok";
  alert_id: string;
  analysis: AnalysisResult;
  audio_url: string;
  timestamp: string;
}

// Статус часов
export interface DeviceStatus {
  device_id: string;
  child_name: string;
  battery: number;
  signal: string; // "4G" или "weak"
  signal_strength: number;
  gps_fix: boolean;
  location: { lat: number; lng: number } | null;
  last_seen: string | null;
  online: boolean;
}