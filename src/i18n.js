// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your translation files
import en from "./languages/en.json";
import ar from "./languages/ar.json";

export let selectedLanguage = "";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (callback) => {
    const savedDataJSON = localStorage.getItem("user-language");

    const lng = savedDataJSON ? savedDataJSON : null;
    selectedLanguage = lng || "en";
    callback(selectedLanguage);
  },
  init: () => {},
  cacheUserLanguage: async (lng) => {
    localStorage.setItem("user-language", lng);
  },
};

export const switchLanguage = () => {
  let current = localStorage.getItem("user-language");
  if (current == "ar") {
    localStorage.setItem("user-language", "en");
    selectedLanguage = "en";
  }

  if (current == "en") {
    localStorage.setItem("user-language", "ar");
    selectedLanguage = "ar";
  }
};

i18n
  .use(languageDetector) // Detect language
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
