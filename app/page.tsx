"use client";

import { useState } from "react";
import { AskButton } from "@/components/AskButton";
import { AnalysisCard } from "@/components/AnalysisCard";
import { DeviceStatus } from "@/components/DeviceStatus";
import { AlertsList } from "@/components/AlertsList";
import { AlertDetailDialog } from "@/components/AlertDetailDialog";
import { useAsk } from "@/hooks/useAsk";
import { useDeviceStatus } from "@/hooks/useDeviceStatus";
import { useAlerts } from "@/hooks/useAlerts";
import type { Alert } from "@/lib/types";

export default function Home() {
  const { data: analysis, loading: askLoading, error: askError, ask } = useAsk();
  const { status, loading: statusLoading } = useDeviceStatus();
  const { alerts, loading: alertsLoading, refresh } = useAlerts();

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const childName = status?.child_name ?? "Ребёнок";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
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

        {/* Секция 2: Лента тревог */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Последние события</h2>
          <AlertsList
            alerts={alerts}
            loading={alertsLoading}
            onAlertClick={setSelectedAlert}
            onRefresh={refresh}
          />
        </section>

        {/* Секция 3: Статус часов */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Часы ребёнка</h2>
          <DeviceStatus status={status} loading={statusLoading} />
        </section>
      </div>

      {/* Модалка деталей — рендерится поверх */}
      <AlertDetailDialog
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </main>
  );
}