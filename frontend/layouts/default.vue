<template>
  <div class="center">
    <navbar class="navbar" />
    <nuxt class="screen-center" />
    <cookie></cookie>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import navbar from "@/components/navbar.vue";
import cookie from '@/components/cookies.vue'

@Component({
  components: {
    navbar,
    cookie
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
