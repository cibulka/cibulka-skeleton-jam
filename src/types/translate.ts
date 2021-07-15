// Localization function
// ---------------------------------------------------------------------------------------------

export type Replacements = Record<string, string>;

export type Translate = (
  key: string,
  count?: number,
  replacements?: Replacements,
  fallback?: string,
  locale?: string,
  warnAboutExtraReplacements?: boolean,
) => string;

// Localization object
// ---------------------------------------------------------------------------------------------

export type LocalizationValuePlural = {
  zero: string;
  one: string;
  few: string;
  many: string;
};

export type LocalizationValue =
  | string
  | LocalizationValuePlural
  | { [key: string]: LocalizationValue };

export interface Localization {
  [locale: string]: Record<string, LocalizationValue>;
}
