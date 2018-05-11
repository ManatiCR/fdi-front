<template>
  <section class="view-resources-page">
    <div class="resources-page">
      <h3 class="resources-page__title">Recursos Jurídicos</h3>
      <ul class="resources-page__list">
        <li
          class="resources-page__item"
          v-for="(entity, index) in nodeQuery.entities"
          :key="index"
        >
          <h3 class="resources-page__item-title">
            <a v-if="entity.fieldEnlace" :href="entity.fieldEnlace.url.path" target="_blank">
              {{entity.entityLabel}}
            </a>
            <a v-else>
              {{entity.entityLabel}}
            </a>
          </h3>
          <p
            v-if="entity.fieldCategoriaRecursoJuridico"
            class="resources-page__category"
          >
            {{entity.fieldCategoriaRecursoJuridico.entity.entityLabel}}
          </p>
          <p
            v-if="entity.fieldVigencia"
            class="resources-page__date"
          >
            <strong>Vigente desde:</strong> {{ entity.fieldVigencia.value | moment("LL") }}
          </p>
          <div class="resources-page__body-button-container">
            <div v-if="entity.body" class="resources-page__body" v-html="entity.body.value"></div>
            <a
              v-if="entity.fieldEnlace"
              :href="entity.fieldEnlace.url.path"
              class="resources-page__btn btn btn--small btn--fill-highlight3 btn--arrow"
              target="_blank"
            >
              Descargar
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query {
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
        body {
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
  name: 'resources-page',
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
.resources-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.resources-page__title {
  margin: 0;
}

.resources-page__list {
  width: 100%;
  padding: 0;
}

.resources-page__item {
  width: 100%;
  list-style: none;
  margin-bottom: 0;
  padding: 10px 0;
  border-bottom: solid 1px gray;
  a {
    text-decoration: none;
  }
}

.resources-page__item:last-child {
  border: none;
}

.resources-page__item-title {
  margin: 0 0 10px 0;
  cursor: pointer;
  a {
    font-size: 1.6rem;
    color: $text;
  }
  a:hover {
    color: $highlight3;
  }
}

.resources-page__category {
  font-weight: 700;
  color: $highlight3;
  font-size: 1.4rem;
  margin: 0 0 10px 0;
}

.resources-page__date {
  font-size: 1.4rem;
  margin: 0 0 10px 0;
}

.resources-page__body-button-container {
  @media (min-width: 480px) {
    display: flex;
    justify-content: space-between;
  }
}

.resources-page__body {
  margin-bottom: 10px;
  flex: 12;
  p {
    margin-top: 0;
  }
}

.resources-page__btn {
  font-size: 1.2rem;
  padding: 8px 15px;
  @media (min-width: 480px) {
    height: 32px;
  }

}
</style>
