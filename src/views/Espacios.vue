<template>
  <section class="spaces">
    <content-block id="espacios"></content-block>
    <div class="spaces-wrapper">
      <ul class="spaces__list">
        <li class="spaces__item" v-for="space in spaces" :key="space.entityLabel">
          <a
            v-if="space.fieldEnlace"
            class="spaces__link"
            target="_blank"
            :href='space.fieldEnlace.url.path'>
            <img
              v-if="space.fieldImagen"
              :width="(space.fieldImagen.derivative.width/2)"
              :height="(space.fieldImagen.derivative.height/2)"
              class="spaces__img"
              :src="space.fieldImagen.derivative.url"
              :alt="space.entityLabel"
            >
          </a>
          <img
            v-else
            :width="(space.fieldImagen.derivative.width/2)"
            :height="(space.fieldImagen.derivative.height/2)"
            class="spaces__img"
            :src="space.fieldImagen.derivative.url"
            :alt="space.entityLabel"
          >
        </li>
      </ul>
      <button
        v-if="!suggestSpace"
        class="btn spaces__btn btn--fill-highlight2"
        type="button"
        @click="showMore"
        name="button">
        Ver más
      </button>
      <router-link
        v-if="suggestSpace"
        class="btn spaces__btn btn--fill-highlight2"
        :to="{ name: 'contacto', query: {reason: 'recomendar_espacio' }}">
        Recomendar Espacio
      </router-link>
      <div
        @click="closeOverlay"
        v-if="noMoreMessage || suggestSpaceMessage"
        class="spaces__no-more-message-overlay">
      </div>
      <div v-if="noMoreMessage" class="spaces__no-more-message">
        <p>
          Se ha producido un error y no pudieron ser cargados más espacios.
          Por favor intentá de nuevo.
        </p>
        <button
          @click="noMoreMessage = !noMoreMessage"
          class="btn--small btn btn--fill-highlight3 btn--arrow spaces__btn-error"
          type="submit">
          Aceptar
      </button>
      </div>
      <div v-if="suggestSpaceMessage" class="spaces__suggest-space-message">
        <p>No contamos con más espacios libres de discriminación. ¿Conocés alguno?
        <router-link
          v-if="suggestSpace"
          class="suggest-space-btn"
          :to="{ name: 'contacto', query: {reason: 'recomendar_espacio' }}">
          Recomendá uno
        </router-link></p>
        <button
          @click="suggestSpaceMessage = !suggestSpaceMessage"
          class="btn--small btn btn--fill-highlight3 btn--arrow spaces__btn-error"
          type="submit">
          Cerrar
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import config from '../config';
import ContentBlock from '../components/ContentBlock.vue';

const query = gql`query getSpaces($limit: Int!) {
  nodeQuery(limit: $limit,
    sort: [
      {
        field: "created",
        direction: DESC
      }
    ],
    filter: {
      conditions: [
        {
          operator: EQUAL,
          field: "type",
          value: ["espacio_libre_de_discriminacion"]
        }
      ]
    }) {
      entities {
        entityLabel
        ... on NodeEspacioLibreDeDiscriminacion {
          fieldImagen {
            derivative (style: logo_espacios) {
              url
              width
              height
            }
          }
          fieldEnlace {
            url {
              path
              alias
            }
          }
        }
      }
    }
  }`;

export default {
  components: {
    ContentBlock,
  },
  name: 'Spaces',
  apollo: {
    nodeQuery() {
      return {
        query,
        variables: {
          limit: this.limit,
        },
        update(data) {
          if (Object.prototype.hasOwnProperty.call(data, 'nodeQuery') &&
          Object.prototype.hasOwnProperty.call(data.nodeQuery, 'entities') &&
          data.nodeQuery.entities instanceof Array &&
          data.nodeQuery.entities.length > 1) {
            this.spaces = data.nodeQuery.entities;
          }
        },
        error(error) {
          // This is a hack. We need to use cached data if network is unavailable.
          if (error.networkError) {
            this.$apollo.skipAllQueries = true;
            setTimeout(() => {
              this.$apollo.skipAllQueries = false;
            }, 1000);
          }
        },
      };
    },
  },
  methods: {
    showMore() {
      this.limit += 5;
      this.$apollo.queries.nodeQuery.fetchMore({
        variables: {
          limit: this.limit,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.nodeQuery.entities.length ===
            previousResult.nodeQuery.entities.length) {
            this.suggestSpaceMessage = true;
            this.suggestSpace = true;
          }
          return {
            nodeQuery: {
              /* eslint no-underscore-dangle: ["error", { "allow": ["__typename"] }] */
              __typename: previousResult.nodeQuery.__typename,
              entities: fetchMoreResult.nodeQuery.entities,
            },
          };
        },
      }).catch((error) => {
        this.noMoreMessage = true;
        console.error(error);
      });
    },
    closeOverlay() {
      if (this.noMoreMessage) {
        this.noMoreMessage = false;
      } else if (this.suggestSpaceMessage) {
        this.suggestSpaceMessage = false;
      }
    },
  },
  data() {
    return {
      nodeQuery: {},
      spaces: {},
      limit: 20,
      noMoreMessage: false,
      pageTitle: 'Espacios libres de discriminación',
      suggestSpaceMessage: false,
      suggestSpace: false,
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
.content-block__espacios {
  margin-bottom: 80px;
}

.spaces-wrapper {
  max-width: 1400px;
  position: relative;
  margin: auto;
  padding: 20px;
  padding-bottom: 120px;
}

.spaces__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0 auto;
  border-bottom: solid 1px #e0e0e0;
  padding-bottom: 40px;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}

.spaces__item {
  width: 50%;
  padding: 7px 10px;
  list-style: none;
  @media (min-width: 480px) {
    padding: 15px 20px;
    width: 33%;
  }
  @media (min-width: $bp-medium) {
    width: 25%;
  }
  @media (min-width: 1100px) {
    width: 20%;
  }
}

.spaces__link {
  display: block;
  text-align: center;
}

.spaces__img {
  width: 100%;
  height: auto;
}

.spaces__no-more-message-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1;
  cursor: pointer;
}

.spaces__no-more-message,
.spaces__suggest-space-message {
  background: #fff;
  z-index: 2;
  max-width: 400px;
  width: 90%;
  border: solid 1px #e0e0e0;
  padding: 20px;
  margin: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
}

.spaces__suggest-space-message p {
  background: url(.././assets/images/lightbulb.png) no-repeat;
}

.spaces__no-more-message p {
  background: url(.././assets/images/warning.png) no-repeat;
}

.spaces__no-more-message,
.spaces__suggest-space-message {
  p {
    background-size: 33px;
    background-position: left center;
    padding-left: 53px;
  }
}

.spaces__btn-error {
  float: right;
}

.suggest-space-btn {
  display: inline-block;
}

.spaces__btn {
  float: right;
  margin: 40px 0;
}

</style>
