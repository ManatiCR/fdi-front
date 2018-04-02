<template>
  <div class="view-home">
    <content-block id="home_reporte"></content-block>
    <content-block id="home_derechos"></content-block>
    <content-block id="home_fdi"></content-block>
    <section class="home_section--espacios">
      <content-block id="home_espacios"></content-block>
      <discrimination-free-spaces></discrimination-free-spaces>
    </section>
  </div>
</template>

<script>
import ContentBlock from '../components/ContentBlock.vue';
import DiscriminationFreeSpaces from '../components/DiscriminationFreeSpaces.vue';

export default {
  components: {
    ContentBlock,
    DiscriminationFreeSpaces,
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

  .home_section--espacios {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    section {
      flex: 1 1 100%;
      @media (min-width: $bp-medium) {
        flex-basis: 50%;
      }
    }
  }
</style>
