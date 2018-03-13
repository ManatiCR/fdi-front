<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/variables";

// Google Fonts.
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i');
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

// Base Styles.

html {
  font-size: 62.5%;
}

body {
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

ul {
  font-family: $opensans;
  font-size: 1.4rem;
  color: $text;
}

.button {
  display: inline-block;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-family: $montserrat;
  box-sizing: border-box;
  text-decoration: none;
  color: #fff;
  font-size: 2rem;
}

.button--xlarge {
  font-size: 2rem;
  padding: 24px 40px;
}

.button--large {
  font-size: 2rem;
  padding: 15px 20px;
}

.button--medium {
  font-size: 1.6rem;
  padding: 12px 15px;
}

.button--small {
  font-size: 1.4rem;
  padding: 8px 10px;
}

.button--small.button--style-fill {
  &:after {
    content: "";
    margin-left: 4px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
}

.button--medium.button--style-fill {
  &:after {
    content: "";
    margin-left: 4px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
}

.button--color-highlight1.button--style-border {
  border: 4px solid $highlight1;
  color: $text;
  &:hover {
    background: $highlight1;
    color: #fff;
  }
}

.button--color-highlight1.button--style-fill {
  color: #fff;
  background: $highlight1;
  &:hover {
    background: darken($highlight1, 10%);
  }
}

.button--color-highlight2.button--style-border {
  border: 4px solid $highlight2;
  color: $text;
  &:hover {
    background: $highlight2;
    color: #fff;
  }
}

.button--color-highlight2.button--style-fill {
  color: #fff;
  background: $highlight2;
  &:hover {
    background: darken($highlight2, 10%);
  }
}

.button--color-highlight3.button--style-border {
  border: 4px solid $highlight3;
  color: $text;
  &:hover {
    background: $highlight3;
    color: #fff;
  }
}

.button--color-highlight3.button--style-fill {
  color: #fff;
  background: $highlight3;
  &:hover {
    background: darken($highlight3, 10%);
  }
}


</style>
