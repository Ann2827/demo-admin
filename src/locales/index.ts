import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { Locales, LOCALE_DEFAULT, LOCALE_SUPPORTED } from '@/constants/locale';

import ruTranslation from './ru.json';
import enTranslation from './ru.json';

i18n.use(initReactI18next).init({
  fallbackLng: LOCALE_DEFAULT,
  load: 'currentOnly',
  supportedLngs: LOCALE_SUPPORTED,
  nonExplicitSupportedLngs: true,
  resources: {
    [Locales.ru]: {
      translation: ruTranslation,
    },
    [Locales.en]: {
      translation: enTranslation,
    },
  },
  debug: false,
  interpolation: {
    escapeValue: false,
    defaultVariables: {
      name: 'Product Name',
    },
  },
  react: {
    useSuspense: true,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  },
});

export { default } from 'i18next';
