import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Select from 'react-select';

import useTranslate from 'src/hooks/useTranslate';
import { locales, Locale } from 'src/types/config';

const LocaleSwitch: FC<{
  className?: string;
}> = (props) => {
  const { asPath, locale, route, isReady, query, ...router } = useRouter();
  const translate = useTranslate();

  function getLocaleLabel(l: string): string {
    return translate(`common.locales.${l}`, 1, {}, undefined, l);
  }

  const otherLocales = locales.filter((l) => l !== locale);

  return (
    <div className={props.className}>
      {otherLocales.length === 1 && (
        <Link href={route} as={asPath} locale={otherLocales[0]}>
          <a className={[props.className, 'underline'].filter(Boolean).join(' ')}>
            {getLocaleLabel(otherLocales[0])}
          </a>
        </Link>
      )}
      {/* TODO: Implement dropdown here */}
      {otherLocales.length > 1 && (
        <Select
          options={otherLocales.map((l) => ({
            value: l,
            label: getLocaleLabel(l),
          }))}
          onChange={(localeNew: Locale) => router.push(route, route, { locale: localeNew })}
          value={locale}
        />
      )}
    </div>
  );
};

export default LocaleSwitch;
