module.exports = {
  i18n: {
    locales: ['en', 'cs', 'catchAll'],
    defaultLocale: 'catchAll',
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    return [
      {
        source: '/catchAll',
        destination: '/en',
        locale: false,
        permanent: false,
      },
      {
        source: '/catchAll/:slug*',
        destination: '/en/:slug*',
        locale: false,
        permanent: false,
      },
    ];
  },
};
