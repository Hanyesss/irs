"use client";

import { Sparkles, RefreshCw, Play } from "lucide-react";
import type { AnalysisResult } from "@/lib/types";

interface Props {
  analysis: AnalysisResult;
  onRefresh: () => void;
}

// Цвет рамки и значок для уровня тревожности
const ANXIETY_STYLES = {
  1: { color: "border-green-500 bg-green-50", icon: "✅" },
  2: { color: "border-cyan-500 bg-cyan-50", icon: "🙂" },
  3: { color: "border-yellow-500 bg-yellow-50", icon: "⚠️" },
  4: { color: "border-orange-500 bg-orange-50", icon: "⚠️" },
  5: { color: "border-red-500 bg-red-50", icon: "🚨" },
} as const;

export function AnalysisCard({ analysis, onRefresh }: Props) {
  const style = ANXIETY_STYLES[analysis.anxiety_level];

  return (
    <div className={`rounded-2xl border-2 ${style.color} p-4 mt-4`}>
      <div className="flex items-center gap-2 font-semibold mb-3">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span>Анализ AI</span>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Слышу:</span> {analysis.sounds}
        </div>
        <div>
          <span className="font-medium">Голоса:</span> {analysis.voices}
        </div>
        <div>
          <span className="font-medium">Контекст:</span> {analysis.context}
        </div>
        <div>
          <span className="font-medium">Тревожность:</span>{" "}
          {analysis.anxiety_level}/5 {style.icon}
        </div>
        <div className="pt-2 border-t font-medium">
          Вывод: {analysis.conclusion}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {analysis.audio_url && (
          <button className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg bg-white border hover:bg-gray-50">
            <Play className="w-4 h-4" />
            Послушать запись
          </button>
        )}
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 ml-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Обновить
        </button>
      </div>
    </div>
  );
}