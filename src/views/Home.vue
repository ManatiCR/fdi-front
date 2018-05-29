<template>
  <div class="view-home">
    <content-block id="home_reporte"></content-block>
    <content-block id="home_derechos" imagestyle="full"></content-block>
    <content-block id="home_fdi" imagestyle="mid" ></content-block>
    <section class="spaces-home-container">
      <content-block id="home_espacios"></content-block>
      <spaces-home></spaces-home>
    </section>
  </div>
</template>

<script>
import config from '../config';
import ContentBlock from '../components/ContentBlock.vue';
import SpacesHome from '../components/SpacesHome.vue';

export default {
  components: {
    ContentBlock,
    SpacesHome,
  },
  metaInfo() {
    return {
      meta: [
        { property: 'og:title', content: `${config.siteName}` },
        { property: 'og:url', content: `${config.baseUrl}${this.$router.currentRoute.path}` },
        { name: 'twitter:title', content: `${config.siteName}` },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.spaces-home-container {
  max-width: 1400px;
  margin:  0 auto;
  @media (min-width: $bp-medium) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 80px;
  }
  section {
    @media (min-width: $bp-medium) {
      flex: 1 1 100%;
      flex-basis: 50%;
    }
  }
  .content-block__home-espacios {
    margin-bottom: 80px;
    @media (min-width: $bp-medium) {
      margin-bottom: 0;
    }
  }
}
</style>
