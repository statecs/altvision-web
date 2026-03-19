import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: [
        'path',
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'subdomain'
      ],
      lookupFromPathIndex: 0,
      lookupLocalStorage: 'altvision_lng',
      lookupCookie: 'altvision_lng',
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
      cookieMinutes: 160,
      cookieDomain: 'altvision.se',
    },

    supportedLngs: ['ar','bn','cs','da','de','el','en','es','fi','fr','he','hi','hu','id','it','ja','ko','nl','no','pl','pt','ro','ru','sv','ta','th','tr','uk','ur','vi','zh'],
    nonExplicitSupportedLngs: true,

    react: {
      useSuspense: false,
    },
  });

export default i18n;
