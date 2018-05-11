const config = {
  development: {
    apiUrl: 'http://test-fdi.pantheonsite.io/graphql',
  },
  production: {
    apiUrl: 'https://live-fdi.pantheonsite.io/graphql',
  },
};

export default config[process.env.NODE_ENV];
