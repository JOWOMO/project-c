<template>
  <div class="card">
    <div class="header">
      <h2>{{ name }}</h2>
      <img :src="img" alt />
    </div>
    <p class="highlighted">Suche {{ workers }} Mitarbeiter</p>

    <p>
      <img src="/icons/location.svg" />
      <span>{{ distance }} km entfernt</span>
    </p>

    <p v-for="requirement in requirements" :key="requirement" class="requirements">
      <img src="/icons/face.svg" />
      <span>{{ requirement }}</span>
    </p>

    <nuxt-link :to="link" class="green">
      <span>{{ matching }}% mit deiner Suche</span>
      <img src="/icons/arrow-left.svg" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "CompanyCard",
  props: {
    name: String,
    workers: Number,
    img: String,
    distance: Number,
    requirements: Array,
    matching: Number,
    link: String
  }
};
</script>

<style lang="scss" scoped>

</style>
