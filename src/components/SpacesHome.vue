<template>
  <section class="spaces-home">
    <ul class="spaces-home__list">
      <li class="spaces-home__item" v-for="(entity, index) in nodeQuery.entities">
        <a v-if="entity.fieldEnlace" class="spaces-home__link" :href='entity.fieldEnlace.url.path'>
          <img v-if="entity.fieldImagen" :width="(entity.fieldImagen.derivative.width/2)" :height="(entity.fieldImagen.derivative.height/2)" class="spaces-home__img" :src="entity.fieldImagen.derivative.url" :alt="entity.entityLabel">
        </a>
        <img v-else :width="(entity.fieldImagen.derivative.width/2)" :height="(entity.fieldImagen.derivative.height/2)" class="spaces-home__img" :src="entity.fieldImagen.derivative.url" :alt="entity.entityLabel">
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql `query {
  nodeQuery(limit: 6,
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
  name: 'SpacesHome',
  apollo: {
    nodeQuery() {
      return {
        query: query,
      }
    }
  },
  data() {
    return {
      nodeQuery: {},
    }
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.spaces-home__list {
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding: 0;
  margin: 0 auto;
}

.spaces-home__item {
  width: 45%;
  padding: 5px;
  list-style: none;
  margin-bottom: 20px;
  @media (min-width: 480px) {
    width: 32%;
  }
  @media (min-width: $bp-medium) {
    margin-bottom: 0;
  }
}

.spaces-home__link {
  display: block;
  text-align: center;
}

.spaces-home__img {
  max-width: 100%;
  height: auto;
}
</style>
