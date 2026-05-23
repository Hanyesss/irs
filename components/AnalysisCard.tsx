"use client";

import { Sparkles, RefreshCw, Play } from "lucide-react";
import type { AnalysisResult } from "@/lib/types";
import { ANXIETY_STYLES } from "@/lib/anxiety";
import { getAudioUrl } from "@/lib/api";

interface Props {
  analysis: AnalysisResult;
  audioUrl: string | null;
  onRefresh: () => void;
}

export function AnalysisCard({ analysis, audioUrl, onRefresh }: Props) {
  const style = ANXIETY_STYLES[analysis.alert_level];

  return (
    <div className={`rounded-2xl border-2 ${style.border} ${style.bg} p-4 mt-4`}>
      <div className="flex items-center gap-2 font-semibold mb-3">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span>Анализ AI</span>
      </div>

      <div className="space-y-2 text-sm">
        {analysis.heard && (
          <div>
            <span className="font-medium">Слышу:</span> {analysis.heard}
          </div>
        )}
        {analysis.voices && (
          <div>
            <span className="font-medium">Голоса:</span> {analysis.voices}
          </div>
        )}
        {analysis.context && (
          <div>
            <span className="font-medium">Контекст:</span> {analysis.context}
          </div>
        )}
        <div>
          <span className="font-medium">Уровень:</span> {analysis.alert_level}/5 — <span className={style.text}>{style.label}</span>
        </div>
        <div className="pt-2 border-t font-medium">
          {analysis.summary}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {audioUrl && (
          <a href={getAudioUrl(audioUrl)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg bg-white border hover:bg-gray-50">
            <Play className="w-4 h-4" />
            Послушать запись
          </a>
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