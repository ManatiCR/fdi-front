<template>
  <div class="view-derechos">
    <content-block id="derechos_header" imagestyle="full"></content-block>
    <h1 class="view-derechos__title">Derechos humanos fundamentales</h1>
    <human-rights></human-rights>
    <content-block id="derechos_footer"></content-block>
  </div>
</template>

<script>
import config from '../config';
import HumanRights from '../components/HumanRights.vue';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components: {
    HumanRights,
    ContentBlock,
  },
  data() {
    return {
      pageTitle: 'Derechos humanos fundamentales',
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
@import "../assets/scss/variables";

.content-block__derechos-header {
  margin-bottom: 80px;
}

.view-derechos__title {
  margin: 0 5% 80px 5%;
  border-right: solid 5px $highlight2;
  padding-right: 50px;
  display: inline-block;
}

.human-rights {
  margin-bottom: 40px;
}
</style>
