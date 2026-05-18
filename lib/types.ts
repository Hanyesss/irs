// Типы данных, с которыми работает приложение.
// Сервер возвращает данные именно в этой структуре.

/**
 * Уровень тревожности от 1 (всё ок) до 5 (срочно)
 */
export type AnxietyLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Источник события:
 * - watch: часы сами обнаружили (плач, опасные звуки)
 * - parent: родитель сам нажал "Послушать"
 * - sos: ребёнок нажал кнопку SOS на часах
 */
export type AlertSource = "watch" | "parent" | "sos";

/**
 * Карточка одного события в ленте тревог
 */
export interface Alert {
  id: string;
  timestamp: string; // ISO 8601, например "2026-05-18T14:32:00Z"
  source: AlertSource;
  anxiety_level: AnxietyLevel;
  summary: string; // короткое описание ("Маша плачет, рядом громкие голоса")
  ai_analysis: string; // полный текст анализа AI
  audio_url: string | null; // URL аудиозаписи (может быть null)
  location?: {
    lat: number;
    lng: number;
    address: string; // "ул. Ленина, 25"
  };
}

/**
 * Ответ на запрос "Что у ребёнка?" — анализ текущей ситуации
 */
export interface AnalysisResult {
  id: string;
  timestamp: string;
  sounds: string; // "спокойные голоса, детская речь"
  voices: string; // "ребёнок и взрослая женщина"
  context: string; // "спокойная обстановка"
  anxiety_level: AnxietyLevel;
  conclusion: string; // "ребёнок в безопасности"
  audio_url: string | null;
}

/**
 * Статус часов ребёнка
 */
export interface DeviceStatus {
  child_name: string;
  battery_percent: number; // 0-100
  signal: "none" | "weak" | "good" | "excellent";
  signal_type: "2G" | "3G" | "4G" | "5G" | "WiFi";
  gps_ok: boolean;
  last_activity: string; // ISO 8601
}