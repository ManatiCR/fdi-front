<template>
  <div class="view-styleguide">
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
      <p class="p--content-block"><strong>El Frente por los Derechos Igualitarios (FDI) es</strong> una unión de organizaciones, colectivos y activistas independientes. Buscamos que se reconozca y garantice el goce de todos los Derechos Humanos en Costa Rica, con énfasis en los de la población de lesbianas, gays, bisexuales, personas trans e intersex. / Open Sans, regular, 1.8rem, #4C565D</p>
      <a href="#">correo@oficinadenuncias.com</a>

      <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>Quisque semper odio nec justo elementum pulvinar.</li>
        <li>Cras bibendum dolor sit amet arcu scelerisque vehicula.</li>
        <li>Donec euismod elit nec risus porta iaculis.</li>
        <li>Morbi maximus eros sed elit consequat consectetur.</li>
      </ul>
    </section>
    <section class="styleguide__buttons">
      <h2 class="h2--styleguide">Buttons</h2>
      <p>The default button size is medium.</p>
      <h3>Available classes</h3>
      <ul>
        <li>btn</li>
        <li>btn--xlarge</li>
        <li>btn--large</li>
        <li>btn--small</li>
        <li>btn--fill-highlight1</li>
        <li>btn--fill-highlight2</li>
        <li>btn--fill-highlight3</li>
        <li>btn--border-highlight1</li>
        <li>btn--border-highlight2</li>
        <li>btn--border-highlight3</li>
        <li>btn--arrow</li>
      </ul>
      <div>
        <a href="#" class="btn btn--xlarge btn--border-highlight1">Reportá</a>
        <button type="button" class="btn btn--xlarge btn--border-highlight2">Conocé tus derechos</button>

        <a href="#" class="btn btn--large btn--fill-highlight2">Conocé más</a>
        <button type="button" class="btn btn--large btn--fill-highlight2">Conocé más</button>

        <a href="#" class="btn btn--fill-highlight3 btn--arrow">Descargar pero muy largo</a>
        <button type="button" class="btn btn--fill-highlight3 btn--arrow">Descargar</button>

        <a href="#" class="btn btn--small btn--fill-highlight1 btn--arrow">Continuar</a>
        <button type="button" class="btn btn--small btn--fill-highlight1 btn--arrow">Continuar botón pequeño pero largo</button>
      </div>
      <div>
        <a href="#" class="btn btn--xlarge btn--fill-highlight1">Reportá</a>
        <button type="button" class="btn btn--xlarge btn--fill-highlight2">Conocé tus derechos</button>

        <a href="#" class="btn btn--large btn--border-highlight2">Conocé más</a>
        <button type="button" class="btn btn--large btn--border-highlight3">Conocé más</button>

        <a href="#" class="btn btn--border-highlight3">Descargar</a>
        <button type="button" class="btn btn--border-highlight2">Descargar</button>

        <a href="#" class="btn btn--small btn--border-highlight1">Continuar</a>
        <button type="button" class="btn btn--small btn--border-highlight3">Continuar</button>
      </div>
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

.p--content-block {
  font-size: 1.8rem;
  line-height: 1.5;
}

h1,h2,h3,p,section,ul {
  margin: 30px 0;
}

ul {
  padding-left: 30px;
}

.styleguide__buttons {
  div {
    margin-top: 30px;
  }
  a {
    margin-left: 20px;
    margin-top: 20px;
  }
  button {
    margin-left: 20px;
    margin-top: 20px;
  }
  ul {
    columns: 3;
  }
}
</style>
