const config = {
  development: {
    apiUrl: 'http://fdi.docker/graphql',
  },
  production: {
    apiUrl: 'http://live-fdi.pantheonsite.io/graphql',
  },
};

export default config[process.env.NODE_ENV];
