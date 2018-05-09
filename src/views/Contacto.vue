<template>
  <section class="view-contacto">
    <div class="contacto">
      <h1 class="contacto__title">Contáctanos</h1>
      <div class="contacto__content-wrapper">
        <contact-form></contact-form>
        <content-block id="contacto" class="contacto-content-block"></content-block>
      </div>
    </div>
  </section>
</template>

<script>
import ContactForm from '../components/ContactForm.vue';
import ContentBlock from '../components/ContentBlock.vue';

export default {
  components: {
    ContactForm,
    ContentBlock,
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.contacto {
  max-width: 1300px;
  margin: 0 auto;
}

.contacto__title {
  display: inline-block;
  margin: 0 0 40px 0;
  padding-right: 50px;
  border-right: solid 5px $highlight2;
}

.contacto__content-wrapper {
  @media (min-width: 1100px) {
    display: flex;
    justify-content: space-between;
  }
}
.contacto-form {
  margin: 0 auto;
  margin-bottom: 100px;
  max-width: 700px;
  @media (min-width: 1100px) {
    margin: 0;
    flex: 0 1 60%;
    flex-shrink: 1000px;
    padding-right: 20px;
  }
}
.contacto-content-block {
  margin-top: 80px;
  @media (min-width: 1100px) {
    margin-top: 0;
    flex: 0 1 40%;
  }
}

</style>
