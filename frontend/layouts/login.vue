<template>
  <div class="page">
    <navbar class="navbar" />
    <nuxt class="screen-center" />
    <cookies />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import navbar from "@/components/navbar.vue";
import cookies from "@/components/cookies.vue";

@Component({
  components: {
    navbar, cookies
  },
  middleware: "loaduser"
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/screen";

.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media only screen and (max-width: 600px) {
  .page {
    display: block;
  }

  .screen-center {
    padding-top: 44px;
  }
}

@media only screen and (max-height: 600px) {
  .page {
    display: block;
  }

  .screen-center {
    padding-bottom: 44px;
    padding-top: 44px;
  }
}
</style>
