<template>
  <section class="spaces-home">
    <ul class="spaces-home__list">
      <li class="spaces-home__item" v-for="(entity, index) in nodeQuery.entities">
        <a class="spaces-home__link" :href='nodeQuery.entities[index].fieldEnlace.url.path'>
          <img class="spaces-home__img" :src="nodeQuery.entities[index].fieldImagen.derivative.url" alt="">
        </a>
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
        ... on NodeEspacioLibreDeDiscriminacion {
          fieldImagen {
            derivative (style: medium) {
              url
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
