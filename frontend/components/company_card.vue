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
.card {
  width: 500px;
  background: #00000005;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 20px;
  display: inline-block;
  margin: 30px;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  img {
    position: relative;
    top: 0;
    right: 0;
    border-radius: 50%;
    object-fit: cover;
    width: 50px;
    height: 50px;
  }

  p {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 10px;
    margin: 5px;

    img {
      height: 100%;
      width: auto;
    }
  }

  .requirements {
    background: deepskyblue;
    border-radius: 20px;
    color: white;

    img {
      height: 100%;
      width: auto;
    }
  }

  .highlighted {
    color: deepskyblue;
    display: block;
    background: none;
  }

  .green {
    color: green;
    background: none;
    margin-top: 10px;
    text-decoration: none;
    display: block;
  }
}

@media only screen and (max-width: 786px) {
  .card {
    width: 80vw;
    text-align: left;
  }
}
</style>
