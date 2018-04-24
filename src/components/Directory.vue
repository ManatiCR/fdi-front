<template>
  <section class="directory">
    <h3 class="directory__title">Directorio telefónico oficinas públicas</h3>
    <ul class="directory__list">
      <li class="directory__item" v-for="(entity, index) in nodeQuery.entities">
        <h3 class="directory__item-title">{{entity.entityLabel}}</h3>
        <p class="directory__phone-number">{{entity.fieldTelefono}}</p>
        <a :href="'mailto:' + entity.fieldCorreo">{{entity.fieldCorreo}}</a>
      </li>
    </ul>
    <router-link class="directory__see-all" :to="{ name: 'recursos directorio'}">
      Ver todos
    </router-link>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql `query {
  nodeQuery(limit: 5,
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
          value: ["directorio"]
        }
      ]
    }) {
      entities {
        entityLabel
        ... on NodeDirectorio {
          fieldCorreo
          fieldTelefono
        }
      }
    }
  }`;

export default {
  name: 'directory',
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

.directory {
  background-color: #fff;
  width: 100%;
  padding: 20px 20px 40px 20px;
  @media (min-width: 768px) {
    padding-bottom: 20px;
    max-width: 350px;
  }
}

.directory__title {
  margin: 0;
}

.directory__list {
  width: 100%;
  padding: 0 20px;
}

.directory__item {
  list-style: none;
  margin-bottom: 0;
  padding: 10px 0;
}

.directory__item-title,
.directory__phone-number {
  font-size: 1.4rem;
  color: $text;
  margin: 0;
}

.directory__see-all {
  float: right;
}

</style>
