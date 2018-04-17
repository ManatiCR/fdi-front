<template>
  <div class="view-recursos">
    <model :limit="2"></model>
    <resources></resources>
  </div>
</template>

<script>
import Model from '../components/Model.vue';
import Resources from '../components/Resources.vue';
export default {
  components: {
    Resources,
    Model,
  }
};
</script>
