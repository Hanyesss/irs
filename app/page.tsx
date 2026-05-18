"use client";

import { AskButton } from "@/components/AskButton";
import { AnalysisCard } from "@/components/AnalysisCard";
import { DeviceStatus } from "@/components/DeviceStatus";
import { useAsk } from "@/hooks/useAsk";
import { useDeviceStatus } from "@/hooks/useDeviceStatus";

export default function Home() {
  const { data: analysis, loading: askLoading, error: askError, ask } = useAsk();
  const { status, loading: statusLoading } = useDeviceStatus();

  const childName = status?.child_name ?? "Ребёнок";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Секция 1: Что у ребёнка? */}
        <section>
          <h1 className="text-2xl font-bold mb-2">Что у ребёнка?</h1>
          <AskButton
            childName={childName}
            loading={askLoading}
            onClick={ask}
          />
          {askError && (
            <div className="text-sm text-red-600 text-center mt-2">
              {askError}
            </div>
          )}
          {analysis && <AnalysisCard analysis={analysis} onRefresh={ask} />}
        </section>

        {/* Секция 3: Статус часов (Секцию 2 — ленту — добавим в Шаге 5) */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Часы ребёнка</h2>
          <DeviceStatus status={status} loading={statusLoading} />
        </section>
      </div>
    </main>
  );
}