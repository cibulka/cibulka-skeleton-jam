import React, { FC, useEffect, Fragment, StrictMode } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'react-jss';
import { AnimatePresence } from 'framer-motion';

import config from 'src/config';
import { wrapper } from 'src/store';
import Layout from 'src/components/app/Layout';

import tailwindConfig from '../../tailwind.config';

const WrappedApp: FC<AppProps> = (props) => {
  const { Component, pageProps, router } = props;

  // JSS
  const { SSR_STYLES_ID } = config;
  useEffect(() => {
    if (!document) return;
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector(`#${SSR_STYLES_ID}`);
    jssStyles?.parentNode?.removeChild(jssStyles);
  }, []);

  const Wrap = process.env.NODE_ENV === 'development' ? StrictMode : Fragment;

  const { theme } = tailwindConfig;

  return (
    <Wrap>
      <ThemeProvider theme={theme}>
        <Layout>
          {/* TODO: Animate exit of pages */}
          <AnimatePresence exitBeforeEnter>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </Wrap>
  );
};

export default wrapper.withRedux(WrappedApp);
