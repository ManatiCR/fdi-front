<template>
  <div class="styleguide">
    <h1>Styleguide</h1>
    <section class="styleguide__colors">
      <h2>Colors</h2>
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
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables";
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
</style>
