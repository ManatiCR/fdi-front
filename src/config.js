const config = {
  development: {
    siteName: 'FDI Vigilancia Ciudadana',
    baseUrl: 'http://localhost:8080',
    apiUrl: 'http://test-fdi.pantheonsite.io/graphql',
    ga: '',
    ogImage: '/img/social.png',
  },
  production: {
    siteName: 'FDI Vigilancia Ciudadana',
    baseUrl: 'http://app.fdi.cr',
    apiUrl: 'https://live-fdi.pantheonsite.io/graphql',
    ga: 'UA-119942269-1',
    ogImage: '/img/social.png',
  },
};

export default config[process.env.NODE_ENV];
