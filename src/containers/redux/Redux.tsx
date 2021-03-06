import React, { FC } from 'react';

import Head from 'src/components/head/Head';
import useTranslate from 'src/hooks/useTranslate';

import ReduxTest from './components/ReduxTest';
import ReduxPersisted from './components/ReduxPersisted';
import DataClient from './components/DataClient';

import localization from './Redux.localization';

const ReduxContainer: FC = () => {
  const translate = useTranslate(localization);
  return (
    <>
      <Head translate={translate} />
      <section className="flex flex-col flex-1 items-center justify-center">
        <div className="max-w-lg">
          <h1 className="text-2xl">{translate('pageTitle')}</h1>
          <p className="text-xl mt-4 mb-4">{translate('pageDescription')}</p>
          <ul>
            <li className="py-4 border-t border-gray-300">
              <ReduxTest translate={translate} />
            </li>
            <li className="py-4 border-t border-gray-300">
              <ReduxPersisted translate={translate} />
            </li>
            <li className="py-4 border-t border-gray-300">
              <DataClient translate={translate} />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default ReduxContainer;
