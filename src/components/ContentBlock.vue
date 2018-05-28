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
        <a
          v-if="renderLink"
          :class="'btn content-block__btn ' +  blockLink.classes"
          :href="blockLink.url"
          target="_blank">
          {{ blockLink.label }}
        </a>
        <router-link v-if="renderRouterLink"
          :class="'btn content-block__btn ' +  blockLink.classes"
          :to="{ name: blockLink.url}">{{ blockLink.label }}
        </router-link>
        <router-link v-if="renderLinkSuggestSpace"
          class="btn content-block__btn btn--large btn--fill-highlight2"
          :to="{ name: 'contacto', query: { reason: 'recomendar_espacio' }}">Recomendar lugar
        </router-link>
        <p v-if="renderHelpText" class="content-block__help-text">
          (Este enlace te llevará a la página del Frente por los Derechos Igualitarios)
        </p>
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
      return {
        query,
        variables() {
          this.setImageStyles();
          return {
            id: this.id,
            imageStyleSmall: this.imageStyleSmall,
            imageStyleLarge: this.imageStyleLarge,
            imageStyleMedium: this.imageStyleMedium,
          };
        },
        error(error) {
          // This is a hack. We need to use cached data if network is unavailable.
          if (error.networkError) {
            this.$apollo.skipAllQueries = true;
            setTimeout(() => {
              this.$apollo.skipAllQueries = false;
            }, 1000);
          }
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
            };
          }
          return data;
        },
        result(ApolloQueryResult) {
          const entity = ApolloQueryResult.data.nodeQuery.entities[0];
          this.componentClass = this.id.replace('_', '-');
          if (this.componentImages.findIndex(e => e === this.id) > -1) {
            this.renderImage = true;
            this.imageSmall = entity.imageSmall.derivative;
            this.imageLarge = entity.imageLarge.derivative;
            this.imageMedium = entity.imageMedium.derivative;
          }

          if (this.componentLinks.findIndex(e => e.componentId === this.id) > -1) {
            const index = this.componentLinks.findIndex(e => e.componentId === this.id);
            this.blockLink = this.componentLinks[index];
            if (this.blockLink.external) {
              this.renderLink = true;
            } else {
              this.renderRouterLink = true;
            }
          }

          if (this.componentTitle.findIndex(e => e.componentId === this.id) > -1) {
            const index = this.componentTitle.findIndex(e => e.componentId === this.id);
            if (this.componentTitle[index].position === 'top') {
              this.renderTitleTop = true;
            } else {
              this.renderTitleBody = true;
            }
          }

          if (this.id === 'espacios') {
            this.renderLinkSuggestSpace = true;
          }

          if (this.id === 'recursos_juridicos') {
            this.renderHelpText = true;
          }
        },
      };
    },
  },
  methods: {
    setImageStyles() {
      if (typeof this.imagestyle !== 'undefined') {
        if (this.imagestyle === 'full') {
          this.imageStyleSmall = 'content_full_small';
          this.imageStyleLarge = 'content_full_large';
          this.imageStyleMedium = 'content_full_medium';
        } else if (this.imagestyle === 'mid') {
          this.imageStyleSmall = 'content_mid_small';
          this.imageStyleLarge = 'content_mid_large';
          this.imageStyleMedium = 'content_mid_medium';
        }
      } else {
        // The argument can not be empty or undefined.
        this.imageStyleSmall = 'medium';
        this.imageStyleLarge = 'medium';
        this.imageStyleMedium = 'medium';
      }
    },
    stripHtml(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    },
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
      componentLinks: [
        {
          componentId: 'home_reporte',
          classes: 'btn--xlarge btn--border-highlight1',
          label: 'Reportá',
          url: 'reporte',
          external: false,
        },
        {
          componentId: 'home_derechos',
          classes: 'btn--xlarge btn--border-highlight2',
          label: 'Conocé tus derechos',
          url: 'derechos',
          external: false,
        },
        {
          componentId: 'home_fdi',
          classes: 'btn--large btn--fill-highlight2',
          label: 'Conocé más',
          url: 'https://www.fdi.cr',
          external: true,
        },
        {
          componentId: 'home_espacios',
          classes: 'btn--border-white',
          label: 'Ver más',
          url: 'espacios',
          external: false,
        },
        {
          componentId: 'recursos_juridicos',
          classes: 'btn--large btn--arrow btn--fill-highlight1',
          label: 'Compendio Jurídico sobre DDHH',
          url: 'http://biblioteca.fdi.cr',
          external: true,
        },
      ],
      componentTitle: [
        {
          componentId: 'home_fdi',
          position: 'top',
        },
        {
          componentId: 'home_espacios',
          position: 'body',
        },
        {
          componentId: 'reporte',
          position: 'body',
        },
        {
          componentId: 'derechos_header',
          position: 'body',
        },
        {
          componentId: 'derechos_footer',
          position: 'body',
        },
        {
          componentId: 'recursos',
          position: 'body',
        },
        {
          componentId: 'recursos_juridicos',
          position: 'body',
        },
        {
          componentId: 'contacto',
          position: 'body',
        },
        {
          componentId: 'espacios',
          position: 'body',
        },
      ],
      renderLinkSuggestSpace: false,
      renderHelpText: false,
      blockLink: '',
      imageSmall: '',
      imageLarge: '',
      imageMedium: '',
      imageStyleSmall: '',
      imageStyleLarge: '',
      imageStyleMedium: '',
    };
  },
  metaInfo() {
    let description = '';
    switch (this.id) {
      case 'home_reporte':
      case 'reporte':
      case 'derechos_header':
      case 'recursos':
      case 'contacto':
      case 'espacios':
        description = this.stripHtml(this.nodeQuery.body);
        description = description.slice(0, description.indexOf('\n'));
        var re = new RegExp(String.fromCharCode(160), 'g');
        description = description.replace(re, ' ');
        break;
      default:
        break;
    }
    if (description) {
      return {
        meta: [
          {property: 'og:description', content: description},
          {property: 'twitter:description', content: description},
        ],
      };
    } else {
      return {};
    }
  },
};
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

