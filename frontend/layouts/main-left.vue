<template>
  <div>
    <nuxt class="overflow" />
    <cookies />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cookies from "@/components/cookies.vue";

@Component({
  components: {cookies}
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
