"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DICT, type Lang, type DictKey } from "./i18n";

const STORAGE_KEY = "irs_lang";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  // Загрузка из localStorage при первом монтировании
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ru" || saved === "en" || saved === "zh") {
        setLangState(saved);
    } else {
      // Автоопределение по языку браузера
      // Автоопределение по языку браузера
      // Автоопределение по языку браузера
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === "en") setLangState("en");
      else if (browserLang === "zh") setLangState("zh");
      else setLangState("ru");
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }

  function t(key: DictKey): string {
    return DICT[lang][key] || DICT.ru[key] || key;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Fallback для SSR — возвращаем русские дефолты
    return {
      lang: "ru" as Lang,
      setLang: () => {},
      t: (key: DictKey): string => DICT.ru[key] || key,
    };
  }
  return ctx;
}