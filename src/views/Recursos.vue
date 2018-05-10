  <template>
  <div class="view-recursos">
    <content-block id="recursos"></content-block>
    <section class="resources-model-wrapper">
      <h3 class="resources__model-title">Machotes</h3>
      <router-link class="resources-model__see-all" :to="{ name: 'recursos machotes'}">
        Ver todos
      </router-link>
      <model :limit="2"></model>
    </section>
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
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components: {
    Resources,
    Model,
    Directory,
    ContentBlock,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.resources-model-wrapper {
  padding: 20px;
  max-width: 1300px;
  margin: 0 auto;
}

.resources__model-title {
  display: inline;
}

.resources-model__see-all {
  float: right;
}

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

.content-block__recursos {
  margin-bottom: 80px;
}
</style>
