import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "@repo/ui/lang/en.json";
import translationTR from "@repo/ui/lang/tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    tr: {
      translation: translationTR,
    },
  },
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
