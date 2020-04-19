<template>
  <div class="page">
    <navbar class="nav" />
    <nuxt class="screen-center" />
    <cookies />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import navbar from "@/components/pages/topbar.vue";
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
@import "@/assets/scales";

.nav {
  background-color: white;
  height: $pageHeaderHeight;
}

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
    padding-top: $gridsize;
  }
}

@media only screen and (max-height: $breakpoint_sm) {
  .page {
    display: block;
  }

  .screen-center {
    padding-bottom: $gridsize;
    padding-top: $gridsize;
  }
}
</style>