// Components Home reporte, espacios, recursos derechos header shared styles
.content-block__espacios,
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

// Component Home reporte and espacios background
.content-block__espacios,
.content-block__home-reporte {
  background: #eef5fb url(.././assets/images/patron-1.png) no-repeat;
}
// Component Home reporte and espacios background -- end

// Component Home reporte
.content-block__home-reporte {
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

// Component derechos footer
.content-block__derechos-footer {
  .content-block__body-button-wrapper {
      justify-content: flex-start;
  }
  .content-block__body p, .content-block__title {
    text-align: left;
  }
}
// Component derechos footer -- end

// Component espacios
.content-block__espacios p {
  margin-bottom: 20px;
}
// Component espacios -- end

// Component derechos footer and espacios -- end
.content-block__derechos-footer,
.content-block__espacios {
  .content-block__content-wrapper {
    padding-top: 40px;
    padding-bottom: 100px;
  }
}
// Component derechos footer and espacios -- end

// Components Home reporte, espacios, recursos derechos header shared background size styles
.content-block__espacios,
.content-block__home-reporte,
.content-block__recursos,
.content-block__derechos-footer {
  background-position: top -50px right -50px;
  background-size: 300px;
  @media (min-width: 480px) {
    background-size: 400px;
  }
}
// Components Home reporte, espacios, recursos derechos header shared background size styles -- end

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
      top: calc(50% - 135px);
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
    }
  }
  .content-block__img-wrapper {
    align-self: flex-start;
    position: relative;
    margin-bottom: 20px;
    flex: 2;
    @media (min-width: 768px) {
      margin-bottom: 0;
    }
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
.content-block__home-espacios,
.content-block__contacto {
  margin-bottom: 80px;
  margin: auto;
  .content-block__body-button-wrapper {
    text-align: center;
    padding: 20px;
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

// Component contacto
.content-block__contacto {
  .content-block__body-button-wrapper {
    background: #496581;
  }
}
// Component contacto -- end

// Component home espacios
.content-block__home-espacios {
  .content-block__body-button-wrapper {
    background: $highlight1;
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
// Component recursos_juridicos
.content-block__recursos-juridicos {
  margin-bottom: 20px;
  padding: 40px;
  background-color: #fff;
  @media (min-width: 768px) {
    max-width: 885px;
    margin-bottom: 0;
  }
  h1 {
    font-size: 2rem;
    margin: 0 0 40px 0;
  }
  .content-block__body {
    margin-bottom: 40px;
    p {
      padding: 0;
      line-height: 1.5;
      margin: 0 0 10px 0;
      font-size: 1.4rem;
    }
  }
  .content-block__btn {
    margin: 0 0 20px 0;
    padding: 15px 20px;
    &:after {
      padding: 5px;
    }
  }
}

.content-block__help-text {
  margin: 0;
}
// Component recursos_juridicos -- end

// Component reporte
.content-block__reporte {
  text-align: left;
  margin-bottom: 40px;
  h1 {
    font-size: 2.4rem;
    display: inline-block;
    margin: 0 0 40px 0;
    padding-right: 50px;
    border-right: solid 5px $highlight2;
    color: $highlight1;
   }
   p {
     font-size: 1.8rem;
   }
}
// Component reporte -- end
</style>
