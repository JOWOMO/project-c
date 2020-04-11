<template>
  <div class="center">
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

.center {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
