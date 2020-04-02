<template>
  <div class="container">
    <div class="images">
      <img src="/images/profile.jpg"> <!-- TODO: Add v-bind -->
      <img src="/icons/user.svg">
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
.container {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-rows: 5fr 1fr 1fr 1fr;

  .images {
    display: flex;
    flex-direction: row;
    justify-content: center;

    img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      border: 3px solid #00000010;
      object-fit: cover;

      &:nth-of-type(odd) {
        transform: translateX(20px);
      }
      &:nth-of-type(even) {
        transform: translateX(-20px);
        background: #fff;
      }
    }
  }

  p {
    width: 40%;
    justify-self: center;
    text-align: center;
  }

  .buttons {
    justify-self: center;

    button {
      width: 250px;
    }
  }
}

@media only screen and (max-width: 765px) {
  .container {
    grid-template-rows: 1fr .5fr 1fr 1fr;
    width: 100vw;
  }
  img {
    width: 150px !important;
    height: 150px !important;
  }

  .buttons {
    text-align: center;
  }
}
</style>
