  <template>
  <div class="view-recursos">
    <content-block id="recursos"></content-block>
    <section class="resources-model-wrapper">
      <div class="resources__model-title-container">
        <h3 class="resources__model-title">Recursos de denuncia</h3>
        <router-link class="resources-model__see-all" :to="{ name: 'recursos machotes'}">
          Ver todos
        </router-link>
      </div>
      <model :limit="2"></model>
    </section>
    <section class="resources-directory-wrapper">
      <content-block id="recursos_juridicos"></content-block>
      <directory></directory>
    </section>
  </div>
</template>

<script>
import config from '../config';
import Directory from '../components/Directory.vue';
import Model from '../components/Model.vue';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components: {
    Model,
    Directory,
    ContentBlock,
  },
  data() {
    return {
      pageTitle: 'Recursos',
    };
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      meta: [
        { property: 'og:title', content: `${this.pageTitle} - ${config.siteName}` },
        { property: 'og:url', content: `${config.baseUrl}${this.$router.currentRoute.path}` },
        { name: 'twitter:title', content: `${this.pageTitle} - ${config.siteName}` },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.resources-model-wrapper {
  max-width: 1300px;
  margin: 0 auto;
}

.resources__model-title-container {
  padding: 20px 20px 10px 20px
}

.resources__model-title {
  display: inline;
  font-size: 1.8rem;
  @media (min-width: 360px) {
    font-size: 2rem;
  }
}

.resources-model__see-all {
  float: right;
  font-size: 1.3rem;
  @media (min-width: 360px) {
    font-size: 1.4rem;
  }
}

.resources-directory-wrapper {
  background-color: #eef5fb;
  padding: 20px;
  @media (min-width: 768px) {
    display: flex;
    padding: 40px;
    justify-content: center;
  }
  .content-block__recursos-juridicos {
    @media (min-width: 768px) {
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
  margin-bottom: 20px;
  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
}
</style>
