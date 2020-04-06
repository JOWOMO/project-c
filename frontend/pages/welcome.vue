<template>
  <div class="container">
    <div class="images">
      <img src="/icons/user.svg" />
      <img src="/images/profile.jpg" />
    </div>

    <h1>Willkommen {{name}}!</h1>
    <p>Du bist ab jetzt in der Suche auffindbar. Entdecke passende Personal Partner, die deinem Profil entsprechen. Deine Kriterien kannst du jederzeit anpassen.</p>

    <div class="buttons">
      <button class="secondary" @click.prevent="profile">Profil ansehen</button>
      <button class="primary" @click.prevent="dashboard">Personalpartner anzeigen</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";

@Component
export default class extends Vue {
  @Meta
  head() {
    return {
      title: "Wikommen",
      meta: [{ hid: "description", name: "description", content: "" }]
    };
  }

  profile() {
    this.$router.push("/register/team");
  }

  dashboard() {
    this.$router.push("/dashboard");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/colors";

.container {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  overflow-y: auto;
  padding: 50px;
}

h1 {
  padding-top: 81px;
  padding-bottom: 21px;
}

p {
  color: #7b7b7b;
  max-width: 600px;
  text-align: center;
}

.buttons {
  padding-top: 76px;

  button {
    width: 260px;
    margin-left: 24px;
  }
}

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
    }
  }
}

@media only screen and (max-width: 765px) {
  .images {
    img {
      width: 150px !important;
      height: 150px !important;
    }
  }

  .buttons {
    text-align: center;

    button {
      margin-top: 12px;
    }
  }
}
</style>
