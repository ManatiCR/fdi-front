<template>
  <section :class="'content-block ' + componentClass">
    <h1 :class="'content-block__title ' + componentClass + '__title'">{{ nodeQuery.title }}</h1>
    <div :class="'content-block__body ' + componentClass + '__body'" v-html="nodeQuery.body"></div>
    <img v-if="$mq >= 'md' && renderImage"
      :class="'content-block__img ' + componentClass + '__img'"
      :width="(nodeQuery.imageSmall.width/2)"
      :height="(nodeQuery.imageSmall.height/2)"
      :src="nodeQuery.imageSmall.url" :alt="nodeQuery.title">
    <img v-else-if="$mq <= 'md' && renderImage"
      :class="'content-block__img ' + componentClass + '__img'"
      :width="(nodeQuery.imageLarge.width/2)"
      :height="(nodeQuery.imageLarge.height/2)"
      :src="nodeQuery.imageLarge.url" :alt="nodeQuery.title">
  </section>
</template>

<script>
import gql from 'graphql-tag';

const query = gql`query($id: String!, $imageStyleSmall: ImageStyleId!, $imageStyleLarge: ImageStyleId!) {
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
          imageSmall: fieldImagen {
            derivative (style: $imageStyleSmall){
              url
              width
              height
            }
          }
          imageLarge: fieldImagen {
            derivative (style: $imageStyleLarge){
              url
              width
              height
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
    'imagestyle',
  ],
  apollo: {
    nodeQuery() {
      // Load the image style according to the prop.
      if (typeof this.imagestyle !== 'undefined') {
        if (this.imagestyle === 'full') {
          this.imageStyleSmall = 'content_full_small';
          this.imageStyleLarge = 'content_full_large';
        }
        else if (this.imagestyle === 'mid') {
          this.imageStyleSmall = 'content_mid_small';
          this.imageStyleLarge = 'content_mid_large';
        }
      }
      else {
        // The argument can not be empty or undefined.
        this.imageStyleSmall = 'medium';
        this.imageStyleLarge = 'medium';
      }
      return {
        query: query,
        variables: {
          id: this.id,
          imageStyleSmall: this.imageStyleSmall,
          imageStyleLarge: this.imageStyleLarge,
        },
        update(data) {
          if (data.hasOwnProperty('nodeQuery') &&
            data.nodeQuery.hasOwnProperty('entities') &&
            data.nodeQuery.entities instanceof Array &&
            data.nodeQuery.entities.length === 1) {
            const entity = data.nodeQuery.entities[0];

            this.componentClass = 'content-block-' + this.id.replace("_", "-");
            if (this.componentImages.findIndex(e => e === this.id) > -1) {
              this.renderImage = true;
              this.imageSmall = entity.imageSmall.derivative;
              this.imageLarge = entity.imageLarge.derivative;
            }

            return {
              title: entity.entityLabel,
              body: entity.body.value,
              imageSmall: this.imageSmall,
              imageLarge: this.imageLarge,
            }
          }
        }
      }
    }
  },
  data() {
    return {
      title: '',
      nodeQuery: {},
      componentClass: '',
      renderImage: false,
      componentImages: ['derechos_header', 'home_fdi', 'home_derechos'],
      imageSmall: '',
      imageLarge: '',
      imageStyleSmall: '',
      imageStyleLarge: '',
    }
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.content-block {

}

.content-block-home-reporte {

}

.content-block__img {
  height: auto;
}

</style>
