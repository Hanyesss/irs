/**
 * Превращает ISO-дату в "14:32 Сегодня" / "вчера 09:15" / "18 мая 14:32"
 */
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const time = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isSameDay = date.toDateString() === now.toDateString();
  if (isSameDay) return `${time} Сегодня`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `${time} Вчера`;
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  }) + ` ${time}`;
}

/**
 * "2 мин назад", "час назад", "5 часов назад"
 */
export function formatAgo(iso: string): string {
  const diffSec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diffSec < 60) return "только что";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} мин назад`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} ч назад`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} дн назад`;
}