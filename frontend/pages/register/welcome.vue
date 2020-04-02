<template>
  <div class="container">
    <div class="images">
      <img src="/icons/user.svg">
      <img src="/images/profile.jpg"> <!-- TODO: Add v-bind -->
    </div>

    <h1>Willkommen {{name}}!</h1>

    <p>Du bist ab jetzt in der Suche auffindbar. Entdecke passende Personal Partner, die deinem Profil entsprechen. Deine Kriterien kannst du jederzeit anpassen.</p>

    <div class="buttons">
      <button>Profil ansehen</button>
      <button class="primary">Personalpartner anzeigen</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
