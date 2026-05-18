import type { AnxietyLevel, AlertSource } from "./types";

type AnxietyStyle = {
  border: string;
  bg: string;
  text: string;
  label: string;
};

export const ANXIETY_STYLES: { [key in AnxietyLevel]: AnxietyStyle } = {
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

export const SOURCE_ICONS: { [key in AlertSource]: string } = {
  watch: "⚠️",
  parent: "🎤",
  sos: "🆘",
};

export const SOURCE_LABELS: { [key in AlertSource]: string } = {
  watch: "Тревога",
  parent: "Запрос",
  sos: "SOS",
};