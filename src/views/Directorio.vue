<template>
  <section class="view-directorio">
    <div class="directory-page">
      <h3 class="directory-page__title">Directorio telefónico oficinas públicas</h3>
      <input type="text" placeholder="Buscar" class="directory-page-input" v-model="search" @keyup="filterDirectory">
      <ul class="directory-page__list">
        <li class="directory-page__item" v-for="entity in entitiesfiltered">
          <h3 class="directory-page__item-title">{{entity.entityLabel}}</h3>
          <a v-if="entity.fieldTelefono" class="directory-page__phone-number" :href="'tel:' + entity.fieldTelefono">{{entity.fieldTelefono}}</a>
          <a v-if="entity.fieldCorreo" :href="'mailto:' + entity.fieldCorreo">{{entity.fieldCorreo}}</a>
        </li>
      </ul>
    </div>
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
        update(data) {
          if (data.hasOwnProperty('nodeQuery') &&
            data.nodeQuery.hasOwnProperty('entities') &&
            data.nodeQuery.entities instanceof Array &&
            data.nodeQuery.entities.length > 1) {
              this.entities = data.nodeQuery.entities;
              this.entitiesfiltered = data.nodeQuery.entities;
          }
        }
      }
    }
  },
  data() {
    return {
      nodeQuery: {},
      search: '',
      entities: {},
      entitiesfiltered: {},
    }
  },
  methods: {
    filterDirectory() {
      this.entitiesfiltered = this.entities.filter(entity =>
        entity.entityLabel.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.view-directorio {
  padding: 20px;
  width: 100%;
}

.directory-page {
  max-width: 1000px;
  margin: 0 auto;
}

.directory-page__title {
  margin: 0 0 20px 0;
  @media (min-width: 480px) {
    margin-left: 1%;
  }
}

.directory-page-input {
  border: solid 1px #e0e0e0;
  height: 33px;
  width: 100%;
  margin-bottom: 20px;
  color: $text;
  background: url(.././assets/images/icons/search-icon.png) no-repeat;
  background-size: 20px;
  background-position: right 10px center;
  padding-left: 10px;
  &::placeholder {
    font-style: italic;
    color: #e0e0e0;
  }
  @media (min-width: 480px) {
    width: 218px;
    margin-left: 1%;
  }
}

.directory-page__list {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  @media (min-width: 480px) {
    display: flex;
    flex-wrap: wrap;
  }
}

.directory-page__item {
  list-style: none;
  margin: 0;
  padding: 20px;
  background-color: #eef5fb;
  @media (min-width: 480px) {
    flex: 0 1 48%;
    margin: 0 1%;
  }
  @media (min-width: 768px) {
    flex: 0 1 31.33%;
  }
  @media (min-width: 1441px) {
    flex: 0 1 23%;
  }
}

.directory-page__item-title,
.directory-page__phone-number {
  font-size: 1.4rem;
  margin: 0;
}

.directory-page__phone-number {
  display: block;
  font-weight: 400;
  padding: 5px 0;
  font-size: 1.4rem;
}

</style>
