import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import LocaleSwitch from 'src/components/locale-switch/LocaleSwitch';

const Nav: FC = () => {
  const router = useRouter();
  return (
    <footer className="fixed t-0 l-0 w-full pl-4 pr-4 pt-4">
      <div className=" flex items-center">
        <h1 className="flex flex-1 font-bold">Cibulka/Skeleton</h1>
        <ul className="flex ml-8 mr-8">
          <li className="mr-4">
            {router.route === '/' ? (
              <strong>Home</strong>
            ) : (
              <Link href="/">
                <a className="underline">Home</a>
              </Link>
            )}
          </li>
          <li className="mr-4">
            {router.route === '/redux' ? (
              <strong>Redux</strong>
            ) : (
              <Link href="/redux">
                <a className="underline">Redux</a>
              </Link>
            )}
          </li>
          <li>
            {router.route === '/blog' ? (
              <strong>Blog</strong>
            ) : (
              <Link href="/blog">
                <a className="underline">Blog</a>
              </Link>
            )}
          </li>
        </ul>
        <LocaleSwitch />
      </div>
    </footer>
  );
};

export default Nav;
