<template>
  <section class="resources">
    <h3>Recursos Jurídicos</h3>
    <ul class="resources__list">
      <li class="resources__item" v-for="(entity, index) in nodeQuery.entities">
        <h3 class="resources__title">{{nodeQuery.entities[index].entityLabel}}</h3>
        <p class="resources__category">{{nodeQuery.entities[index].fieldCategoriaRecursoJuridico.entity.entityLabel}}</p>
        <div class="resources__date-button-container">
          <p class="resources__date"><strong>Vigente desde:</strong> {{ nodeQuery.entities[index].fieldVigencia.value | moment("LL") }}</p>
          <a :href="nodeQuery.entities[index].fieldEnlace.url.path" class="resources__btn btn btn--small btn--fill-highlight3 btn--arrow">Descargar</a>
        </div>
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
          value: ["recurso_juridico"]
        }
      ]
    }) {
      entities {
        entityLabel
        ... on NodeRecursoJuridico {
          fieldEnlace{
            url {
              path
            }
          }
          fieldVigencia {
            value
          }
          fieldCategoriaRecursoJuridico {
            entity {
              entityLabel
            }
          }
        }
      }
    }
  }`;

export default {
  name: 'Resources',
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

.resources__list {
  width: 100%;
  padding: 0;
  @media (min-width: 480px) {
    max-width: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  }
}

.resources__item {
  width: 100%;
  list-style: none;
  margin-bottom: 20px;
  @media (min-width: 480px) {
    width: 45%;
  }
}

.resources__title {
  margin: 0 0 10px 0;
  font-size: 1.4rem;
}

.resources__category {
  margin: 0;
  font-weight: 700;
  color: $highlight3;
  font-size: 1.2rem;
}
.resources__date {
  max-width: 135px;
  display: inline-block;
  vertical-align: middle;
  font-size: 1.2rem;
}

.resources__btn {
  font-size: 1.1rem;
  padding: 8px 15px;
}
</style>
