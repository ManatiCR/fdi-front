<template>
  <div id="app">
    <header class="site-header">
      <h1 class="site-header-title">¡NO MÁS DISCRIMINACIÓN!</h1>
      <div class="site-header__nav">
        <p>Una plataforma de:</p>
        <img class="site-header__logo" src="./assets/images/logo-color.svg" alt="logo">
        <h3 @click="toggle = !toggle" class="site-header__menu-toggle">Menu</h3>
        <nav  :class="{'site-header__menu--collapsed': toggle}"  class="site-header__menu">
          <ul class="site-header__menu-list">
            <li>
              <router-link class="site-header__menu-item" :to="{ name: 'reporte'}">Reportá</router-link>
            </li>
            <li>
              <router-link class="site-header__menu-item" :to="{ name: 'derechos'}">Conocé tus derechos</router-link>
            </li>
            <li>
              <router-link class="site-header__menu-item" :to="{ name: 'recursos'}">Recursos</router-link>
            </li>
            <li>
              <router-link class="site-header__menu-item" :to="{ name: 'contacto'}">Contacto</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <router-view/>
    <footer class="site-footer">
      <img class="site-footer__logo" src="./assets/images/logo.svg" alt="logo">
      <nav class="site-footer__social">
        <h3 class="site-footer__social-title">Contacto:</h3>
        <ul class="site-footer__social-list">
          <li><a class="site-footer__social-item site-footer__twitter" target="_blank" href="https://www.facebook.com/FDIcr">Twitter</a></li>
          <li><a class="site-footer__social-item site-footer__fb" target="_blank" href="https://twitter.com/FDIcr">Facebook</a></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'simple-counter',
  data () {
    return {
      toggle: true,
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/variables";

// Google Fonts.
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

// Base Styles.

* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  margin: 0;
  padding: 0;
  font-family: $opensans;
}

h1, h2, h3 {
  color: $background3;
  font-family: $montserrat;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.4rem;
}

h3 {
  font-size: 2rem;
}

p {
  font-family: $opensans;
  line-height: 1.4;
  font-size: 1.4rem;
  color: $text;
}

strong {
  font-weight: 700;
}

a {
  font-family: $opensans;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2dbcdb;
}

li {
  font-family: $opensans;
  font-size: 1.4rem;
  color: $text;
  margin-bottom: 5px;
}

.btn {
  display: inline-block;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-family: $montserrat;
  text-decoration: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 12px 25px;
}

.btn--xlarge,
.btn--large {
  font-size: 2rem;
}

.btn--xlarge {
  padding: 24px 40px;
}

.btn--large {
  padding: 15px 35px;
}

.btn--small {
  font-size: 1.4rem;
  padding: 8px 20px;
}

.btn--arrow {
  &:after {
    content: "";
    margin-left: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
}

.btn--border-highlight1 {
  border: 4px solid $highlight1;
  color: $text;
  &:hover {
    background: $highlight1;
    color: #fff;
  }
}

.btn--fill-highlight1 {
  color: #fff;
  background: $highlight1;
  &:hover {
    background: darken($highlight1, 10%);
  }
}

.btn--fill-highlight2 {
  border: 4px solid $highlight2;
  color: $text;
  &:hover {
    background: $highlight2;
    color: #fff;
  }
}

.btn--border-highlight2 {
  color: #fff;
  background: $highlight2;
  &:hover {
    background: darken($highlight2, 10%);
  }
}

.btn--border-highlight3 {
  border: 4px solid $highlight3;
  color: $text;
  &:hover {
    background: $highlight3;
    color: #fff;
  }
}

.btn--fill-highlight3 {
  color: #fff;
  background: $highlight3;
  &:hover {
    background: darken($highlight3, 10%);
  }
}

// Footer styles.
.site-footer {
  position: relative;
  padding: 15px 50px 20px 50px;
  background: $background3;
  width: 100%;
  @media (min-width: $bp-medium) {
    padding: 15px 100px 20px 100px;
    display: flex;
    justify-content: space-between;
  }
}

.site-footer__logo {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  @media (min-width: $bp-medium) {
    margin: inherit;
  }
}

.site-footer__social-list {
  text-align: center;
  margin: 0;
  padding: 0;
  li {
    padding: 0 10px;
    display: inline-block;
    list-style: none;
  }
}

.site-footer__social-title {
  color: $highlight2;
  font-family: $opensans;
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  margin: 15px 0;
  @media (min-width: $bp-medium) {
    text-align: inherit;
    margin-left: 10px;
  }
}

.site-footer__social-item {
  display: block;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  background: url('./assets/images/icons/social-icons.svg') no-repeat 0px 0px #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  &:hover {
    background-color: $highlight2;
  }
}

.site-footer__twitter {
  background-position: 11px 12px;
}

.site-footer__fb {
  background-position: 11px -31px;
}

</style>
