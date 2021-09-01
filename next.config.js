const LOCALES = ['en', 'cs'];
const LOCALE_CATCH_ALL = 'LOCALE_CATCH_ALL';

module.exports = {
  env: {
    LOCALES: LOCALES.join(','),
    LOCALE_CATCH_ALL,
  },
  i18n: {
    locales: LOCALES.concat(LOCALE_CATCH_ALL),
    locales: LOCALES,
    defaultLocale: 'cs',
    // defaultLocale: LOCALE_CATCH_ALL,
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return JSON.parse(
      JSON.stringify([
        {
          source: `/${LOCALE_CATCH_ALL}`,
          destination: '/en',
          locale: false,
          permanent: false,
        },
        {
          source: `/${LOCALE_CATCH_ALL}/(!api/):slug*`,
          destination: '/en/:slug*',
          locale: false,
          permanent: false,
        },
      ]),
    );
  },
};
