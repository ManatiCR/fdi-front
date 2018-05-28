<template>
  <div class="view-machotes">
    <content-block id="recursos"></content-block>

    <model :limit="999"></model>
  </div>
</template>

<script>
import config from '../config';
import Model from '../components/Model.vue';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components: {
    Model,
    ContentBlock,
  },
  data() {
    return {
      pageTitle: 'Recursos de denuncia',
    };
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      meta: [
        { property: 'og:title', content: `${this.pageTitle} - ${config.siteName}` },
        { property: 'og:url', content: `${config.baseUrl}${this.$router.currentRoute.path}` },
        { name: 'twitter:title', content: `${this.pageTitle} - ${config.siteName}` },
      ],
    };
  },
};
</script>

<style lang="scss">
.model {
  margin: 0 auto;
  max-width: 1300px;
  padding: 20px;
}
</style>
