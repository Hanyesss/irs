"use client";

/**
 * Конвертирует VAPID-ключ из base64 в Uint8Array для PushManager.subscribe
 */
/**
 * Конвертирует VAPID-ключ из base64 в BufferSource для PushManager.subscribe
 */
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; ++i) {
    view[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

/**
 * Поддерживает ли браузер Web Push
 */
export function isPushSupported(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

/**
 * Текущий статус разрешения: granted | denied | default
 */
export function getNotificationPermission(): NotificationPermission {
  if (typeof window === "undefined") return "default";
  if (!("Notification" in window)) return "denied";
  return Notification.permission;
}

/**
 * Подписать пользователя на push.
 * Возвращает subscription, который нужно отправить на сервер.
 */
export async function subscribeToPush(): Promise<PushSubscription> {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error("VAPID public key не настроен");
  }

  // 1. Спросить разрешение
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Разрешение на уведомления не получено");
  }

  // 2. Дождаться регистрации Service Worker
  const registration = await navigator.serviceWorker.ready;

  // 3. Подписаться (или вернуть существующую подписку)
  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  // 4. Отправить подписку на сервер (пока mock — просто логируем)
  console.log("[Push] Subscription:", JSON.stringify(subscription));
  // TODO: когда бэк готов, заменить на:
  // await fetch("/api/parent/push/subscribe", { ... })

  return subscription;
}

/**
 * Отписать пользователя
 */
export async function unsubscribeFromPush(): Promise<boolean> {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return false;
  return subscription.unsubscribe();
}

/**
 * Проверить, есть ли активная подписка
 */
export async function checkSubscription(): Promise<boolean> {
  if (!isPushSupported()) return false;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  return subscription !== null;
}