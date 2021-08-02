import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import LocaleSwitch from 'src/components/locale-switch/LocaleSwitch';
import useTranslate from 'src/hooks/useTranslate';

import localization from './Nav.localization';

const Nav: FC = () => {
  const router = useRouter();
  const translate = useTranslate(localization);

  const routes = Object.keys(Object.values(localization)[0].items);

  return (
    <footer className="fixed t-0 l-0 w-full pl-4 pr-4 pt-4">
      <div className=" flex items-center">
        <h1 className="flex flex-1 font-bold">
          <Link href="/">
            <a>{translate('common.siteTitle')}</a>
          </Link>
        </h1>
        <ul className="flex ml-8 mr-8">
          {routes.map((route, i) => {
            const isActive = router.route === `/${route}`;
            const isLast = i === routes.length - 1;
            const title = translate(`items.${route}`);
            return (
              <li key={route} className={!isLast ? 'mr-4' : undefined}>
                {isActive ? (
                  <strong>{title}</strong>
                ) : (
                  <Link href={`/${route}`}>
                    <a className="underline">{title}</a>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <LocaleSwitch />
      </div>
    </footer>
  );
};

export default Nav;
