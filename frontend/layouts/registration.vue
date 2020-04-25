<template>
  <div>
    <nuxt class="screen-top" />
    <cookies />
    <support />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cookies from "@/components/cookies.vue";
import support from "@/components/support.vue";

@Component({
  components: { cookies, support },
  middleware: "loaduser"
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/screen";
</style>
