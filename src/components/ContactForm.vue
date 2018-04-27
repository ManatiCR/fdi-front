<template>
  <section class="contacto-form">
    <form v-if="contactSent" @submit.prevent="createContact" class="contacto-form__form">
      <div class="input-wrapper">
        <label class="contacto-form__label" for="name">Nombre <span class="contacto-form__asterisk">*</span></label>
        <input required class="contacto-form__input" type="text" v-model="name" name="name">
      </div>
      <div class="input-wrapper">
        <label class="contacto-form__label"for="codigo">¿Tenés código de seguimiento?</label>
        <input class="contacto-form__input" type="text" v-model="codigo" name="codigo">
      </div>
      <div class="input-wrapper">
        <label class="contacto-form__label" for="email">Correo electrónico <span class="contacto-form__asterisk">*</span></label>
        <input required class="contacto-form__input" type="email" v-model="email" name="email">
      </div>
      <div class="input-wrapper">
        <label class="contacto-form__label" for="phone">Teléfono</label>
        <input class="contacto-form__input" type="text" v-model="phone" name="phone">
      </div>
      <div class="input-wrapper">
        <label class="contacto-form__label" for="description">Mensaje <span class="contacto-form__asterisk">*</span></label>
        <textarea required class="contacto-form__texarea" v-model="description" name="description"></textarea>
      </div>
      <button class="btn btn--fill-highlight3 btn--arrow contacto-form__btn" type="submit">Enviar</button>
    </form>
    <div v-else class="contacto-form__successful-message">
      <p>Tu mensaje ha sido enviado. Pronto serás contactado por un miembro del Frente por los derechos igualitarios.</p>
      <router-link class="btn--small btn btn--fill-highlight3 btn--arrow resources__see-all" :to="{ name: 'home'}">
        Volver al home
      </router-link>
    </div>
    <div v-if="errorMessage" class="contacto-form__error-message">
      <p>
        Se ha producido un error y el mensaje no pudo ser enviado. Por favor intenta de nuevo.
      </p>
      <button @click="errorMessage = !errorMessage" class="btn--small btn btn--fill-highlight3 btn--arrow contacto-form__btn" type="submit">Aceptar</button>
    </div>
  </section>
</template>

<script>
import gql from "graphql-tag";

const CREATE_CONTACTO = gql`
mutation createContacto($input: ContactoInput!) {
  createContacto(input: $input) {
    entity {
      entityId
    }
    errors
    violations {
      message
    }
  }
}
`

export default {
  name: 'ContactoForm',
  data () {
    return {
      input: {},
      description: '',
      name: '',
      phone: '',
      email: '',
      codigo: '',
      contactSent: true,
      errorMessage: false,
    }
  },
  methods: {
    createContact () {
      this.$apollo.mutate({
        mutation: CREATE_CONTACTO,
        variables: {
          input: {
            title: this.name,
            field_correo: this.email,
            field_telefono: this.phone,
            body: this.description,
            field_codigo_de_seguimient: this.codigo
          },
        },
      }).then((data) => {
        this.contactSent = false;
      }).catch((error) => {
        this.errorMessage = true;
        console.error(error)
      });
    }
  }
}
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

.contacto-form__btn {
  float: right;
}

.contacto-form__successful-message {
  max-width: 500px;
}

.contacto-form__error-message {
  background: #fff;
  max-width: 400px;
  width: 90%;
  border: solid 1px #e0e0e0;
  padding: 20px;
  margin: 0;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
