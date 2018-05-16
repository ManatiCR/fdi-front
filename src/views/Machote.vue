<template>
  <section class="machote">
    <div class="machote__go-back-btn-wrapper">
      <a class="machote__go-back-btn" @click="$router.go(-1)">Volver</a>
    </div>
    <div class="machote__content-wrapper">
      <div class="machote__content-left-column">
        <h3 class="machote__title">{{ nodeQuery.title }}</h3>
        <div class="machote__body" v-if="nodeQuery.body" v-html="nodeQuery.body"></div>
        <h3 v-if="nodeQuery.comoUtilizarlo">¿Qué debés tomar en cuenta?</h3>
        <div
          class="machote__how-use-it"
          v-if="nodeQuery.comoUtilizarlo"
          v-html="nodeQuery.body">
        </div>
        <p>
          Si tenés alguna duda, podés contactarnos a través del
          <router-link
            class="machote__contact-link"
            :to="{ name: 'contacto', query: {reason: 'otro' }}">
            formulario de contacto
          </router-link>
        </p>
      </div>
      <div class="machote__content-right-column">
        <h3 v-if="nodeQuery.comoUtilizarlo">¿Cómo utilizarlo?</h3>
        <ul class="machote__steps-list" v-if="nodeQuery.comoUtilizarlo">
          <li
            class="machote__step-item"
            v-for="(step, index) in nodeQuery.comoUtilizarlo"
            :key="index"
          >
            <span> {{(index+1)}}</span><p>{{step}}</p>
          </li>
        </ul>
      </div>
      </div>
      <div class="machote__btn-wrapper">
        <a
        v-if="nodeQuery.machote"
        :href="nodeQuery.machote.entity.url"
        download
        class="machote__btn btn btn--fill-highlight1 btn--arrow"
        >
        Descargar
      </a>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query($id: String!){
  nodeQuery(
    filter: {
      conditions: [
        {
          operator: EQUAL,
          field: "type",
          value: ["machote"]
        },
        {
          operator: EQUAL,
          field: "nid",
          value: [$id]
        }
      ]
      }
      )
    {
    entities {
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
        fieldComoUtilizarlo
        fieldQueDebesTomarEnCuenta {
          value
        }
        body {
          value
        }
      }
    }
  }
}`;

export default {
  name: 'Machote',
  apollo: {
    nodeQuery() {
      return {
        query,
        variables() {
          return {
            id: this.$route.params.id,
          };
        },
        update(data) {
          if (Object.prototype.hasOwnProperty.call(data, 'nodeQuery') &&
          Object.prototype.hasOwnProperty.call(data.nodeQuery, 'entities') &&
          data.nodeQuery.entities instanceof Array &&
          data.nodeQuery.entities.length === 1) {
            const entity = data.nodeQuery.entities[0];
            return {
              title: entity.entityLabel,
              body: entity.body.value,
              comoUtilizarlo: entity.fieldComoUtilizarlo,
              machote: entity.fieldMachote,
              queDebesTomarEnCuenta: entity.fieldQueDebesTomarEnCuenta,
            };
          }
          return data;
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
@import "../assets/scss/variables";

.machote {
  background: #eef5fb;
  margin-bottom: 80px;
  padding-bottom: 60px;
}

.machote h3,
.machote p {
  margin: 0 0 20px 0;
}

.machote__content-wrapper {
  padding: 20px;
  max-width: 1100px;
  margin: 40px auto 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
}

.machote__content-left-column {
  margin: 0 auto 80px auto;
  @media (min-width: 768px) {
    margin-bottom: 0;
    flex: 0 1 500px;
  }
  p,
  .machote__contact-link {
    font-size: 1.6rem;
  }
}

.machote__content-right-column {
  margin: 0 auto;
  @media (min-width: 768px) {
    margin-left: 20px;
    margin-top: 55px;
    flex: 0 1 500px;
  }
}

.machote__title {
  font-size: 3rem;
}

.machote__body {
    margin-bottom: 40px;
}

.machote__steps-list {
  padding: 0;
  list-style: none;
}

.machote__step-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.machote__steps-list span {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  display: inline-block;
  background-color: $highlight2;
  border-radius: 50%;
  text-align: center;
  align-self: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.6rem;
  padding-top: 9px;
  margin-right: 20px;
}

.machote__steps-list p {
  margin: 0;
  align-self: center;
  display: inline-block;
  font-size: 1.6rem;
}

.machote__go-back-btn-wrapper {
  display: block;
  background: white;
  margin-top: 40px;
  @media (min-width: 768px) {
    margin-top: 80px;
  }
}

.machote__btn-wrapper {
  display: block;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.machote__go-back-btn {
  max-width: 1100px;
  display: block;
  padding: 10px;
  margin: 0 auto;
  &:before {
    content: "";
    margin-left: 10px;
    margin-right: 8px;
    border: solid #2dbcdb;
    border-width: 2px 0 0 2px;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
}

.machote__btn {
  margin: 0 auto;
  @media (min-width: 768px) {
    float: right;
  }
}
</style>
