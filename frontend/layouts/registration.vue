<template>
  <div>
    <nuxt class="screen-top" />
    <cookies />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cookies from "@/components/cookies.vue";

@Component({
  components: {cookies},
  middleware: "loaduser"
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/screen";
</style>
