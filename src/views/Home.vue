<template>
  <div class="view-home">
    <content-block id="home_reporte"></content-block>
    <content-block id="home_derechos"></content-block>
    <content-block id="home_fdi"></content-block>
    <section class="spaces-home-container">
      <content-block id="home_espacios"></content-block>
      <spaces-home></spaces-home>
    </section>
  </div>
</template>

<script>
import ContentBlock from '../components/ContentBlock.vue';
import SpacesHome from '../components/SpacesHome.vue';

export default {
  components: {
    ContentBlock,
    SpacesHome,
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.spaces-home-container {
  @media (min-width: $bp-medium) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  section {
    @media (min-width: $bp-medium) {
      flex: 1 1 100%;
      flex-basis: 50%;
    }
  }
}
</style>
