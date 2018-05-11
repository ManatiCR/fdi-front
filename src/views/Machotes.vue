<template>
  <div class="view-machotes">
    <model :limit="999"></model>
  </div>
</template>

<script>
import Model from '../components/Model.vue';

export default {
  components: {
    Model,
  },
};
</script>

<style lang="scss">
.view-machotes {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
}
</style>
