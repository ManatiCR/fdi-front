<template>
  <section class="view-directorio">
    <h3 class="directory-page__title">Directorio telefónico oficinas públicas</h3>
    <!-- <input type="text" class="directory-page-input" v-model="search" v-on:change="filterDirectory"> -->
    <input type="text" class="directory-page-input" v-model="search" v-on:change="filterDirectory">

    <button type="button">Test</button>
    <ul class="directory-page__list">
      <li class="directory-page__item" v-for="entity in filterDirectory">
        <h3 class="directory-page__item-title">{{entity.entityLabel}}</h3>
        <p class="directory-page__phone-number">{{entity.fieldTelefono}}</p>
        <a :href="'mailto:' + entity.fieldCorreo">{{entity.fieldCorreo}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql `query {
  nodeQuery(limit: 9999,
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
  name: 'directory-page',
  apollo: {
    nodeQuery() {
      return {
        query: query,
      }
    }
  },
  data() {
    return {
      search: '',
      nodeQuery: {},
    }
  },
  methods: {
    filterDirectory() {
      alert('ho');
      // return this.nodeQuery.entities
      return this.nodeQuery.entities.filter(item => {
        return item.entityLabel.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    }
  },
}
</script>

<style lang="scss">
.directory-page {
  background-color: #fff;
  padding: 20px;
}

.directory-page__title {
  margin: 0;
}

.directory-page__list {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 600px;
}

.directory-page__item {
  list-style: none;
  margin-bottom: 0;
  padding: 10px 0;
}

.directory-page__item-title,
.directory-page__phone-number {
  font-size: 1.4rem;
  margin: 0;
}

</style>
