<template>
  <div class="view-reporte">
    <reporte></reporte>
  </div>
</template>

<script>
import config from '../config';
import Reporte from '../components/Reporte.vue';

export default {
  name: 'reporteView',
  components: {
    Reporte,
  },
  data() {
    return {
      pageTitle: 'Reportá',
    };
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      meta: [
        {property: 'og:title', content: `${this.pageTitle} - ${config.siteName}`},
        {property: 'og:url', content: `${config.baseUrl}${this.$router.currentRoute.path}`},
        {name: 'twitter:title', content: `${this.pageTitle} - ${config.siteName}`},
      ]
    }
  }
};
</script>
