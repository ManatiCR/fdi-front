<template>
  <div class="view-recursos">
    <directory></directory>
    <resources></resources>
  </div>
</template>

<script>
import Directory from '../components/Directory.vue';
import Resources from '../components/Resources.vue';
export default {
  components: {
    Resources,
    Directory,
  }
};
</script>
