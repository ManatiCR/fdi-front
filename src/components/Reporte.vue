<template>
  <div class="create-report">
    <header class="create-report__header">
    <h1>Reportá</h1>
    <h2 v-if="formStep">{{ stepTitle[formStep] }}</h2>
    </header>
    <div v-if="formStep === 0" class="create-report__step-0">
      <content-block id="reporte"></content-block>
      <button @click="gotoStep(1)">Reportá</button>
    </div>
    <div v-if="formStep === 1" class="create-report__step-1">
      <h2>Step 1</h2>
      <multiselect
      placeholder="Seleccione una categoría"
      v-model="categories"
      :options="availableCategories.categories.entities"
      track-by="entityId"
      label="entityLabel"
      :multiple="true"
      :searchable="true"
      ></multiselect>
      <multiselect
      placeholder="Seleccione una subcategoría"
      v-if="categories.length"
      v-model="subcategories"
      :options="availableCategories.subcategories.entities"
      track-by="entityId"
      label="entityLabel"
      :multiple="true"
      :searchable="true"
      ></multiselect>
      <button @click="gotoStep(2)">Continuar</button>
    </div>
    <div v-if="formStep === 2" class="create-report__step-2">
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
        <li @click="goToCurrentLocation()">Ubicación Actual</li>
        <li v-for="(place, index) in places" :key="index" @click="goToPlace(place)">{{ place.name }}</li>
      </ul>
      <button @click="gotoStep(3)">Continuar</button>
    </div>
    <div v-if="formStep === 3" class="create-report__step-3">
      <textarea v-model="reportText"></textarea>
      <button @click="gotoStep(4)">Continuar</button>

    </div>
    <div v-if="formStep === 4" class="create-report__step-4">
      <p>
        El FDI te puede brindar el apoyo y asesoría necesaria para realizar una denuncia formal.
        Este acompañamiento sería durante todo el proceso, en caso de que decidás continuar.
      </p>
      <button @click="gotoStep(4)">Sí quiero</button>
      <button @click="submitReport()">No, finalizar</button>
    </div>
    <div v-if="formStep === 5" class="create-report__step-5">
      <p>
        El FDI te puede brindar el apoyo y asesoría necesaria para realizar una denuncia formal.
        Este acompañamiento sería durante todo el proceso, en caso de que decidás continuar.
      </p>
      <input type="text" placeholder="Nombre" v-model="personName">
      <input type="email" placeholder="Correo electrónico" v-model="personEmail">
      <input type="text" placeholder="Teléfono" v-model="personPhone">
      <button @click="submitReport()">Enviar</button>
    </div>
    <div v-if="formStep === 6" class="create-report__step-6">
      <p>Guarda el siguiente código, en caso de que cambies de opinión:</p>
      <router-link :to="{ name: 'home'}">Finalizar</router-link>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import gql from 'graphql-tag';
import * as VueGoogleMaps from 'vue2-google-maps';
import Multiselect from 'vue-multiselect';
import ContentBlock from './ContentBlock.vue';

// Google Maps plugin.
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDZCo_SRzzlgUp03A1zNCLTzFM9x4eqnhk',
    libraries: 'places',
  },
});


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

const defaultLocation = {
  lat: 9.5,
  lng: -84,
}

export default {
  name: 'reporte',
  components: {
    Multiselect,
    ContentBlock,
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
        'Siempre estaremos dispuestos a ayudarte'
      ],
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
      zoom: 7,
    }
  },
  apollo: {
    availableCategories() {
      return {
        query: categoryQuery,
      }
    },
  },
  methods: {
    gotoStep(step) {
      if (step >= 0 && step <= 7) {
        this.formStep = step;
      }
    },
    goToCurrentLocation(getPlaces = false) {
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
          if (getPlaces) {
            const service = new google.maps.places.PlacesService(this.$refs.map.$mapObject);
            service.nearbySearch({
              location: this.center,
              radius: 500,
            }, (results, status) => {
              console.log('results', results);
              console.log('status', status);
              this.places = results;
            });
          }
        }, () => {
          this.locationStatus = 'unavailable';
          this.center = defaultLocation;
          this.markerPosition = defaultLocation;
        });
      }
      else {
        this.locationStatus = 'unavailable';
        this.center = defaultLocation;
        this.markerPosition = defaultLocation;
      }
    },
    goToPlace(place) {
      this.markerPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
      this.center = this.markerPosition;
      this.$refs.map.$mapObject.setZoom(17);
      this.placeName = place.name;
      this.markerDraggable = false;
    },
    markerDragged(event) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
    },
    submitPosition() {
      const msg = `Lat: ${this.markerPosition.lat} / Long: ${this.markerPosition.lng}
Name: ${this.placeName}`;
      alert(msg);
    },
  },
  mounted() {
    this.$refs.map.$mapCreated.then(() => {
      this.goToCurrentLocation(true);
    });
  }
}
</script>
