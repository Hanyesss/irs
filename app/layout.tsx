import { I18nProvider } from "@/lib/i18n-context";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "IRS Kids — для родителей",
  description: "Слышьте что происходит вокруг ребёнка",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IRS Kids",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ServiceWorkerRegister />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}