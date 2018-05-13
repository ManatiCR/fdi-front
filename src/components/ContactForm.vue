<template>
  <section class="contacto-form">
    <form v-if="contactSent" @submit.prevent="createContact" class="contacto-form__form">
      <h3>Seleccione el motivo de contacto <span class="contacto-form__asterisk">*</span></h3>
      <div class="input-wrapper">
        <div class="input-wrapper-radio">
          <input
            required v-model="reasonPicked"
            type="radio"
            id="suggest-space"
            name="reason"
            value="recomendar_espacio"
          >
          <label
            class="contacto-form__label"
            for="suggest-space">
            Recomendar sitio libre de discriminación
          </label>
        </div>
        <div class="input-wrapper-radio">
          <input
            v-model="reasonPicked"
            type="radio"
            id="have-code"
            name="reason"
            value="tengo_codigo"
          >
          <label
            class="contacto-form__label"
            for="have-code">
            Tengo código de seguimiento
          </label>
        </div>
        <div class="input-wrapper-radio">
          <input
            v-model="reasonPicked"
            type="radio"
            id="radio-other"
            name="reason"
            value="otro"
          >
          <label
            class="contacto-form__label"
            for="radio-other">
            Otro
          </label>
        </div>
      </div>
      <div v-if="reasonPicked === 'recomendar_espacio'" class="input-wrapper">
        <label
          class="contacto-form__label"
          for="spaceName"
          >Nombre del lugar
        </label>
        <input
          required
          class="contacto-form__input"
          type="text"
          v-model="spaceName"
          name="spaceName"
        >
      </div>
      <div v-if="reasonPicked === 'recomendar_espacio'" class="input-wrapper">
        <label
          class="contacto-form__label"
          for="webSite">
          Sitio web
        </label>
        <input
          required
          class="contacto-form__input"
          type="url"
          v-model="webSite"
          name="webSite"
        >
      </div>
      <div v-if="reasonPicked === 'otro'" class="input-wrapper">
        <label
          class="contacto-form__label"
          for="anotherReason">
          Motivo de contacto
        </label>
        <input
          required
          class="contacto-form__input"
          type="text"
          v-model="anotherReason"
          id="anotherReason"
        >
      </div>
      <div v-if="reasonPicked === 'tengo_codigo'" class="input-wrapper">
        <label class="contacto-form__label" for="code">Código de seguimiento</label>
        <input class="contacto-form__input" type="text" v-model="code" id="code">
      </div>
      <div class="input-wrapper">
        <label
          class="contacto-form__label"
          for="name">
          Nombre<span class="contacto-form__asterisk">*</span>
        </label>
        <input
          required
          class="contacto-form__input"
          type="text"
          v-model="name"
          name="name"
        >
      </div>
      <div class="input-wrapper">
        <label class="contacto-form__label" for="email">
          Correo electrónico <span class="contacto-form__asterisk">*</span>
        </label>
        <input
          required
          class="contacto-form__input"
          type="email"
          v-model="email"
          name="email"
        >
      </div>
      <div class="input-wrapper">
        <label class="contacto-form__label" for="phone">Teléfono</label>
        <input
          class="contacto-form__input"
          type="text"
          v-model="phone"
          name="phone"
        >
      </div>
      <div class="input-wrapper">
        <label class="contacto-form__label" for="description">
          Mensaje <span class="contacto-form__asterisk">*</span>
        </label>
        <textarea
          required
          class="contacto-form__texarea"
          v-model="description"
          name="description"
        >
        </textarea>
      </div>
      <button
        class="btn btn--fill-highlight3 btn--arrow contacto-form__btn"
        type="submit">
        Enviar
      </button>
    </form>
    <div v-else class="contacto-form__successful-message">
      <p>
        Tu mensaje ha sido enviado. Pronto serás contactado por un miembro del Frente por los
        Derechos Igualitarios.
      </p>
      <router-link
        class="btn--small btn btn--fill-highlight3 btn--arrow resources__see-all"
        :to="{ name: 'home'}"
      >
        Volver al home
      </router-link>
    </div>
    <div
      @click="errorMessage = !errorMessage"
      v-if="errorMessage"
      class="contacto-form__error-message-overlay"
    ></div>
    <div v-if="errorMessage" class="contacto-form__error-message">
      <p>
        Se ha producido un error y el mensaje no pudo ser enviado. Por favor intentá de nuevo.
      </p>
      <button
        @click="errorMessage = !errorMessage"
        class="btn--small btn btn--fill-highlight3 btn--arrow contacto-form__btn"
        type="submit">
        Aceptar
      </button>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';

