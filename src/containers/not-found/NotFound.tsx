import React, { FC } from 'react';

import Head from 'src/components/head/Head';
import useTranslate from 'src/hooks/useTranslate';

import localization from './NotFound.localization';

const NotFound: FC = () => {
  const translate = useTranslate(localization);

  return (
    <>
      <Head translate={translate} />
      <div className="flex flex-col flex-1 items-center justify-center">
        {translate('pageTitle')}
      </div>
    </>
  );
};

export default NotFound;
