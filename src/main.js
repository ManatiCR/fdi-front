import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import VueApollo from 'vue-apollo';
import VueAnalytics from 'vue-analytics';
import moment from 'moment';
import 'moment/locale/es';
import vueMoment from 'vue-moment';
import Meta from 'vue-meta';

import App from './App.vue';
import router from './router';
import store from './store';
import config from './config';
import './registerServiceWorker';


/* eslint no-restricted-globals: 0 */
const { redirect } = sessionStorage;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, null, redirect);
}

Vue.config.productionTip = false;

const link = new BatchHttpLink({
  uri: config.apiUrl,
});

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage,
});

// Create the apollo client.
const apolloClient = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

// Install the vue plugin.
Vue.use(VueApollo);

Vue.use(vueMoment, {
  moment,
});

// Create the apollo provider.
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

// Google Analytics configuration.
if (config.ga) {
  Vue.use(VueAnalytics, {
    id: config.ga,
    router,
  });
}

// vue-meta.
Vue.use(Meta);

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
