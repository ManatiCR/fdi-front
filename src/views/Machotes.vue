<template>
  <div class="view-machotes">
    <content-block id="recursos"></content-block>

    <model :limit="999"></model>
  </div>
</template>

<script>
import Model from '../components/Model.vue';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components: {
    Model,
    ContentBlock,
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
