"use client";

import { Mic, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface Props {
  childName: string;
  loading: boolean;
  onClick: () => void;
}

export function AskButton({ childName, loading, onClick }: Props) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center py-6">
      <button
        onClick={onClick}
        disabled={loading}
        className="
          w-44 h-44 rounded-full
          bg-blue-500 hover:bg-blue-600 active:bg-blue-700
          disabled:bg-blue-400 disabled:cursor-not-allowed
          text-white font-semibold text-lg
          shadow-lg
          flex flex-col items-center justify-center gap-2
          transition-colors
        "
      >
        {loading ? (
          <>
            <Loader2 className="w-10 h-10 animate-spin" />
            <span>{t("listening")}</span>
          </>
        ) : (
          <>
            <Mic className="w-10 h-10" />
            <span>{t("listenButton")}</span>
          </>
        )}
      </button>
      <div className="text-sm text-muted-foreground mt-3">{childName}</div>
    </div>
  );
}