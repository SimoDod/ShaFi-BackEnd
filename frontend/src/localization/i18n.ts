import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./languages/en";
import { de } from "./languages/de";

void i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en,
    de,
  },
});

export default i18n;
