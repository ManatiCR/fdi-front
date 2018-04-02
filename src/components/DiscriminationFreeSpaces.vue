<template>
  <section>
    <ul class="discrimination-free-spaces__list">
      <li class="discrimination-free-spaces__item" v-for="(entity, index) in nodeQuery.entities">
        <a class="discrimination-free-spaces__link" :href='nodeQuery.entities[index].fieldEnlace.url.path'>
          <img class="discrimination-free-spaces__img" :src="nodeQuery.entities[index].fieldImagen.derivative.url" alt="">
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query {
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
          operator: EQUAL, field: "type",
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
  name: 'DiscriminationFreeSpaces',
  apollo: {
    nodeQuery() {
      return {
        query: query,
        update(data) {
          if (data.hasOwnProperty('nodeQuery') &&
            data.nodeQuery.hasOwnProperty('entities') &&
            data.nodeQuery.entities instanceof Array &&
            data.nodeQuery.entities.length) {
            const entities = data.nodeQuery.entities;
            return {
              entities: entities,
            }
          }
        }
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

.discrimination-free-spaces__list {
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding: 0;
  margin: 0 auto;
}

.discrimination-free-spaces__item {
  width: 45%;
  padding: 5px;
  list-style: none;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    width: 32%;
  }
  @media (min-width: $bp-medium) {
    margin-bottom: 0;
  }
}

.discrimination-free-spaces__link {
  display: block;
  text-align: center;
}

.discrimination-free-spaces__img {
  max-width: 100%;
  height: auto;
}
</style>
