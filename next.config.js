const LOCALES = ['en', 'cs'];
const LOCALE_CATCH_ALL = 'LOCALE_CATCH_ALL';

module.exports = {
  env: {
    LOCALES: LOCALES.join(','),
    LOCALE_CATCH_ALL,
  },
  i18n: {
    locales: LOCALES.concat(LOCALE_CATCH_ALL),
    defaultLocale: LOCALE_CATCH_ALL,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
      {
        source: `/${LOCALE_CATCH_ALL}`,
        destination: `/${LOCALES[0]}`,
        locale: false,
        permanent: false,
      },
      {
        source: `/${LOCALE_CATCH_ALL}/:slug*`,
        destination: `/${LOCALES[0]}/:slug*`,
        locale: false,
        permanent: false,
      },
    ];
  },
};
