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

import config from 'src/config';

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

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* eslint-disable-next-line react/no-danger */}
          <style id={SSR_STYLES_ID} dangerouslySetInnerHTML={{ __html: registry.toString() }} />
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
