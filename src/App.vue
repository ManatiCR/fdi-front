<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/variables";

// Google Fonts.
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700,700i');

// Base Styles.

html {
  font-size: 62.5%;
}

body {
  font-family: $opensans;
}
</style>
