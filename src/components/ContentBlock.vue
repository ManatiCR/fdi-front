<template>
  <section>
    <h1>{{ nodeQuery.title }}</h1>
    <div v-html="nodeQuery.body"></div>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query($id: String!) {
  nodeQuery(limit: 10,
    offset: 0,
    filter: {
      conditions: [
        {
          operator: EQUAL,
          field: "type",
          value: ["bloque_de_contenido"]
        },
        {
          operator: EQUAL,
          field: "field_tipo",
          value: [$id]
        }
      ]
    }) {
    entities {
      entityLabel,
      ... on NodeBloqueDeContenido {
        body {
          value
        },
        fieldImagen {
          url
        }
      }
    }
  }
}`;

export default {
  name: 'ContentBlock',
  props: [
    'id',
  ],
  apollo: {
    nodeQuery() {
      return {
        query,
        variables: {
          id: this.id,
        },
        update(data) {
          console.log('data', data);
          if (Object.prototype.hasOwnProperty.call(data, 'nodeQuery') &&
          Object.prototype.hasOwnProperty.call(data.nodeQuery, 'entities') &&
          data.nodeQuery.entities instanceof Array &&
          data.nodeQuery.entities.length === 1) {
            const entity = data.nodeQuery.entities[0];
            return {
              title: entity.entityLabel,
              body: entity.body.value,
              image: entity.fieldImagen,
            };
          }
          return data;
        },
      };
    },
  },
  data() {
    return {
      title: '',
      nodeQuery: {},
    };
  },
};
</script>
