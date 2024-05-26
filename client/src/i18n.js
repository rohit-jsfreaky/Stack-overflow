// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from "../public/locales/en/translation.json"; // English translations
import frTranslation from '../public/locales/fr/translation.json';
import esTranslation from '../public/locales/es/translation.json';
import hiTranslation from '../public/locales/hi/translation.json';
import ptTranslation from '../public/locales/pt/translation.json';
import zhTranslation from '../public/locales/zh/translation.json';

// Translation resources
const resources = {
  en: {
    translation: enTranslation,
   },
  es: {
    translation: esTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
  fr: {
    translation: frTranslation,
  }
};

const savedLanguage = localStorage.getItem('language') || 'en'; // Load saved language or default to English

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // set the initial language
  interpolation: {
    escapeValue: false // React already escapes values
  }
});

export default i18n;
