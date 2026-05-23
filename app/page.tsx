"use client";

import { useEffect, useState } from "react";
import { AskButton } from "@/components/AskButton";
import { AnalysisCard } from "@/components/AnalysisCard";
import { DeviceStatus } from "@/components/DeviceStatus";
import { AlertsList } from "@/components/AlertsList";
import { AlertDetailDialog } from "@/components/AlertDetailDialog";
import { PushToggle } from "@/components/PushToggle";
import { LangSwitcher } from "@/components/LangSwitcher";
import { useAsk } from "@/hooks/useAsk";
import { useDeviceStatus } from "@/hooks/useDeviceStatus";
import { useAlerts } from "@/hooks/useAlerts";
import { useI18n } from "@/lib/i18n-context";
import type { Alert } from "@/lib/types";

export default function Home() {
  const { t } = useI18n();
  const { data: analysis, audioUrl, loading: askLoading, error: askError, ask } = useAsk();
  const { status, loading: statusLoading } = useDeviceStatus();
  const { alerts, loading: alertsLoading, refresh } = useAlerts();

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const alertId = params.get("alert");
    if (alertId && alerts.length > 0) {
      const found = alerts.find((a) => a.alert_id === alertId);
      if (found) setSelectedAlert(found);
    }
  }, [alerts]);

  const childName = status?.child_name ?? t("defaultChildName");

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-8">
        {/* Шапка с переключателем языков */}
        <div className="flex justify-end">
          <LangSwitcher />
        </div>

        <section>
          <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
          <AskButton childName={childName} loading={askLoading} onClick={ask} />
          {askError && (
            <div className="text-sm text-red-600 text-center mt-2">
              {askError}
            </div>
          )}
          {analysis && (
            <AnalysisCard
              analysis={analysis}
              audioUrl={audioUrl}
              onRefresh={ask}
            />
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("sectionEvents")}</h2>
          <AlertsList
            alerts={alerts}
            loading={alertsLoading}
            onAlertClick={setSelectedAlert}
            onRefresh={refresh}
          />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">{t("sectionWatch")}</h2>
          <div className="space-y-3">
            <DeviceStatus status={status} loading={statusLoading} />
            <PushToggle />
          </div>
        </section>
      </div>

      <AlertDetailDialog
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </main>
  );
}