import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { Locales, LOCALE_DEFAULT, LOCALE_SUPPORTED } from '@/constants/locale';
import { IsString } from '@/types/guards';
import { CacheManager } from '@/modules';

import ruTranslation from './ru.json';
import enTranslation from './en.json';

export function IsLocale(payload?: unknown): payload is Locales {
  return !!payload && IsString(payload) && LOCALE_SUPPORTED.includes(payload as Locales);
}
const cacheLang = CacheManager.get('locale');

if (IsLocale(cacheLang)) {
  document.documentElement.setAttribute('lang', cacheLang);
}

i18n.use(initReactI18next).init({
  lng: IsLocale(cacheLang) ? cacheLang : LOCALE_DEFAULT,
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
