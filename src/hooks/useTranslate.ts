import { useRouter } from 'next/router';

import { Localization, LocalizationValue, Translate } from 'src/types/translate';
import commonLocalization from 'src/localization';
import { isLocalizationValuePlural } from 'src/helpers/typeGuards';
import { locales } from 'src/types/config';

function pluralizeValue(value: LocalizationValue | string, count: number): string | undefined {
  if (isLocalizationValuePlural(value)) {
    if (count === 0) return value.zero;
    if (count === 1) return value.one;
    if (count > 1 && count < 5) return value.few;
    return value.many;
  }

  return typeof value === 'string' ? value : undefined;
}

function localize(key: string, localization: Localization) {
  let r: LocalizationValue | string;

  key.split('.').forEach((subKey) => {
    if (!r) {
      r = localization[subKey];
    } else {
      r = r[subKey];
    }
  });

  return r;
}

function getStringWithReplacements(
  value: string,
  replacements: Record<string, string>,
  warnAboutExtraReplacements: boolean,
): string {
  let result = value;
  Object.keys(replacements).forEach((replacementKey) => {
    const usedReplacementKey = `%{${replacementKey}}`;
    if (result.search(usedReplacementKey) === -1) {
      if (warnAboutExtraReplacements) {
        // eslint-disable-next-line no-console
        console.warn(`getStringWithReplacements: ${value} does not have key ${usedReplacementKey}`);
      }
    } else {
      result = result.replace(usedReplacementKey, replacements[replacementKey].toString());
    }
  });
  return result;
}

const emptyLocalization = locales.reduce((acc, curr) => {
  acc[curr] = {};
  return acc;
}, {});

export default function useLocalization(
  componentLocalization: Localization = emptyLocalization,
): Translate {
  const { locale } = useRouter();

  return (
    id: string,
    count = 1,
    replacements = {},
    fallback = undefined,
    localeForced = undefined,
    warnAboutExtraReplacements = false,
  ) => {
    const usedFallback = typeof fallback === 'string' ? fallback : id;
    const usedLocale = localeForced || locale;
    const usedLocalization = {
      _common: commonLocalization[usedLocale],
      ...componentLocalization[usedLocale],
    };

    let result = localize(id, usedLocalization);
    if (!result && id.split('.')[0] === 'common')
      result = localize(id.replace(/^(common)/, '_common'), usedLocalization);

    if (!result) {
      // Allow to return empty string without console.log
      if (fallback === '') return '';
      // eslint-disable-next-line no-console
      if (locale !== 'catchAll') console.warn(`Translate: ${id} empty for ${usedLocale}.`);
      return fallback || id;
    }

    const isValidValue = typeof result === 'string' || isLocalizationValuePlural(result);
    if (!isValidValue) {
      // eslint-disable-next-line no-console
      console.warn(`Translate: ${id} is not a string, nor pluralizable value.`, result);
      return usedFallback;
    }

    result = pluralizeValue(result, count);
    result = getStringWithReplacements(
      result,
      { ...replacements, count: count.toString() },
      warnAboutExtraReplacements,
    );

    return result || usedFallback;
  };
}
