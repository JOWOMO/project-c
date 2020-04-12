<template>
  <div class="center">
    <topbar />
    <nuxt class="screen-center" />
    <cookies />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import topbar from "@/components/topbar.vue";
import cookies from "@/components/cookies.vue";

@Component({
  components: {
    topbar,
    cookies
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
