export const locales: string[] = process.env.LOCALES.split(',');

export const LOCALE_CATCH_ALL = 'LOCALE_CATCH_ALL';

export type Locale = typeof locales[number];
