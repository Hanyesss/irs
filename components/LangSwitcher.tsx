"use client";

import { useI18n } from "@/lib/i18n-context";
import type { Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export function LangSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex gap-1 bg-white rounded-full border p-1 shadow-sm">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`
            px-3 py-1 rounded-full text-xs font-medium transition
            ${lang === l.code
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"}
          `}
        >
          <span className="mr-1">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}