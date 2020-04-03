<template>
    <div class="container">
        <h1>Oh nein - ein Error</h1>
        <nuxt-link to="/" class="link">Schnell, nach Hause</nuxt-link>
        <p>{{ error }}</p>
    </div>
</template>
<script>
  export default {
    props: ['error'],
  }
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  link {
    margin-top: 50px;
    font-size: 20px;
  }
}
</style>
