<template>
  <section class="view-contacto">
    <h1 class="contacto-form__title">Contactanos</h1>
    <contact-form></contact-form>
  </section>
</template>

<script>
import ContactForm from '../components/ContactForm.vue';
export default {
  components: {
    ContactForm,
  }
};
</script>
