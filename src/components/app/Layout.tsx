import React, { FC, ReactChild } from 'react';
import Head from 'next/head';

import useGlobalStyles from 'src/hooks/useGlobalStyles';
import useLocalStorage from 'src/hooks/useLocalStorage';

import Nav from './Nav';

import 'tailwindcss/tailwind.css';

const Layout: FC<{
  children: ReactChild;
}> = (props) => {
  // Load data from localStorage to redux
  useLocalStorage();

  // Reset & custom global styles
  useGlobalStyles();

  console.log('wtf botanique');

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {props.children}
      <Nav />
    </>
  );
};

export default Layout;
