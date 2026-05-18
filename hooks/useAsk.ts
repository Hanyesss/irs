"use client";

import { useState } from "react";
import { askWhatsHappening } from "@/lib/api";
import type { AnalysisResult } from "@/lib/types";

export function useAsk() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    try {
      const result = await askWhatsHappening();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, ask };
}