<template>
  <section :class="'content-block__' + componentClass">
    <div class="content-block__content-wrapper">
      <div v-if="renderImage" class="content-block__img-wrapper">
        <picture class="content-block__img">
          <source media="(min-width: 1000px)"
          :srcset="imageLarge.url + ' 2x'">
          <source media="(min-width: 768px)"
            :srcset="imageMedium.url + ' 2x,'">
          <img :alt="nodeQuery.title"
           :srcset="imageSmall.url + ' 2x'">
        </picture>
        <h1 v-if="renderTitleTop" class="content-block__title">{{ nodeQuery.title }}</h1>
      </div>
      <div class="content-block__body-button-wrapper">
        <h1 v-if="renderTitleBody" class="content-block__title">{{ nodeQuery.title }}</h1>
        <div class="content-block__body" v-html="nodeQuery.body"></div>
        <a v-if="renderLink" :class="'btn content-block__btn ' +  blockLink.classes" :href="blockLink.url">{{ blockLink.label }}</a>
        <router-link v-if="renderRouterLink"
          :class="'btn content-block__btn ' +  blockLink.classes"
          :to="{ name: blockLink.url}">{{ blockLink.label }}
        </router-link>
      </div>
    </div>
  </section>

</template>

<script>
import gql from 'graphql-tag';

