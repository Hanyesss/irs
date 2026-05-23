import type { AlertLevel } from "./types";

type AnxietyStyle = {
  border: string;
  bg: string;
  text: string;
  label: string;
};

export const ANXIETY_STYLES: { [key in AlertLevel]: AnxietyStyle } = {
  0: {
    border: "border-gray-400",
    bg: "bg-gray-50",
    text: "text-gray-700",
    label: "Ребёнка не слышно",
  },
  1: {
    border: "border-green-500",
    bg: "bg-green-50",
    text: "text-green-700",
    label: "Спокойно",
  },
  2: {
    border: "border-cyan-500",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    label: "Лёгкое беспокойство",
  },
  3: {
    border: "border-yellow-500",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    label: "Внимание",
  },
  4: {
    border: "border-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-700",
    label: "Тревога",
  },
  5: {
    border: "border-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
    label: "Срочно",
  },
};

// На бэке event_type — строка, мапим на иконку
export function getSourceIcon(eventType: string): string {
  if (eventType === "sos_button") return "🆘";
  if (eventType === "parent_request") return "🎤";
  return "⚠️"; // auto_cry_detected и всё остальное
}

export function getSourceLabel(eventType: string): string {
  if (eventType === "sos_button") return "SOS";
  if (eventType === "parent_request") return "Запрос";
  return "Тревога";
}