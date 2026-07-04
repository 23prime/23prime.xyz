import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import ja from "./locales/ja/translation.json";

export const LANGUAGE_STORAGE_KEY = "23prime-language";

export const LANGUAGES = {
  EN: "en",
  JA: "ja",
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [LANGUAGES.EN]: { translation: en },
      [LANGUAGES.JA]: { translation: ja },
    },
    fallbackLng: LANGUAGES.EN,
    supportedLngs: Object.values(LANGUAGES),
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
