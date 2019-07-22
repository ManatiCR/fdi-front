<template>
  <div class="create-report">
    <div class="create-report__wrapper">
      <h1 v-if="formStep" class="create-report__title">Reportá</h1>
      <div class="create-report__steps-wrapper">
        <header class="create-report__header">
        <h2 v-if="formStep">{{ stepTitle[formStep] }}</h2>
        </header>
        <div v-if="formStep === 0" class="create-report__step-0">
          <content-block class="reporte" id="reporte"></content-block>
          <button
            @click="gotoStep(1)"
            class="btn create-report__btn btn--xlarge btn--border-highlight1">
            Reportá
          </button>
        </div>
        <div v-if="formStep === 1" class="create-report__step create-report__step-1">
          <div @click="categoryError = false">
            <label for="report-category" class="visually-hidden">
              Seleccione una categoría
            </label>
            <multiselect
            id="report-category"
            placeholder="Seleccione una categoría"
            select-label="Agregar"
            deselectLabel="Eliminar"
            selectedLabel="Seleccionada"
            v-model="categories"
            :options="availableCategories.categories.entities"
            track-by="entityId"
            label="entityLabel"
            :multiple="true"
            :searchable="true"
            ></multiselect>
            <p class="errorValidate" v-if="categoryError">{{completeFieldMessage}}</p>
            <label for="report-subcategory" class="visually-hidden" v-if="categories.length">
              Seleccione una subcategoría
            </label>
            <multiselect
            id="report-subcategory"
            class="create-report__step-1-subcategory-select"
            placeholder="Seleccione una subcategoría"
            select-label="Agregar"
            deselectLabel="Eliminar"
            selectedLabel="Seleccionada"
            v-if="categories.length"
            v-model="subcategories"
            :options="availableCategories.subcategories.entities"
            track-by="entityId"
            label="entityLabel"
            :multiple="true"
            :searchable="true"
            ></multiselect>
          </div>
          <button
            @click="gotoStep(2)"
            class="btn btn--fill-highlight1 btn--arrow">
            Continuar
          </button>
        </div>
        <div v-if="formStep === 2" class="create-report__step create-report__step-2">
          <div class="create-report__step-2-search">
            <label for="report-search-place" class="visually-hidden">
              Buscar un lugar
            </label>
            <input
              id="report-search-place"
              class="create-report__step-2-search-input"
              type="text" placeholder="Buscar un lugar"
              v-model="searchText"
            >
            <button class="btn btn--small btn--fill-highlight1" @click="searchPlace()">
              Buscar
            </button>
            <p v-if="noSearchResults">No se encontraron resultados</p>
          </div>
          <div class="create-report__step-2-content">
            <gmap-map
            ref="map"
            :center="center"
            :zoom="zoom"
            style="width: 500px; height: 300px"
            >
              <gmap-marker
              v-if="locationStatus !== 'unset'"
              :position="markerPosition"
              :draggable="markerDraggable"
              @dragend="markerDragged"
              ></gmap-marker>
            </gmap-map>
            <ul>
              <li @click="goToCurrentLocation()" :class="{active: selectedPlace === 0}">
                {{ currentLocationText }}
              </li>
              <li
                v-for="(place, index) in places"
                :key="index"
                @click="goToPlace(place, index)"
                :class="{active: selectedPlace === index + 1}"
              >
                {{ place.name }}
              </li>
            </ul>
          </div>
          <button
            @click="gotoStep(3)"
            class="btn btn--fill-highlight1
            btn--arrow">
            Continuar
          </button>
        </div>
        <div v-if="formStep === 3" class="create-report__step create-report__step-3">
          <label for="report-description" class="visually-hidden">
            Escribí tu reporte
          </label>
          <textarea
            id="report-description"
            v-bind:class="{ reportTextError: reportTextError }"
            @click="reportTextError = false"
            v-model="reportText">
          </textarea>
          <p class="errorValidate" v-if="reportTextError">{{completeFieldMessage}}</p>
          <button
            @click="gotoStep(4)"
            class="btn btn--fill-highlight1 btn--arrow">
            Continuar
          </button>
        </div>
        <div v-if="formStep === 4" class="create-report__step create-report__step-4">
          <p>
            El FDI te puede brindar el apoyo y asesoría necesaria para realizar una denuncia formal.
            Este acompañamiento sería durante todo el proceso, en caso de que decidás continuar.
          </p>
          <div class="create-report__step-4-btn-wrapper">
            <button
              @click="gotoStep(5)"
              class="btn btn--fill-highlight1">
              Sí quiero
            </button>
            <button
              @click="gotoStep(6, false)"
              class="btn create-report__btn-end btn--fill-background3">
              No, finalizar
            </button>
            <p v-if="submittingReport" class="create-report__submitting">
              Enviando reporte
            </p>
          </div>
        </div>
        <div v-if="formStep === 5" class="create-report__step create-report__step-5">
          <p>
            El FDI te puede brindar el apoyo y asesoría necesaria para realizar una denuncia formal.
            Este acompañamiento sería durante todo el proceso, en caso de que decidás continuar.
          </p>
          <label for="report-person-name" class="visually-hidden">
            Nombre
          </label>
          <input @click="personNameError = false"
           v-bind:class="{ personNameError: personNameError }"
           type="text" placeholder="Nombre" v-model="personName" id="report-person-name">
          <p class="errorValidate" v-if="personNameError">{{completeFieldMessage}}</p>
          <label for="report-person-email" class="visually-hidden">
            Correo electrónico
          </label>
          <input @click="personEmailError = false, personInvalidEmail = false"
          v-bind:class="{ personEmailError: personEmailError }"
          type="email" placeholder="Correo electrónico" v-model="personEmail" id="report-person-email">
          <p class="errorValidate" v-if="personEmailError">{{completeFieldMessage}}</p>
          <p class="errorValidate" v-if="personInvalidEmail">Ingresá un correo válido</p>
          <label for="report-person-phone" class="visually-hidden">
            Teléfono
          </label>
          <input  type="text" placeholder="Teléfono" v-model="personPhone" id="report-person-phone">
          <button @click="gotoStep(6, true)" class="btn btn--fill-highlight1">Enviar</button>
          <div>
            <p v-if="submittingReport" class="create-report__submitting">
              Enviando reporte
            </p>
          </div>
          <a href="#" @click.prevent="gotoStep(6, false)">No quiero</a>
        </div>
        <div v-if="formStep === 6" class="create-report__step create-report__step-6">
          <p>
            Guardá este código, es el número de identificación de tu reporte.
            Lo necesitarás en caso de que necesités contactarnos.</p>
          <p class="create-report__follow-up">
            {{ followUpCode }}
          </p>
          <router-link
            :to="{ name: 'home'}"
            class="btn btn--fill-highlight1">
            Finalizar
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="showStepsIndicator" class="create-report__indicator-wrapper">
      <ul class="create-report__indicator-list">
        <li
          :class="{'create-report__indicator-item-active': indicatorActive === 1,
          'create-report__indicator-item-visited': stepsDone[1]}"
          class="create-report__indicator-item">
          <button
            v-if="formStep > 1 "
            @click="gotoStep(1)"
            class="create-report__indicator-btn">
            1
          </button>
          <span v-if="formStep <= 1"
            class="create-report__indicator-btn create-report__indicator-span">
            1
          </span>
        </li>
        <li
          :class="{'create-report__indicator-item-active': indicatorActive === 2,
          'create-report__indicator-item-visited': stepsDone[2]}"
          class="create-report__indicator-item">
          <button
            v-if="formStep > 2 "
            @click="gotoStep(2)"
            class="create-report__indicator-btn">
            2
          </button>
          <span v-if="formStep <= 2"
            class="create-report__indicator-btn create-report__indicator-span">
            2
          </span>
        </li>
        <li
          :class="{'create-report__indicator-item-active': indicatorActive === 3,
          'create-report__indicator-item-visited': stepsDone[3]}"
          class="create-report__indicator-item">
          <button
            v-if="formStep > 3 "
            @click="gotoStep(3)"
            class="create-report__indicator-btn">
            3
          </button>
          <span v-if="formStep <= 3"
            class="create-report__indicator-btn create-report__indicator-span">
            3
          </span>
        </li>
        <li
          :class="{'create-report__indicator-item-active': indicatorActive === 4,
          'create-report__indicator-item-visited': stepsDone[4]}"
          class="create-report__indicator-item">
          <button
            v-if="formStep > 4 "
            @click="gotoStep(4)"
            class="create-report__indicator-btn">
            4
          </button>
          <span v-if="formStep <= 4"
            class="create-report__indicator-btn create-report__indicator-span">
            4
          </span>
        </li>
        <li
          :class="{'create-report__indicator-item-active': indicatorActive === 5,
          'create-report__indicator-item-visited': stepsDone[5]}"
          class="create-report__indicator-item">
          <button
            v-if="formStep > 5 "
            @click="gotoStep(5)"
            class="create-report__indicator-btn">
            5
          </button>
          <span v-if="formStep <= 5"
            class="create-report__indicator-btn create-report__indicator-span">
            5
          </span>
        </li>
      </ul>
    </div>
    <div
      @click="errorMessage = !errorMessage"
      v-if="errorMessage"
      class="contacto-form__error-message-overlay">
    </div>
    <div v-if="errorMessage" class="contacto-form__error-message">
      <p>
        Se ha producido un error y el reporte no pudo ser enviado. Por favor intentá de nuevo.
      </p>
      <button
        @click="errorMessage = !errorMessage"
        class="btn--small btn btn--fill-highlight3 btn--arrow contacto-form__btn"
        type="submit">
        Aceptar
      </button>
    </div>
  </div>
