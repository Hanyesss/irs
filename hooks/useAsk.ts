"use client";

import { useState } from "react";
import { askWhatsHappening } from "@/lib/api";
import type { AnalysisResult } from "@/lib/types";

export function useAsk() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    try {
      const result = await askWhatsHappening();
      setData(result.analysis);
      setAudioUrl(result.audio_url);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Что-то пошло не так";
      // Делаем сообщение дружелюбнее
      if (msg.includes("504")) {
        setError("Часы не отвечают. Проверь связь.");
      } else if (msg.includes("502") || msg.includes("Backend unreachable")) {
        setError("Сервер недоступен. Попробуй позже.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return { data, audioUrl, loading, error, ask };
}