export const maxDuration = 60; // секунд (макс на Hobby плане)
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://213.173.108.156:17087";

async function handler(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const targetPath = path.join("/");

  // Сохраняем query string
  const url = new URL(req.url);
  const targetUrl = `${BACKEND_URL}/${targetPath}${url.search}`;

  // Копируем заголовки, кроме служебных
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    // Не пробрасываем host, content-length и подобные
    if (
      !["host", "content-length", "connection"].includes(key.toLowerCase())
    ) {
      headers.set(key, value);
    }
  });

  // Подставляем X-Parent-ID по умолчанию для запросов от родителя
  if (!headers.has("x-parent-id")) {
    headers.set(
      "x-parent-id",
      process.env.NEXT_PUBLIC_PARENT_ID || "parent_test_001"
    );
  }

  // Тело запроса (для POST/PUT)
  let body: BodyInit | undefined = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      // Тайм-аут 90 сек: ask может ждать до 60 сек ответа от часов
      signal: AbortSignal.timeout(90_000),
    });

    // Передаём ответ обратно как есть
    const data = await response.arrayBuffer();
    const responseHeaders = new Headers(response.headers);

    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Proxy error";
    return NextResponse.json(
      { error: "Backend unreachable", detail: message },
      { status: 502 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
