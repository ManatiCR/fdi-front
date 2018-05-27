const config = {
  development: {
    apiUrl: 'http://test-fdi.pantheonsite.io/graphql',
    ga: '',
  },
  production: {
    apiUrl: 'https://live-fdi.pantheonsite.io/graphql',
    ga: 'UA-119942269-1',

  },
};

export default config[process.env.NODE_ENV];
