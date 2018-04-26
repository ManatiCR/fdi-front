<template>
  <section :class="componentClass">
    <h1 v-if="renderImage">{{ imagestyles }}</h1>
    <h1 :class="componentClass + '__title'">{{ nodeQuery.title }}</h1>
    <div :class="componentClass + '__body'" v-html="nodeQuery.body"></div>
    <img v-if="renderImage"
      :width="(nodeQuery.image.width/2)"
      :height="(nodeQuery.image.height/2)"
      :class="componentClass + '__img'"
      :src="nodeQuery.image.url" :alt="nodeQuery.title">
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query($id: String!, $imagestylesone: ImageStyleId!,$imagestyletwo: ImageStyleId!) {
  nodeQuery(limit: 1,
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
          imageone: fieldImagen {
            derivative (style: $imagestylesone){
              url
            }
          }
          imagetwo: fieldImagen {
            derivative (style: $imagestyletwo){
              url
            }
          }
        }
      }
    }
  }`;

export default {
  name: 'ContentBlock',
  props: [
    'id',
    'imagestyles',
  ],
  apollo: {
    nodeQuery() {
      return {
        query: query,
        variables: {
          id: this.id,
          imagestyles: this.imagestyles,
          imagestylesone: this.getStyle(),
          imagestyletwo: 'content_full_small',
        },
        update(data) {
          if (data.hasOwnProperty('nodeQuery') &&
            data.nodeQuery.hasOwnProperty('entities') &&
            data.nodeQuery.entities instanceof Array &&
            data.nodeQuery.entities.length === 1) {
            const entity = data.nodeQuery.entities[0];
            console.log(imagestyletwo);

            this.componentClass = 'content-block-' + this.id.replace("_", "-");

            if (this.inArray(this.componentImages, this.id)) {
              this.renderImage = true;
              this.image = entity.imageone.derivative;
              // this.style = this.styles;
            }
            return {
              title: entity.entityLabel,
              body: entity.body.value,
              image: this.image,
            }
          }
        }
      }
    }
  },
  methods: {
    inArray(array, value) {
      var length = array.length;
       for(var i = 0; i < length; i++) {
         if(array[i] == value) {
           return true;
         }
       }
       return false;
    },
    getStyle() {
    if (this.imagestyles && this.imagestyles === 'full') {
      return'content_full_large';
    }
    else {
      {
        return 'medium'
      }
    }
    },
  },
  data() {
    return {
      title: '',
      nodeQuery: {},
      componentClass: '',
      renderImage: false,
      componentImages: ['derechos_header', 'home_fdi', 'home_derechos'],
      image: '',
      // style: '',
    }
  },
}
</script>
