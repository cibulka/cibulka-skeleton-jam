import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Select from 'react-select';

import config from 'src/config';
import useTranslate from 'src/hooks/useTranslate';

const LocaleSwitch: FC<{
  className?: string;
}> = (props) => {
  const { locale, route, isReady, query, ...router } = useRouter();
  const translate = useTranslate();

  function getLocaleLabel(l: string): string {
    return translate(`common.locales.${l}`, 1, {}, undefined, l);
  }

  const otherLocales = config.LOCALES.filter((l) => l !== locale);

  const href = isReady ? { pathname: route, query } : undefined;

  return (
    <div className={props.className}>
      {href && otherLocales.length === 1 && (
        <Link href={href} locale={otherLocales[0]}>
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
          onChange={(l) => router.push(route, route, l)}
          value={locale}
        />
      )}
    </div>
  );
};

export default LocaleSwitch;
