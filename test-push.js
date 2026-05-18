const webpush = require("web-push");

// === Заполни 3 поля ниже ===

// 1. Публичный VAPID-ключ (тот же, что в .env.local)
const PUBLIC_KEY = "BFcKTpJgE4XgBV0I4JQLcTJtMY0ek5z-4ZqBMprHN-0CJndQqTQ-bkkjwMFVOI4IHfyI1lZVgUzyElfpfhRHDZo";

// 2. Приватный VAPID-ключ (из вывода `npx web-push generate-vapid-keys`)
const PRIVATE_KEY = "mK-rsu2Bu4YL2e15FQXWGPVxncIpcFW_IOdqCigBkIY";

// 3. JSON подписки из консоли браузера (целиком, как было)
const SUBSCRIPTION_JSON = `{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABqCxDQEksmU73sH5u9na981tgvCshncLLKl2JJD1LGUrbjo0hc45mflRRgAXnZmwQ5hOBS60yA0IWzko2rDgoozQwYJyMNbYMbniQ2FtpXb6ur7NhhxvhxHlIz0d_It-h82TQ8xVvG-tMZtyhFWDXsTVKhGoYRJkKRUFGEAwa7NLESeRA","expirationTime":null,"keys":{"auth":"zMhT73C-efuxKPqorX2ZGQ","p256dh":"BGwbvizUakVZTSeR_SHpiBHI492Wx_afgZpk9ylCkEBTPLw8oLjzMtF0t1oGC_oPUpwCK8OQrTLpCRcfrBYM_Mc"}}`;

// ===========================

webpush.setVapidDetails(
  "mailto:test@example.com",
  PUBLIC_KEY,
  PRIVATE_KEY
);

const subscription = JSON.parse(SUBSCRIPTION_JSON);

const payload = JSON.stringify({
  title: "⚠️ Маша плачет",
  body: "Тревожность 4/5. Слышен громкий мужской голос на повышенных тонах.",
  icon: "/icon-192.png",
  data: {
    alert_id: "alrt_test",
    url: "/",
  },
});

webpush
  .sendNotification(subscription, payload)
  .then(() => console.log("✓ Push отправлен"))
  .catch((err) => console.error("✗ Ошибка:", err));