const CREATE_CONTACTO = gql`mutation createContacto($input: ContactoInput!) {
  createContacto(input: $input) {
    entity {
      entityId
    }
    errors
    violations {
      message
    }
  }
}`;

export default {
  name: 'ContactoForm',
  props: [
    'reason',
  ],
  data() {
    return {
      input: {},
      description: '',
      name: '',
      phone: '',
      email: '',
      code: '',
      contactSent: true,
      errorMessage: false,
      anotherReason: '',
      webSite: '',
      spaceName: '',
      reasonPicked: this.reason,
    };
  },
  methods: {
    createContact() {
      this.$apollo.mutate({
        mutation: CREATE_CONTACTO,
        variables: {
          input: {
            title: this.name,
            field_correo: this.email,
            field_telefono: this.phone,
            body: this.description,
            field_codigo_de_seguimient: this.code,
            field_motivo_de_contacto: this.reasonPicked,
            field_otro_motivo: this.anotherReason,
            field_nombre_del_sitio: this.spaceName,
            field_sitio_web: this.webSite,
          },
        },
      }).then(() => {
        this.contactSent = false;
      }).catch((error) => {
        this.errorMessage = true;
        console.error(error);
      });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.view-contacto {
  background-color: #eef5fb;
  padding: 40px 20px;
  position: relative;
}

.contacto-form__form {
  width: 100%;
  padding-bottom: 20px;
  @media (min-width: 768px) {
    max-width: 700px;
    padding-bottom: 40px;
  }
}

.contacto-form__asterisk {
  color: $highlight1;
}

.input-wrapper {
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
}

.contacto-form__texarea,
.contacto-form__input {
  width: 100%;
  margin-bottom: 20px;
  color: $text;
  font-family: $opensans;
  font-size: 1.4rem;
  border: solid 1px #e0e0e0;
  @media (min-width: 768px) {
    width: 380px;
  }
}

.contacto-form__label {
  font-size: 1.8rem;
  color: $text;
  font-weight: 700;
}

.contacto-form__input {
  height: 33px;
}

.contacto-form__texarea {
  height: 200px;
  resize: none;
}

.input-wrapper-radio {
  margin-bottom: 20px;
}

.contacto-form__btn {
  float: right;
}

.contacto-form__successful-message {
  max-width: 500px;
}

.contacto-form__error-message-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 1;
  cursor: pointer;
}

.contacto-form__error-message {
  background: #fff;
  z-index: 2;
  max-width: 400px;
  width: 90%;
  border: solid 1px #e0e0e0;
  padding: 20px;
  margin: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
}

.contacto-form__error-message p {
  background: url(.././assets/images/icons/warning.png) no-repeat;
  background-size: 33px;
  background-position: left center;
  padding-left: 53px;
}

[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  z-index: -9;
}

[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
}

[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #d2d2d2;
  border-radius: 100%;
  background: #fff;
}

[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: '';
  width: 12px;
  height: 12px;
  background: $highlight1;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 100%;
  transition: all 0.2s ease;
}

[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  transform: scale(0);
}

[type="radio"]:checked + label:after {
  opacity: 1;
  transform: scale(1);
}

</style>
