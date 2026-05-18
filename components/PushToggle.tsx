"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import {
  isPushSupported,
  subscribeToPush,
  unsubscribeFromPush,
  checkSubscription,
  getNotificationPermission,
} from "@/lib/push";

export function PushToggle() {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // При монтировании проверяем текущее состояние
  useEffect(() => {
    if (!isPushSupported()) {
      setSupported(false);
      return;
    }
    checkSubscription().then(setEnabled);
  }, []);

  async function handleToggle() {
    setError(null);
    setLoading(true);

    try {
      if (enabled) {
        await unsubscribeFromPush();
        setEnabled(false);
      } else {
        await subscribeToPush();
        setEnabled(true);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  }

  if (!supported) {
    return (
      <div className="rounded-2xl border bg-card p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BellOff className="w-4 h-4" />
          <span>Уведомления не поддерживаются этим браузером</span>
        </div>
      </div>
    );
  }

  const permission = getNotificationPermission();
  const denied = permission === "denied";

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className={`w-5 h-5 ${enabled ? "text-blue-500" : "text-muted-foreground"}`} />
          <div>
            <div className="font-medium text-sm">Push-уведомления</div>
            <div className="text-xs text-muted-foreground">
              {enabled
                ? "Включены — будем сообщать о тревогах"
                : "Выключены"}
            </div>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={loading || denied}
          className={`
            relative w-12 h-7 rounded-full transition-colors
            ${enabled ? "bg-blue-500" : "bg-gray-300"}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <span
            className={`
              absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow
              transition-transform
              ${enabled ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </button>
      </div>

      {denied && (
        <div className="mt-3 text-xs text-red-600">
          Уведомления заблокированы в настройках браузера. Разрешите их вручную.
        </div>
      )}

      {error && (
        <div className="mt-3 text-xs text-red-600">{error}</div>
      )}
    </div>
  );
}