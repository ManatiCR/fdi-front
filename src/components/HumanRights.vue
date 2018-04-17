<template>
  <section class="human-rights">
    <ul class="human-rights__list">
      <li class="human-rights__item" v-for="(entity, index) in nodeQuery.entities">
        <img :width="entity.fieldImagen.derivative.width" :height="entity.fieldImagen.derivative.height" class="human-rights__img" :src="entity.fieldImagen.derivative.url" :alt="entity.entityLabel">
        <h3 class="human-rights__title">{{entity.entityLabel}}</h3>
        <div class="human-rights__body" v-html="entity.body.value"></div>
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
          value: ["derecho"]
        }
      ]
    }) {
      entities {
        entityLabel
        ... on NodeDerecho {
          fieldImagen {
            derivative (style: logo_derechos) {
              url
              width
              height
            }
          }
          body {
            value
          }
        }
      }
    }
  }`;

export default {
  name: 'HumanRights',
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

.human-rights__list {
  max-width: 1440px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
}

.human-rights__item {
  width: 100%;
  max-width: 400px;
  padding: 5px;
  list-style: none;
  margin-bottom: 20px;
  display: block;
  text-align: center;
  @media (min-width: 480px) {
    width: 45%;
  }
  @media (min-width: $bp-medium) {
    width: 32%;
    margin-bottom: 0;
  }
}

.human-rights__img {
  max-width: 100%;
  height: auto;
}

.human-rights__body {
  text-align: left;
}
</style>
