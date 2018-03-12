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
  letter-spacing: 1px;
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
  letter-spacing: 1px;
  color: $text;
}

strong {
  color: $text;
  font-weight: 700;
}

a {
  font-family: $opensans;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2DBCDB;
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

.button-xlarge {
  width: 263px;
  height: 74px;
  font-size: 2rem;
  padding: 24px 0;
}

.button-xlarge.button-style-border {
  padding: 20px 0;
}

.button-large {
  width: 167px;
  height: 53px;
  font-size: 2rem;
  padding: 15px 0;
}

.button-large.button-style-border {
  padding: 11px 0;
}

.button-medium {
  width: 136px;
  height: 42px;
  font-size: 1.6rem;
  padding: 12px 0;
}

.button-medium.button-style-border {
  padding: 8px 0;
}

.button-small {
  width: 106px;
  height: 35px;
  font-size: 1.4rem;
  padding: 8px 0;
}

.button-small.button-style-border {
  padding: 4px 0;
}

$styles: 'fill' 'border';
$colors: ($highlight1 "highlight1") ($highlight2 "highlight2") ($highlight3 "highlight3");

@each $color in $colors {
  @each $style in $styles {
    @if $style == 'fill' {
      .button-color-#{nth($color,2)}.button-style-#{$style} {
        color: #fff;
        background: nth($color,1);
        &:hover {
          background: darken(nth($color,1), 10%);
        }
      }
    }
    @else {
      .button-color-#{nth($color,2)}.button-style-#{$style} {
        border: 4px solid nth($color,1);
        color: $text;
        &:hover {
          background: nth($color,1);
          color: #fff;
        }
      }
    }
  }
}
</style>
