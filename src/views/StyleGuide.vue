<template>
  <div class="styleguide">
    <h1 class="h1--styleguide">Styleguide</h1>
    <section class="styleguide__colors">
      <h2 class="h2--styleguide">Colors</h2>
      <div class="colors-container">
        <p class="color color--text">#4c565d</p>
        <p class="color color--highlight1">#9f2165</p>
        <p class="color color--highlight2">#ffc233</p>
        <p class="color color--highlight3">#20afb5</p>
        <p class="color color--background1">#e2e7eb</p>
        <p class="color color--background2">#d2ebe5</p>
        <p class="color color--background3">#1b2e38</p>
      </div>
    </section>
    <section class="styleguide__typography">
      <h2 class="h2--styleguide">Typography</h2>
      <h1 class="h1--styleguide-title">Montserrat/ TíTULOS</h1>
      <h1 class="h1--styleguide-body">Open Sans, cuerpo</h1>
      <h2 class="h2--styleguide">Titles</h2>
      <h1>H1: Derechos humanos fundamentales  /   3rem</h1>
      <h2>H2: Derechos humanos   /   2.4rem</h2>
      <h3>H3: Derecho a la salud  / 2rem</h3>
      <h2 class="h2--styleguide">Paragraphs</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non bibendum nisl. Phasellus vestibulum dui et congue sagittis. Morbi eros nibh, vulputate non est ac, sollicitudin blandit massa. Duis leo enim, imperdiet eget dolor sed, convallis maximus purus. Morbi quis ornare sapien, quis sollicitudin tortor. Fusce aliquet eros sed mauris mollis aliquam. Etiam at ipsum id tellus convallis scelerisque. / Open Sans, regular, 1.4rem, #4C565D</p>
      <h2 class="h2--styleguide">Content Blocks Paragraphs</h2>
      <p class="p-conten-block"><strong>El Frente por los Derechos Igualitarios (FDI) es</strong> una unión de organizaciones, colectivos y activistas independientes. Buscamos que se reconozca y garantice el goce de todos los Derechos Humanos en Costa Rica, con énfasis en los de la población de lesbianas, gays, bisexuales, personas trans e intersex. / Open Sans, regular, 1.8rem, #4C565D</p>
      <a href="#">correo@oficinadenuncias.com</a>
    </section>
    <section class="styleguide__buttons">
      <h2 class="h2--styleguide">Buttons</h2>
      <a href="#" class="button button-xlarge button-color-highlight1 button-style-border">Reportá</a>
      <input type="submit" class="button button-xlarge button-color-highlight2 button-style-border" value="Conocé tus derechos">

      <a href="#" class="button button-large button-color-highlight2 button-style-fill">Conocé más</a>
      <input type="submit" class="button button-large button-color-highlight2 button-style-fill" value="Conocé más">

      <a href="#" class="button button-medium button-color-highlight3 button-style-fill">Descargar ></a>
      <input type="submit" class="button button-medium button-color-highlight3 button-style-fill" value="Descargar >">

      <a href="#" class="button button-small button-color-highlight1 button-style-fill">Continuar ></a>
      <input type="submit" class="button button-small button-color-highlight1 button-style-fill" value="Continuar >">
      <br><br><br>
      <a href="#" class="button button-xlarge button-color-highlight1 button-style-fill">Reportá</a>
      <input type="submit" class="button button-xlarge button-color-highlight2 button-style-fill" value="Conocé tus derechos">

      <a href="#" class="button button-large button-color-highlight2 button-style-border">Conocé más</a>
      <input type="submit" class="button button-large button-color-highlight3 button-style-border" value="Conocé más">

      <a href="#" class="button button-medium button-color-highlight3 button-style-border">Descargar ></a>
      <input type="submit" class="button button-medium button-color-highlight2 button-style-border" value="Descargar >">

      <a href="#" class="button button-small button-color-highlight1 button-style-border">Continuar ></a>
      <input type="submit" class="button button-small button-color-highlight3 button-style-border" value="Continuar >">

    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables";
.styleguide {
  padding: 0 5%;
}
.colors-container {
  display: flex;
  justify-content: space-around;
}
.color {
  width: 80px;
  text-align: center;
  font-size: 1.6rem;
}
.color:before {
  content: '';
  display: block;
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.color--text:before {
  background-color: $text;
}

.color--highlight1:before {
  background-color: $highlight1;
}

.color--highlight2:before {
  background-color: $highlight2;
}

.color--highlight3:before {
  background-color: $highlight3;
}

.color--background1:before {
  background-color: $background1;
}

.color--background2:before {
  background-color: $background2;
}

.color--background3:before {
  background-color: $background3;
}
.h1--styleguide, .h2--styleguide {
  color: $highlight1;
}
.h1--styleguide-title,
.h1--styleguide-body {
  color: $text;
}
.h1--styleguide-body {
  color: $text;
  font-family: $opensans;
}
.p-conten-block {
    font-size: 1.8rem;
}
.styleguide__buttons {
  display: flex;
  flex-direction: column;
  a {
    margin-top: 20px;
  }
  input[type=submit]  {
    margin-top: 20px;
  }
}
</style>
