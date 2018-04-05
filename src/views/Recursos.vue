<template>
  <div class="view-recursos">
    <model :limit="2"></model>
  </div>
</template>

<script>
import Model from '../components/Model.vue';
export default {
  components: {
    Model,
  }
};
</script>
