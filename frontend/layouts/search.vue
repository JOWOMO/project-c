<template>
  <nuxt class="overflow" />
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  middleware: "authenticated"
})
export default class extends Vue {}
</script>

<style lang="scss">
.overflow {
  overflow: hidden;
  max-width: 100vw;
  max-height: 100vh;
}
</style>
