<template>
  <section class="view-contacto">
    <form @submit.prevent="createContact" class="contacto__form">
      <h1 class="contacto__title">Contactanos</h1>
      <div class="input-wrapper">
        <label class="contacto__label" for="name">Nombre:</label>
        <input required class="contacto__input" type="text" v-model="name" name="name">
      </div>
      <div class="input-wrapper">
        <label class="contacto__label"for="codigo">¿Tenés código de seguimiento?</label>
        <input class="contacto__input" type="text" v-model="codigo" name="codigo">
      </div>
      <div class="input-wrapper">
        <label class="contacto__label" for="email">Correo electrónico:</label>
         <input required class="contacto__input" type="email" v-model="email" name="email">
      </div>
      <div class="input-wrapper">
        <label class="contacto__label" for="phone">Teléfono:</label>
        <input class="contacto__input" type="text" v-model="phone" name="phone">
      </div>
      <div class="input-wrapper">
        <label class="contacto__label" for="description">Mensaje:</label>
        <textarea required class="contacto__texarea" v-model="description" name="description"></textarea>
      </div>
      <button class="model__btn btn btn--fill-highlight3 btn--arrow contacto__btn" type="submit">Enviar</button>
    </form>
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
  name: 'Contacto',
  data () {
    return {
      input: {},
      description: '',
      name: '',
      phone: '',
      email: '',
      codigo: '',
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
        }
      });
      // this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables";

.view-contacto {
  background-color: #eef5fb;
  padding: 40px 20px;
}

.contacto__title {
  display: inline-block;
  margin: 0 0 40px 0;
  padding-right: 50px;
  border-right: solid 5px $highlight2;
}

.contacto__form {
  width: 100%;
  padding-bottom: 20px;
  @media (min-width: 768px) {
    margin: 0 auto;
    max-width: 700px;
    padding-bottom: 40px;
  }
}

.input-wrapper {
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
}

.contacto__texarea,
.contacto__input {
  width: 100%;
  margin-bottom: 20px;
  color: $text;
  font-family: $opensans;
  font-size: 1.4rem;
  border: solid 1px #e0e0e0;
  @media (min-width: 768px) {
    width: 400px;
  }
}

.contacto__label {
  font-size: 1.8rem;
  color: $text;
  font-weight: 700;
}

.contacto__input {
  height: 33px;
}

.contacto__texarea {
  height: 200px;
  resize: none;
}

.contacto__btn {
  float: right;
}
</style>