</template>

<script>
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Vue from 'vue';
import gql from 'graphql-tag';
import { load, Map, Marker } from 'vue2-google-maps';
import Multiselect from 'vue-multiselect';
import ContentBlock from './ContentBlock.vue';

const categoryQuery = gql`query {
  categories: taxonomyTermQuery(
    filter: {
      conditions: [
        {
          field: "vid"
          operator: EQUAL
          value: ["categorias_de_reporte"]
        }
      ]
    }
  ) {
    entities {
      entityLabel
      entityId
    }
  }
  subcategories: taxonomyTermQuery(
    filter: {
      conditions: [
        {
          field: "vid"
          operator: EQUAL
          value: ["subcategorias_de_reporte"]
        }
      ]
    }
  ) {
    entities {
      entityLabel
      entityId
    }
  }
}`;

const reportMutation = gql`mutation ($input: ReporteInput!) {
  createReporte(input: $input) {
    entity {
      entityId
      fieldCodigoDeSeguimient
    }
    errors
    violations {
      message
    }
  }
}`;

const defaultLocation = {
  lat: 9.5,
  lng: -84,
};

export default {
  name: 'reporte',
  components: {
    Multiselect,
    ContentBlock,
    'gmap-map': Map,
    'gmap-marker': Marker,
  },
  data() {
    return {
      formStep: 0,
      stepTitle: [
        '',
        '¿Qué tipo de discriminación querés reportar?',
        '¿Dónde ocurrió?',
        'Contanos qué sucedió:',
        '¿Querés asesoría o apoyo?',
        '¿Querés asesoría o apoyo?',
        'Siempre estaremos dispuestos a ayudarte',
      ],
      availableCategories: {},
      categories: [],
      subcategories: [],
      reportText: '',
      personName: '',
      personEmail: '',
      personPhone: '',
      center: defaultLocation,
      places: [],
      markerPosition: {},
      markerDraggable: false,
      placeName: '',
      locationStatus: 'unset',
      currentLocationText: 'Obteniendo ubicación...',
      submittingReport: false,
      followUpCode: '',
      selectedPlace: 0,
      searchText: '',
      zoom: 7,
      noSearchResults: false,
      completeFieldMessage: 'Completá este campo para continuar.',
      errorMessage: false,
      categoryError: false,
      reportTextError: false,
      personEmailError: false,
      personInvalidEmail: false,
      personNameError: false,
      showStepsIndicator: false,
      indicatorActive: 1,
      stepsDone: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
    };
  },
  apollo: {
    availableCategories() {
      return {
        query: categoryQuery,
        update(data) {
          return data;
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
      };
    },
  },
  mounted() {
    // Loads Google Maps plugin if not loaded yet.
    if (typeof google === 'undefined') {
      load({
        key: 'AIzaSyDZCo_SRzzlgUp03A1zNCLTzFM9x4eqnhk',
        libraries: 'places',
      });
    }
  },
  methods: {
    validateFields(step) {
      switch (step) {
        case 2: {
          if (this.categories.length) {
            return true;
          }
          this.categoryError = true;
          return false;
        }
        case 4: {
          if (this.reportText === '') {
            this.reportTextError = true;
            return false;
          }
          return true;
        }
        case 6: {
          if (this.personName === '' || this.personEmail === '') {
            if (this.personName === '') {
              this.personNameError = true;
            }
            if (this.personEmail === '') {
              this.personEmailError = true;
            }
            return false;
          } else if (
            this.personEmail.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
            return true;
          }
          this.personInvalidEmail = true;
          return false;
        }
        default:
          break;
      }
      return false;
    },
    gotoStep(step, args) {
      this.showStepsIndicator = true;
      switch (step) {
        case 1:
        case 3:
        case 5: {
          this.indicatorActive = step;
          this.stepsDone[step - 1] = true;
          this.formStep = step;
          break;
        }
        case 2: {
          if (this.validateFields(step)) {
            this.indicatorActive = step;
            this.stepsDone[step - 1] = true;
            this.formStep = step;
            Vue.nextTick(() => {
              this.$refs.map.$mapCreated.then(() => {
                this.goToCurrentLocation(true);
              });
            });
          }
          break;
        }
        case 4: {
          if (this.validateFields(step)) {
            this.indicatorActive = step;
            this.stepsDone[step - 1] = true;
            this.formStep = step;
          }
          break;
        }
        case 6: {
          let sendReport = true;
          if (args) {
            sendReport = this.validateFields(step);
          }

          if (sendReport) {
            this.indicatorActive = step - 1;
            this.stepsDone[step - 2] = true;
            const asksSupport = args ? 'si' : 'no';
            this.submittingReport = true;
            const report = {
              title: this.personName ? this.personName : 'Anónimo',
              field_correo: this.personEmail,
              body: this.reportText,
              field_subcategoria_reporte:
                this.subcategories.map(item => parseInt(item.entityId, 10)),
              field_categoria_reporte: this.categories.map(item => parseInt(item.entityId, 10)),
              field_ubicacion: [this.markerPosition.lat, this.markerPosition.lng],
              field_solicita_asesoria_o_apoyo: asksSupport,
              field_lugar: this.placeName,
            };
            console.log(report);
            this.$apollo.mutate({
              mutation: reportMutation,
              variables: {
                input: report,
              },
            }).then((data) => {
              console.log(data);
              this.followUpCode = data.data.createReporte.entity.fieldCodigoDeSeguimient;
              console.log(this.followUpCode);
              if (!this.followUpCode) {
                this.reportError = true;
              }
              this.submittingReport = false;
              this.formStep = step;
            }).catch((error) => {
              this.errorMessage = true;
              console.log(error);
              this.reportError = true;
              this.submittingReport = false;
            });
          }
          break;
        }
        default:
          break;
      }
    },
    goToCurrentLocation() {
      this.selectedPlace = 0;
      this.currentLocationText = 'Obteniendo ubicación...';
      this.places = [];
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markerPosition = this.center;
          this.zoom = 17;
          this.locationStatus = 'acquired';
          this.markerDraggable = true;
          this.placeName = '';
          this.currentLocationText = 'Ubicación actual';
          /* global google */
          const service = new google.maps.places.PlacesService(this.$refs.map.$mapObject);
          service.nearbySearch({
            location: this.center,
            radius: 500,
          }, (results, status) => {
            console.log(status); // TODO: Use this to add extra error checking.
            if (results.length > 10) {
              this.places = results.slice(0, 10);
            } else {
              this.places = results;
            }
          });
        }, () => {
          this.currentLocationText = 'No se puede obtener la ubicación actual';
          this.locationStatus = 'unavailable';
          this.center = defaultLocation;
          this.markerPosition = defaultLocation;
        });
      } else {
        this.currentLocationText = 'No se puede obtener la ubicación actual';
        this.locationStatus = 'unavailable';
        this.center = defaultLocation;
        this.markerPosition = defaultLocation;
      }
    },
    goToPlace(place, index) {
      this.selectedPlace = index + 1;
      this.markerPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.center = this.markerPosition;
      this.$refs.map.$mapObject.setZoom(17);
      this.placeName = place.name;
      this.markerDraggable = false;
    },
    markerDragged(event) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    },
    searchPlace() {
      if (this.searchText) {
        /* global google */
        const service = new google.maps.places.PlacesService(this.$refs.map.$mapObject);
        const bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(8, -86),
          new google.maps.LatLng(11.25, -82.5),
        );
        const request = {
          query: this.searchText,
          bounds,
        };
        service.textSearch(request, (results, status) => {
          if (status === 'OK') {
            this.noSearchResults = false;
            if (results.length > 10) {
              this.places = results.slice(0, 10);
            } else {
              this.places = results;
            }
          }
          if (status === 'ZERO_RESULTS') {
            this.noSearchResults = true;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.create-report {
  padding: 40px 20px;
  .btn {
    display: block;
    margin: 0 auto;
    @media (min-width: 1000px) {
      margin: 0;
      display: inline-block;
    }
  }
  @media (min-width: 1000px) {
    padding: 80px;
  }
}

.create-report__wrapper {
  background: #eef5fb;
  padding: 40px 20px;
  max-width: 1100px;
  margin: 0 auto;
  @media (min-width: 1000px) {
    padding: 60px;
    display: flex;
    align-items: flex-start;
  }
}

.create-report__wrapper .create-report__btn {
  padding: 20px 60px;
  @media (min-width: 1000px) {
    padding: 20px 80px;
    margin-left: 40px;
  }
}

.create-report__steps-wrapper {
  flex: 0 1 800px;
  h2 {
    margin: 0 0 20px 0;
  }
  @media (min-width: 1000px) {
    margin-left: 60px;
  }
}

.create-report__title {
  font-size: 2.4rem;
  display: inline-block;
  margin: 0 0 40px 0;
  padding-right: 50px;
  border-right: solid 5px $highlight2;
  color: $highlight1;
}

// Multiselect
.multiselect {
  max-width: 320px;
  width: 100%;
  border: solid 1px #e0e0e0;
  @media (min-width: 1000px) {
    width: 300px;
  }
}

.create-report__step-1-subcategory-select {
  margin-top: 40px;
}

.multiselect__tag,
.multiselect__tag-icon {
  background: $highlight3;
  border-radius: 2px;
}

.multiselect__tags {
  border-radius: 0;
  border: none;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: darken($highlight3, 10%);
}

.multiselect__option--highlight {
  background: $highlight3;
  &:after {
    background: $highlight3;
  }
}

// Multiselect --end

.create-report__step-1 .btn {
  margin-top: 40px;
}

.create-report__step-0 {
  text-align: center;
  @media (min-width: 1000px) {
    display: flex;
    align-items: center;
  }
}

.create-report__step-2-search {
  max-width: 500px;
  margin: 0 auto 20px auto;
  @media (min-width: 425px) {
    display: flex;
    align-items: flex-start;
  }
  @media (min-width: 1000px) {
    margin: 0 0 20px 0;
  }
  input[type="text"] {
    font-size: 1.4rem;
    margin-right: 5px;
    padding: 8px;
    width: 100%;
    flex: 3;
    color: $text;
  }
  p {
    display: inline-block;
    margin-left: 20px;
  }
  .btn {
    flex: 1;
    width: 100%;
    margin-top: 20px;
    @media (min-width: 425px) {
      margin-top: 0;
      margin-left: 15px;
    }
  }
}

.create-report__step-2-search-input {
  border: solid 1px #e0e0e0;
  &::placeholder {
    font-style: italic;
    color: darken(#e0e0e0, 20%);
  }
}

.create-report__step-2-content {
  margin-bottom: 20px;
  .vue-map-container {
    margin: 0 auto 20px auto;
    max-width: 100%;
    height: auto;
    width: 800px;
    @media (min-width: 1000px) {
      flex: 0 0 500px;
    }
  }
  ul {
    margin: 0 auto;
    max-width: 500px;
    background: #fff;
    padding: 0;
    list-style: none;
    height: 300px;
    overflow: hidden;
    scroll-behavior: smooth;
    overflow-y: scroll;
    border: 1px solid #e0e0e0;
    @media (min-width: 1000px) {
      margin-left: 20px;
      flex: 1 1 auto;
    }
  }
  li {
    padding: 12px 15px;
    border-bottom: 1px solid lightgray;
    margin: 0;
    cursor: pointer;
    &:last-child {
      border: none;
    }
    &.active {
      background-color: $highlight3;
      color: #fff;
    }
  }
  @media (min-width: 1000px) {
    display: flex;
  }
}

.create-report__step-3 {
  textarea {
    border: 1px solid #e8e8e8;
    max-width: 100%;
    width: 100%;
    min-height: 200px;
    color: $text;
    font-family: $opensans;
    line-height: 1.5;
    font-size: 1.6rem;
  }
  .btn {
    margin-top: 40px;
  }
}

.create-report__step-4,
.create-report__step-5,
.create-report__step-6 {
  p {
    margin: 0 0 20px 0;
    line-height: 1.5;
    font-size: 1.6rem;
  }
}

.create-report__step-4,
.create-report__step-5 {
  .create-report__submitting {
    display: inline-block;
  }
}

.create-report__submitting {
  background: url(.././assets/images/loading.gif) no-repeat;
  background-size: 50px;
  padding-right: 50px;
  background-position: right -15px;
}

.create-report__step-4-btn-wrapper {
  .btn {
    width: 151px;
    margin-bottom: 20px;
    @media (min-width: 500px) {
      display: inline-block;
    }
  }
  @media (min-width: 500px) {
    .btn.create-report__btn-end {
      margin-left: 20px
    }
  }
}

.create-report__step-5 {
  input {
    height: 33px;
    border: solid 1px #e0e0e0;
    padding-left: 10px;
    font-size: 1.6rem;
  }
  input, .btn {
    display: block;
    max-width: 360px;
    width: 100%;
    margin: 20px auto 0 auto;
    @media (min-width: 500px) {
      margin: 30px 0 0 0;
    }
  }
  .btn {
    display: inline-block;
    max-width: 180px;
    margin-bottom: 20px;
  }
}

.create-report__step-6 {
  .create-report__follow-up {
    background-color: #fff;
    border: 1px solid lightgray;
    font-size: 4rem;
    max-width: 300px;
    padding: 30px 0;
    text-align: center;
  }
}

.categoryError,
textarea.reportTextError,
.personEmailError,
input.personNameError {
  border: 1px solid $highlight1;
  box-shadow: 0 0 1px $highlight1;
}

p.errorValidate {
  color: $highlight1;
  position: absolute;
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
}

.create-report__indicator-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  background: #b1cde5;
  padding: 10px 0;
  @media (min-width: 1000px) {
    padding-left: 275px;
  }
}

.create-report__indicator-list {
  list-style: none;
  margin: 0 auto;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  max-width: 500px;
  @media (min-width: 1000px) {
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }
}

.create-report__indicator-item {
  cursor: pointer;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  transition: all 0.5s ease;
  @media (min-width: 1000px) {
    margin-right: 20px;
  }
}

.create-report__indicator-span {
  text-align: center;
  display: block;
  padding-top: 9px;
}

.create-report__indicator-btn {
  cursor: pointer;
  width: 100%;
  height: 100%;
  color: #315b71;
  font-weight: 700;
  font-size: 1.6rem;
  background: none;
  border: none;
}

.create-report__indicator-item-visited {
  background-color: #1b2e38;
  .create-report__indicator-btn {
    color: #fff;
  }
}

.create-report__indicator-item-active {
  background-color: #1b2e38;
  transition: all 0.5s ease;
  .create-report__indicator-btn {
    color: $highlight2;
    transition: all 0.5s ease;
  }
}

</style>
