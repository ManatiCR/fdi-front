<template>
  <section class="resources">
    <h3 class="resources__title">Recursos Jurídicos</h3>
    <ul class="resources__list">
      <li
        class="resources__item"
        v-for="(entity, index) in nodeQuery.entities"
        :key="index"
      >
        <h3 class="resources__item-title">
          <a v-if="entity.fieldEnlace" :href="entity.fieldEnlace.url.path" target="_blank">
            {{entity.entityLabel}}
          </a>
          <a v-else>
            {{entity.entityLabel}}
          </a>
        </h3>
        <p
          v-if="entity.fieldCategoriaRecursoJuridico"
          class="resources__category"
        >
          {{entity.fieldCategoriaRecursoJuridico.entity.entityLabel}}
        </p>
        <div class="resources__date-button-container">
          <p v-if="entity.fieldVigencia" class="resources__date">
            <strong>Vigente desde:</strong> {{ entity.fieldVigencia.value | moment("LL") }}
          </p>
          <a
            v-if="entity.fieldEnlace"
            :href="entity.fieldEnlace.url.path"
            class="resources__btn btn btn--small btn--fill-highlight3 btn--arrow"
            target="_blank"
          >
            Ver recurso
          </a>
        </div>
      </li>
    </ul>
    <router-link class="resources__see-all" :to="{ name: 'recursos jurídicos'}">
      Ver todos
    </router-link>
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
          operator: EQUAL,
          field: "type",
          value: ["recurso_juridico"]
        }
      ]
    }
  ) {
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
        query,
      };
    },
  },
  data() {
    return {
      nodeQuery: {},
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.resources {
  padding: 20px 20px 60px 20px;
  background-color: #fff;
  @media (min-width: 768px) {
    padding-bottom: 20px;
    max-width: 700px;
  }
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
    width: 48%;
  }
}

.resources__item:last-child {
  border: none;
}

.resources__item:nth-last-child(-n+2) {
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

.resources__see-all {
  margin-top: 22px;
  float: right;
}
</style>
