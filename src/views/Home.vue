<template>
  <div class="view-home">
    <content-block id="home_reporte"></content-block>
    <content-block id="home_derechos"></content-block>
    <content-block id="home_fdi"></content-block>
    <content-block id="home_espacios"></content-block>
  </div>
</template>

<script>
import ContentBlock from '../components/ContentBlock.vue';
export default {
  components: {
    ContentBlock,
  }
};
</script>
