export enum Locales {
  ru = 'ru',
  en = 'en',
}

export const LOCALE_DEFAULT: Locales = Locales.ru;
export const LOCALE_SUPPORTED: Locales[] = Object.values(Locales);