const query = gql`query($id: String!, $imageStyleSmall: ImageStyleId!, $imageStyleLarge: ImageStyleId!, $imageStyleMedium: ImageStyleId!) {
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
          imageMedium: fieldImagen {
            derivative (style: $imageStyleMedium){
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
          this.imageStyleMedium = 'content_full_medium';
        }
        else if (this.imagestyle === 'mid') {
          this.imageStyleSmall = 'content_mid_small';
          this.imageStyleLarge = 'content_mid_large';
          this.imageStyleMedium = 'content_mid_medium';
        }
      }
      else {
        // The argument can not be empty or undefined.
        this.imageStyleSmall = 'medium';
        this.imageStyleLarge = 'medium';
        this.imageStyleMedium = 'medium';
      }
      return {
        query: query,
        variables: {
          id: this.id,
          imageStyleSmall: this.imageStyleSmall,
          imageStyleLarge: this.imageStyleLarge,
          imageStyleMedium: this.imageStyleMedium,
        },
        update(data) {
          if (data.hasOwnProperty('nodeQuery') &&
            data.nodeQuery.hasOwnProperty('entities') &&
            data.nodeQuery.entities instanceof Array &&
            data.nodeQuery.entities.length === 1) {
            const entity = data.nodeQuery.entities[0];

            this.componentClass = this.id.replace("_", "-");
            if (this.componentImages.findIndex(e => e === this.id) > -1) {
              this.renderImage = true;
              this.imageSmall = entity.imageSmall.derivative;
              this.imageLarge = entity.imageLarge.derivative;
              this.imageMedium = entity.imageMedium.derivative;
            }

            if ( this.componentLinks.findIndex(e => e.componentId == this.id)  > -1) {
              var index = this.componentLinks.findIndex(e => e.componentId == this.id);
              this.blockLink = this.componentLinks[index];
              if (this.blockLink.external) {
                this.renderLink = true;
              }
              else {
                this.renderRouterLink = true;
              }
            }

            if ( this.componentTitle.findIndex(e => e.componentId == this.id)  > -1) {
              var index = this.componentTitle.findIndex(e => e.componentId == this.id);
              if (this.componentTitle[index].position === 'top') {
                this.renderTitleTop = true;
              }
              else {
                this.renderTitleBody = true;
              }
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
      renderLink: false,
      renderRouterLink: false,
      renderTitleTop: false,
      renderTitleBody: false,
      componentImages: ['derechos_header', 'home_fdi', 'home_derechos'],
      renderTitleTop: false,
      renderTitleBody: false,
      componentLinks: [
        {componentId: 'home_reporte', classes: 'btn--xlarge btn--border-highlight1', label: 'Reporta', url: 'reporte', external: false},
        {componentId: 'home_derechos', classes: 'btn--xlarge btn--border-highlight2', label: 'Conocé tus derechos', url: 'derechos', external: false},
        {componentId: 'home_fdi', classes: 'btn--large btn--fill-highlight2', label: 'Conocé más', url: 'https://www.fdi.cr', external: true},
        {componentId: 'home_espacios', classes: 'btn--border-white', label: 'Ver más', url: 'espacios', external: false},
      ],
      componentTitle: [
        {componentId: 'home_fdi', position: 'top'},
        {componentId: 'home_espacios', position: 'body'},
        {componentId: 'reporte', position: 'body'},
        {componentId: 'derechos_header', position: 'body'},
        {componentId: 'derechos_footer', position: 'body'},
        {componentId: 'recursos', position: 'body'},
        {componentId: 'contacto', position: 'body'},
      ],
      blockLink: '',
      imageSmall: '',
      imageLarge: '',
      imageMedium: '',
      imageStyleSmall: '',
      imageStyleLarge: '',
      imageStyleMedium: '',
    }
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.content-block__img img{
  max-width: 100%;
  width: 100%;
  height: auto;
}

.content-block__body p {
  line-height: 1.5;
  font-size: 1.6rem;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
}

// Components Home reporte, recursos derechos header shared styles
.content-block__home-reporte,
.content-block__recursos,
.content-block__derechos-footer {
  padding: 0 20px;
  background-size: 300px;
  @media (min-width: 480px) {
    background-size: 400px;
  }
  .content-block__content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    padding: 100px 0 20px 0;
    display: block;
    @media (min-width: 768px) {
      padding: 100px 0 150px 0;
    }
  }
  .content-block__body-button-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .content-block__body {
    flex: 0 1 100%;
    text-align: left;
    @media (min-width: 768px) {
      text-align: center;
    }
  }
}
// Components Home reporte, recursos derechos header shared styles -- end

// Component Home reporte
.content-block__home-reporte {
  background: #eef5fb url(.././assets/images/patron-1.png) no-repeat;
  .content-block__btn {
    order: -1;
    flex-basis: 250px;
    margin-bottom: 20px;
  }
}
// Component Home reporte -- end

// Component Home recursos and derechos header
.content-block__recursos, .content-block__derechos-footer {
  background: $highlight1 url(.././assets/images/patron-2.png) no-repeat;
  .content-block__body p, .content-block__title {
    color: #fff;
  }
  .content-block__title {
    border-right: solid 5px $highlight2;
    padding-right: 50px;
    text-align: left;
  }
}
// Component Home recursos and derechos header -- end

// Component derechos header
.content-block__derechos-footer {
  .content-block__content-wrapper {
    padding-top: 40px;
    padding-bottom: 100px;
  }
  .content-block__body-button-wrapper {
      justify-content: flex-start;
  }
  .content-block__body p, .content-block__title {
    text-align: left;
  }
}
// Component derechos header -- end

// Components Home reporte, recursos derechos header shared background size styles
.content-block__home-reporte,
.content-block__recursos,
.content-block__derechos-footer {
  background-position: top -50px right -50px;
  background-size: 300px;
  @media (min-width: 480px) {
    background-size: 400px;
  }
}
// Components Home reporte, recursos derechos header shared background size styles -- end

// Component Home derechos and derechos header
.content-block__home-derechos,
.content-block__derechos-header {
  .content-block__content-wrapper {
    position: relative;
  }
  .content-block__body-button-wrapper {
    background: #fff;
    max-width: 600px;
    position: absolute;
    margin: 0 auto;
    top: calc(50% - 160px);
    left: 0;
    right: 0;
    @media (min-width: 425px) {
      top: calc(50% - 135px);
    }
  }
}
// Component Home derechos and derechos header -- end

// Component Home derechos -- end
.content-block__home-derechos {
  .content-block__body-button-wrapper {
    width: calc(100% - 40px);
    padding: 20px;
    text-align: center;
    @media (min-width: 425px) {
      padding: 40px;
    }
  }
  .content-block__body {
    margin-bottom: 20px;
  }
}
// Component Home derechos -- end

// Component derechos header -- end
.content-block__derechos-header {
  .content-block__title {
    margin: 0 0 20px 0;
    border-right: solid 5px $highlight2;
    padding-right: 50px;
    display: inline-block;
  }
  .content-block__body-button-wrapper {
    width: calc(100% - 20px);
    padding: 15px;
    top: calc(50% - 165px);
    @media (min-width: 360px) {
      padding: 20px;
    }
    @media (min-width: 1000px) {
      padding: 40px;
      top: calc(50% - 125px);
      margin: 0;
      left: inherit;
      right: 5%;
    }
  }
}
// Component derechos header -- end

// Component home FDI
.content-block__home-fdi {
  padding: 40px 20px;
  background: #eef5fb;
  .content-block__content-wrapper {
    @media (min-width: 768px) {
      margin: 0 auto;
      max-width: 1400px;
      display: flex;
      align-items: flex-start;
    }
  }
  .content-block__img-wrapper {
    position: relative;
    margin-bottom: 20px;
    flex: 2;
  }
  .content-block__body-button-wrapper {
    background-color: #fff;
    text-align: center;
    padding: 20px 20px 20px 20px;
    flex: 1;
    @media (min-width: 768px) {
      margin: 0 0 0 20px;
    }
  }
  .content-block__body {
    margin-bottom: 20px;
    p {
      text-align: left;
    }
  }
  .content-block__btn {
    margin: 0 auto;
    @media (min-width: 768px) {
      float: right;
    }
  }
  .content-block__title {
    position: absolute;
    bottom: 20%;
    left: 20px;
    text-shadow: 3px 3px 5px $text;
    color: #fff;
    max-width: 250px;
    font-size: 1.8rem;
    @media (min-width: 768px) {
      font-size: 2.4rem;
      max-width: 350px;
    }
  }
}
// Component home FDI -- end

// Component home espacios
.content-block__home-espacios {
  margin-bottom: 80px;
  margin: auto;
  .content-block__body-button-wrapper {
    text-align: center;
    background: $highlight1;
    padding: 20px;
    position: relative;
    @media (min-width: $bp-medium) {
      margin-right: 20px;
      &:after {
        content: "";
        position: absolute;
        top: 10%;
        right: -20px;
        height: 80%;
        width: 20px;
        background-color: lighten($highlight1, 30%);
      }
    }
    @media (min-width: 768px) {
      padding: 80px;
    }
  }
  .content-block__title, .content-block__body p {
    text-align: left;
    margin: 0;
    color: #fff;
    margin-bottom: 20px;
  }
}

.btn--border-white {
  border: 4px solid #fff;
  color: #fff;
  &:hover {
    background: #fff;
    color: $highlight1;
  }
  @media (min-width: 768px) {
    float: right;
  }
}
// Component home espacios -- end
</style>
