  <template>
  <div class="view-recursos">
    <model :limit="2"></model>
    <section class="resources-directory-wrapper">
      <resources></resources>
      <directory></directory>
    </section>
  </div>
</template>

<script>
import Directory from '../components/Directory.vue';
import Model from '../components/Model.vue';
import Resources from '../components/Resources.vue';
export default {
  components: {
    Resources,
    Model,
    Directory,
  }
};
</script>


<style lang="scss">
@import "../assets/scss/variables";
.resources-directory-wrapper {
  background-color: #eef5fb;
  padding: 20px;
  @media (min-width: 768px) {
    display: flex;
    padding: 40px;
    justify-content: center;
  }

  .resources {
    margin-bottom: 20px;
    @media (min-width: 768px) {
      margin-bottom: 0;
      flex: 2;
    }
  }

  .directory {
    width: 100%;
    @media (min-width: 768px) {
      flex: 1;
      margin-left: 20px;
    }
  }
}
</style>
