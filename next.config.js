module.exports = {
  i18n: {
    locales: ['en', 'cs', 'LOCALE_CATCH_ALL'],
    defaultLocale: 'LOCALE_CATCH_ALL',
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
      {
        source: '/LOCALE_CATCH_ALL',
        destination: '/en',
        locale: false,
        permanent: false,
      },
      {
        source: '/LOCALE_CATCH_ALL/:slug*',
        destination: '/en/:slug*',
        locale: false,
        permanent: false,
      },
    ];
  },
};
