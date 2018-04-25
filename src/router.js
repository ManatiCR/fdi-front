import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Reporte from './views/Reporte.vue';
import Derechos from './views/Derechos.vue';
import Directorio from './views/Directorio.vue';
import Recursos from './views/Recursos.vue';
import RecursosJuridicos from './views/RecursosJuridicos.vue';
import Contacto from './views/Contacto.vue';
import StyleGuide from './views/StyleGuide.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/reporte',
      name: 'reporte',
      component: Reporte,
    },
    {
      path: '/derechos',
      name: 'derechos',
      component: Derechos,
    },
    {
      path: '/recursos/directorio',
      name: 'recursos directorio',
      component: Directorio,
    },
    {
      path: '/recursos',
      name: 'recursos',
      component: Recursos,
    },
    {
      path: '/recursos/juridicos',
      name: 'recursos jurídicos',
      component: RecursosJuridicos,
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto,
    },
    {
      path: '/styleguide',
      name: 'styleguide',
      component: StyleGuide,
    }
  ],
});
