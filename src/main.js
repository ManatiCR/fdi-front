import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';
import './registerServiceWorker';

Vue.config.productionTip = false;

const batchHttpLink = new BatchHttpLink({
  uri: config.apiUrl,
});

// Create the apollo client.
const apolloClient = new ApolloClient({
  link: batchHttpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Install the vue plugin.
Vue.use(VueApollo);

// Create the apollo provider.
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
