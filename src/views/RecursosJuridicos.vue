<template>
  <section class="resources">
    <h3 class="resources__title">Recursos Jurídicos</h3>
    <ul class="resources__list">
      <li class="resources__item" v-for="(entity, index) in nodeQuery.entities">
        <h3 class="resources__item-title">
          <a :href="entity.fieldEnlace.url.path" target="_blank">
            {{entity.entityLabel}}
          </a>
        </h3>
        <p class="resources__category">{{entity.fieldCategoriaRecursoJuridico.entity.entityLabel}}</p>
        <!-- <div v-html="entity.body.value"></div> -->

        <div class="resources__date-button-container">
          <p class="resources__date"><strong>Vigente desde:</strong> {{ entity.fieldVigencia.value | moment("LL") }}</p>
          <a :href="entity.fieldEnlace.url.path" class="resources__btn btn btn--small btn--fill-highlight3 btn--arrow" target="_blank">Descargar</a>
        </div>
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
.resources {
  padding: 20px;
  max-width: 1000px;
}

.resources__title {
  margin: 0;
  padding: 0;
}

.resources__list {
  width: 100%;
  padding: 0;
  @media (min-width: 480px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.resources__item {
  width: 100%;
  list-style: none;
  margin-bottom: 0;
  padding: 10px 0;
  border-bottom: solid 1px gray;
  a {
    text-decoration: none;
  }
  @media (min-width: 480px) {
    width: 31%;
    margin-left: 10px;

  }
}

.resources__item:last-child {
  border: none;
}

.resources__item:nth-last-child(-n+3) {
  @media (min-width: 480px) {
    border: none;
  }
}

.resources__item-title {
  margin: 0 0 10px 0;
  cursor: pointer;
  a {
    font-size: 1.4rem;
    color: $text;
  }
  a:hover {
    color: $highlight3;
  }
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
