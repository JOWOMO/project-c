<template>
  <div class="center">
    <navbar class="navbar" />
    <nuxt class="screen-center" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import navbar from "@/components/navbar.vue";

@Component({
  components: {
    navbar
  },
  middleware: "loaduser"
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/screen";

.center {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

// collapse the navbar
@media only screen and (max-height: 460px) {
  // .navbar {
  //   display: none;
  // }

  .center {
    display: block;
  }
}
</style>
