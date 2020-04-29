<template>
  <div>
    <nuxt class="overflow" />
    <cookies />
    <support />
    <top :useBody="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import cookies from "@/components/cookies.vue";
import top from "@/components/goto-top.vue";
import support from "@/components/support.vue";

@Component({
  components: { cookies, top, support, },
})
export default class extends Vue {}
</script>

<style lang="scss">
@import "@/assets/scales";
@import "@/assets/colors";

// this required for the scroll position detection to work
// infinite loading
// .overflow {
//   overflow: hidden;
//   width: 100vw;
//   height: 100vh;
// }

// @media only screen and (max-width: $breakpoint_md) {
//   .overflow {
//     overflow: unset;
//     max-width: unset;
//     max-height: unset;
//   }
// }
</style>
