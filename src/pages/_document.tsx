import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';
import CleanCSS from 'clean-css';

import config from 'src/config';

const cleanCSS = new CleanCSS();

class MyDocument extends Document<{
  pageProps: unknown;
}> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const { SSR_STYLES_ID } = config;

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <JssProvider registry={registry} generateId={generateId}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <App {...props} />
            </JssProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    let css: string = registry.toString();
    if (css) css = cleanCSS.minify(css).styles;

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* eslint-disable-next-line react/no-danger */}
          <style id={SSR_STYLES_ID} dangerouslySetInnerHTML={{ __html: css }} />
        </>
      ),
    };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
