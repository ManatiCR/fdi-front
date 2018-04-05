<template>
  <section>
    <ul class="resources__list">
      <!-- <h3 class="resources__title">{{nodeQuery.limit}}</h3> -->
      <li class="resources__item" v-for="(entity, index) in nodeQuery.entities">
        <h3 class="resources__title">{{nodeQuery.entities[index].entityLabel}}</h3>
        <div v-html="nodeQuery.entities[index].body.value"></div>

        <!-- <p class="resources__category">{{nodeQuery.entities[index].fieldCategoriaRecursoJuridico.entity.entityLabel}}</p> -->
        <!-- <div class="resources__date-button-container"> -->
          <!-- <p class="resources__date"><strong>Vigente desde:</strong> {{ nodeQuery.entities[index].fieldVigencia.value | moment("LL") }}</p> -->
          <a :href="nodeQuery.entities[index].fieldMachote.entity.url" download class="btn btn--small btn--fill-highlight3 btn--arrow">Descargar</a>
        <!-- </div> -->
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query($limit: Int!) {
  nodeQuery(limit: $limit,
    offset: 0,
    filter: {
      conditions: [
        {
          operator: EQUAL,
          field: "type",
          value: ["machote"]
        }
      ]
    }) {
    entities {
      entityLabel
      ... on NodeMachote {
        fieldMachote {
          entity {
            url
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
  name: 'Model',
  props: [
    'limit'
  ],
  apollo: {
    nodeQuery() {
      return {
        query: query,
        variables: {
          limit: this.limit,
        },
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
