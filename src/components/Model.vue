<template>
  <section class="model">
    <ul class="model__list">
      <li
        class="model__item"
        v-for="(entity, index) in nodeQuery.entities"
        :key="index"
      >
        <img
          v-if="entity.fieldImagen"
          :width="(entity.fieldImagen.derivative.width/2)"
          :height="(entity.fieldImagen.derivative.height/2)"
          class="model__img"
          :src="entity.fieldImagen.derivative.url"
          :alt="entity.entityLabel"
        >
        <div class="model__body-container">
          <h3 class="model__title">
            {{entity.entityLabel}}
            </h3>
          <p class="model__date">
            Actualizado el {{ entity.entityChanged | moment("LL") }}
            </p>
          <div
            v-if="entity.body" class="model__body" v-html="entity.body.value"></div>
        </div>
        <router-link
          class="model__btn btn btn--fill-highlight3 btn--arrow"
          :to="'/recursos/recursos-de-denuncia/' + entity.entityId">
          Ver más
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query($limit: Int!) {
  nodeQuery(limit: $limit,
    sort: [
      {
        field: "created",
        direction: DESC
      }
    ],
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
      entityId
      entityLabel
      entityChanged
      ... on NodeMachote {
        fieldMachote {
          entity {
            url
          }
        }
        fieldImagen {
          derivative (style: machote) {
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
  name: 'Model',
  props: [
    'limit',
  ],
  apollo: {
    nodeQuery() {
      return {
        query,
        variables: {
          limit: this.limit,
        },
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

.model__list {
  width: 100%;
  padding: 0;
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.model__item {
  width: 100%;
  list-style: none;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #FAF5F1;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
}

.model__img {
  max-width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    flex: 1;
    margin-bottom: 0;
  }
}

.model__body-container {
  @media (min-width: 760px) {
    flex: 10;
    padding: 0 20px;
  }
}

.model__title,
.model__date,
.model__body p {
  margin: 0 0 20px 0;
}

.model__date {
  font-weight: 700;
}

.model__btn {
  @media (min-width: 760px) {
    flex: 2 100px;
    height: 45px;
    max-width: 145px;
    padding: 12px 0;
    margin-top: 85px;
  }
}
</style>
