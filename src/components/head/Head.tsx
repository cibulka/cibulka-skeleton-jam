import React, { FC } from 'react';
import NextHead from 'next/head';

import useTranslate from 'src/hooks/useTranslate';
import { Translate } from 'src/types/translate';

const Head: FC<{ pageTitle?: string; translate?: Translate }> = (props) => {
  const defaultTranslate = useTranslate();
  const translate = props.translate || defaultTranslate;

  const siteTitle = translate('common.siteTitle');
  const pageTitle = props.pageTitle || translate('pageTitle', 1, {}, '');
  const description = translate('pageDescription', 1, {}, '');

  return (
    <NextHead>
      <title>{[pageTitle, siteTitle].filter(Boolean).join(' | ')}</title>
      {description && <meta name="description" content={description} />}
    </NextHead>
  );
};

export default Head;
